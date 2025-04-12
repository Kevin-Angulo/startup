const express = require("express");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json()); // Parse JSON in requests
app.use(cookieParser()); // Read/write cookies

const users = []; // Temporary in-memory "database"

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
  };
  users.push(user);
  return user;
}

async function getUser(field, value) {
  if (value) {
    return users.find((u) => u[field] === value);
  }
  return null;
}

function setAuthCookie(res, user) {
  user.token = uuid.v4(); // generate a secure token

  res.cookie("token", user.token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie("token");
}

// Register
app.post("/api/auth", async (req, res) => {
  if (await getUser("email", req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user);
    res.send({ email: user.email });
  }
});

// Login
app.put("/api/auth", async (req, res) => {
  const user = await getUser("email", req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    setAuthCookie(res, user);
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Logout
app.delete("/api/auth", async (req, res) => {
  const token = req.cookies["token"];
  const user = await getUser("token", token);
  if (user) {
    clearAuthCookie(res, user);
  }
  res.send({});
});

// Get current user
app.get("/api/user/me", async (req, res) => {
  const token = req.cookies["token"];
  const user = await getUser("token", token);
  if (user) {
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});




// Port setup (required)
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});