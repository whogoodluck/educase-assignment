import cors from "cors";
import express from "express";
import morgan from "morgan";

import unknownEndpoint from "./middlewares/unknown-endpoint";

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/health", (_req, res) => {
  res.send("ok");
});

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use(unknownEndpoint);

export default app;
