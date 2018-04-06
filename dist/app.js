"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const npm_fetch_dependencies_1 = require("npm-fetch-dependencies");
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.disable('etag');
app.disable('view cache');
app.get('/', (req, res, next) => {
    res.status(403).send();
});
app.get('/status', (req, res, next) => {
    res.status(200).send("OK");
});
app.get('/tree/:packageName', (req, res, next) => {
    npm_fetch_dependencies_1.getDependencyTreeFromNpm(req.params.packageName, null, {}, (result) => {
        res.status(200).send(result);
    });
});
app.get('/tree/:packageName/:packageVersion', (req, res, next) => {
    npm_fetch_dependencies_1.getDependencyTreeFromNpm(req.params.packageName, req.params.packageVersion, {}, (result) => {
        res.status(200).send(result);
    });
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err);
});
module.exports = app;
//# sourceMappingURL=app.js.map