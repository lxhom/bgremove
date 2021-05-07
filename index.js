// Imports

const express = require("express");
const expressStatic = require("express-static");
const lwt = require("login-with-twitter")
const twit = require("twit")
const jimp = require("jimp")
const bodyparser = require("body-parser")

const keys = require("./keys.js") // copy from keys.template.js

// Express init

const app = express();

// OAuth generator

const oauth = new lwt({
  consumerKey: keys.twitter.key,
  consumerSecret: keys.twitter.secret,
  callbackUrl: keys.twitter.callbackUrl
});

// Post handler

app.use((req, _res, next) => {
  console.log("###", req.method)
  if (req.method === "POST") {
    req.body = "";
    req.on('data', data => req.body += data);
    req.on('end', () => next());
    console.log("#" + req.body)
  } else {
    next();
  }
});

// Redirect pages

app.get("/login", (req, res) => {
  oauth.login((err, tokenSecret, url) => {
    if (err) {
      res.send("An error occurred. " + err);
      throw err;
    }
    res.send(`
    <script>
        localStorage.tokenSecret = "${tokenSecret}";
        location.href = "${url}";
    </script>
    `);
  });
});

app.get("/callback", (req, res) => {
  res.send(`
  <script>
    location.href = location.href.replace("/callback?", "/generate-token?") + "&token_secret=" + localStorage.tokenSecret;
  </script>
  `);
});

app.get("/generate-token", (req, res) => {
  // noinspection JSUnresolvedVariable
  oauth.callback({
    oauth_token: req.query.oauth_token,
    oauth_verifier: req.query.oauth_verifier
  }, req.query.token_secret, (err, user) => {
    if (err) {
      res.send("An error occurred. " + err);
      throw err;
    }
    res.send(`
    <script>
        localStorage.jsonData = '${JSON.stringify(user).replace(/'/g, "\\'")}'
        location.href = "/main"
    </script>
    `);
  });
});

// API

app.get("/api/getPic", (req, res) => {

})

app.post("/api/upload", async (req, res) => {
  let data = JSON.parse(req.body);
  let T = new twit({
    consumer_key: keys.twitter.key,
    consumer_secret: keys.twitter.secret,
    access_token: data.token,
    access_token_secret: data.tokenSecret,
  })
  await T.post("account/update_profile_image", {image: data.image})
  res.send("pfp set")
})

app.post("/test", (req, res) => res.send(JSON.stringify(req.body)))

app.post("/api/jimp", (req, res) => {

})

// Express static

app.use((req, _res, next) => {
  console.log(req.path)
  if (req.path === "/") req.url = req.url.replace("/", "/index.html")
  console.log(req.path, req.url)
  if (req.path.indexOf(".") === -1) req.url += ".html"
  next()
})

// noinspection JSCheckFunctionSignatures
app.use(expressStatic( "public-html"))

module.exports = app;