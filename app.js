require('dotenv').config();
const express = require('express');
const mssql = require('mssql');
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const escape = require('escape-html')

const config = require('./src/config');
const specs = require("./src/utils/swagger");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS
const corsOptions = {
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // For legacy browser support
};
app.use(cors(corsOptions));

// helmet
app.use(helmet());
app.use((req, res, next) => {
    res.header("Strict-Transport-Security", "max-age=63072000; includeSubdomains; preload");
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("Cache-control", "no-store");
    res.header("Pragma", "no-cache");
    next();
});

/* Web server request logging */
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms"),
);

/* DB Connection. */
app.use(async function (req, res, next) {
    await mssql.connect(config.db_connection())
    req.sql = mssql;
    next();
});

/* OpenAPI Documentation. */
app.use("/api-docs", swaggerUI.serve);
app.get("/api-docs", swaggerUI.setup(specs, { explorer: true }));

/* Routes */
app.use('/todo', require('./src/routes/todo'));
    

// catch 404 and forward to error handler
app.use(function (req, res) {
    const err = new Error('Not Found: '+ escape(req.method) + ":" + escape(req.originalUrl));
    res.status(404).send(err.message);
});

app.set('port', process.env.PORT || 3000);
process.on("uncaughtException", (error) => {
    console.error("Uncaught exception", error.message);
    console.error(error);
});

const server = app.listen(app.get('port'), function() {
console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
