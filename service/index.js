const express = require("express");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const authCookieName = "token";

const app = express();
app.use(express.json()); // JSON body parsing using built-in middleware
app.use(cookieParser()); // Use the cookie parser middleware for tracking authentication tokens

const users = []; // our in-memory user "database"

async function getUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

// Service Port
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.static("public"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// ========= API CALLS =========

// api/auth/create [CREATE NEW USER]
apiRouter.post("/auth/create", async (req, res) => {
  if (await findUser("email", req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// api/auth/login [LOGIN USER]
apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("email", req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// api/auth/logout [LOGOUT USER]
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// api/user/me [GET CURRENT USER]
apiRouter.get("/user/me", async (req, res) => {
  try {
    const token = req.cookies["token"];
    const user = await getUser("token", token);

    if (user) {
      res.send({ email: user.email });
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.error("🔥 Error in /api/user/me:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// ======== DEAFULT ROUTES =========

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

// Error Handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Redirect
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// ========= HELPER FUNCTIONS =========

//Create User
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

//Find User
async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    httpOnly: true,
    sameSite: "strict",
  });
}

// Start the backend server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
