const express = require("express");

const app = express();

app.use(express.static("./dist/dev-assesment"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/dev-assesment/" })
);

app.listen(process.env.PORT || 8080);

