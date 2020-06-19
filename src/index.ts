import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controller/LoginController";
import { router } from "./controller/decorator";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["zhj"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(router);
console.log('router')
app.listen(8888, () => console.log("server is listening at post 8888"));
