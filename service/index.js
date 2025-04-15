const express = require("express");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const authCookieName = "token";

const app = express();
app.use(express.json()); // JSON body parsing using built-in middleware
app.use(cookieParser()); // Use the cookie parser middleware for tracking authentication tokens

const users = []; // our in-memory user "database"
const dashlinks = []; // our in-memory dashlinks "database"
const posts = [
  {
    id: 1,
    title: "404 Error",
    date: "September 30th 2024",
    message:
      "Your website keeps returning a 404 error when I try to access the contact page. I Think there is some time of to error going on or the contact page is not properly set up.",
    upvotes: 13,
    resolved: false,
  },
  {
    id: 2,
    title: "Dark Mode Request",
    date: "Oct 1st 2024",
    message:
      "I would love to see a dark mode version or toggle button for your website. I think that would be a great ui feature!",
    upvotes: 9,
    resolved: false,
  },
];

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

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

// api/dashlink/create [CREATE NEW DASHLINK]
apiRouter.post("/dashlink/create", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);

  const { name } = req.body;
  if (!name) return res.status(400).send({ msg: "Dashlink name is required" });

  const newDashlink = {
    id: uuid.v4(),
    name: name,
    owner : user.email,
    unreadCount: 0,
  };

  dashlinks.push(newDashlink);
  res.status(201).send(newDashlink);
});

// api/dashlink/list [LIST ALL DASHLINKS]
apiRouter.get("/dashlink/list", verifyAuth, async (req, res) => {
  const userLinks = dashlinks.filter((link) => link.userEmail === req.user.email);
  res.send(userLinks);
});

// api/dashboard/list [LIST ALL POSTS]
apiRouter.get("/dashboard/list", verifyAuth, async (req, res) => {
  //api logic
  console.log(`Post list requested : ${posts}`)
  res.send(posts);
});

// api/dashboard/resolved/:id [Resolve Post]
apiRouter.put("/dashboard/resolved/:id", verifyAuth, async (req, res) => {
  //api logic
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if(post) {
    post.resolved = true;
    res.send(post);
  } else {
    res.status(404).send({ msg: "Post not found" });
  }

});

// api/dashboard/delete/:id [Delete Post]
apiRouter.delete("/dashboard/delete/:id", verifyAuth, async (req, res) => {
  //api logic
  const id = parseInt(req.params.id);

  const index = posts.findIndex((p) => p.id === id);
  if (index !== -1) {
    const deleted = posts.splice(index, 1);
    res.send(deleted[0]);
  } else {
    res.status(404).send({ msg: "post not found" });
  }
  
});


// ======== DEAFULT ROUTES =========

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
