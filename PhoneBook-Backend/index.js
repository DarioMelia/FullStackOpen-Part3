const express = require("express");
const morgan = require("morgan");
const app = express();

const apiRouter = require("./api/routes");
const routes = require("./routes");

// %%% MIDLEWARE %%%
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", routes);
app.use("/api", apiRouter);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);