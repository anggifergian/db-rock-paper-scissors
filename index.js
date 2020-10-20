const debugStartup = require("debug")("app:startup");
const debugReq = require("debug")("app:info");
const config = require("config");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// log for every http request in development
if (app.get("env") === "development") {
    app.use(morgan("dev", { stream: { write: (msg) => debugReq(msg) } }));
}

// checking for config.jwtPrivateKey
if (!config.get("jwtPrivateKey")) {
    debugStartup(`FATAL ERROR: jwtPrivateKey is not defined.`);
    process.exit(1);
}

// main route api/v1
app.use("/api/v1", require("./router/index"));

// set port, listen for requests
app.listen(PORT, () => debugStartup(`Listening on port ${PORT}...`));
