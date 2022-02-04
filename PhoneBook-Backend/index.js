const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const morganFormat = (tokens, req, res) =>{
    morgan.token('resObj', function (req, res) { return JSON.stringify(req.body) })
    const format = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
      ]
    if(tokens.method(req,res) === "POST"){return format.concat(tokens.resObj(req,res)).join(' ')}
    return format.join(' ')
}

const apiRouter = require("./api/routes");
const routes = require("./routes");

// %%% MIDLEWARE %%%
app.use(express.json());
app.use(morgan(morganFormat));
app.use(cors());

app.use("/", routes);
app.use("/api", apiRouter);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);