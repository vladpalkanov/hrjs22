import express from "express";

const app = express();

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("User page");
});

app.use("/user", router);

app.listen(3000, "127.0.0.1", () => {
  console.log("The server is listening the port:" + 3000);
});
