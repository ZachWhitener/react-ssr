/**
* Available commands:
* from: https://stackoverflow.com/questions/28782656/how-to-run-node-js-app-with-es6-features-enabled
*
* npm run watch - starts watch watch changes in src directory and compiles in to dist
* npm run build - compiles files from src directory to dist
* npm run serve - it is doing watch + start node server, on every file change it will restart node server using nodemon which is watching dist directory changes
*
**/


import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import dotenv from 'dotenv';
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../shared/App";
const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(
    `
      <!DOCTYPE html>
      <head>
        <title>Universal React</title>
        <link rel="stylesheet" href="/css/main.css" />
        <script src="/bundle.js" defer></script>
      </head>
      <body>
        <div id="root">${renderToString(<App />)}</div>
      </body>
    `
  );
});

server.listen(process.env.PORT, "0.0.0.0", () => {
  const addr = server.address();
  console.log(`
      Server listening at port ${addr.address} : ${addr.port}
  `);
});
