const express = require("express");
const app = express();

const apiRouter = require("./api/routes");

app.use(express.json());

app.get("/", (req,res)=>res.send("<h1>Hello World</h1>"));

app.use("/api", apiRouter);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);