"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const semver_1 = require("semver");
const npm_fetch_dependencies_1 = require("npm-fetch-dependencies");
const redisConfig = __importStar(require("./../../config/redis"));
exports.routes = express_1.Router();
// no ts definitions - require as a workaround
const cache = require('express-redis-cache')({
    host: redisConfig.REDIS_DB_ADDR,
    prefix: 'dependencytreeredis',
    expire: 60
});
exports.routes.get('/', (req, res, next) => {
    res.status(403).send();
});
exports.routes.get('/status', (req, res, next) => {
    res.status(200).send("OK");
});
exports.routes.get('/tree/:packageName', cache.route(), (req, res, next) => {
    handleTreeRequest(req, res, next);
});
exports.routes.get('/tree/:packageName/:packageVersion', cache.route(), (req, res, next) => {
    handleTreeRequest(req, res, next);
});
/* Handle request */
function handleTreeRequest(req, res, next) {
    const options = {};
    options.includeDevelopmentPackages = req.query.includeDevelopmentPackages === 'true';
    /* Validate requested version (if requested) is semver valid */
    if (req.params.packageVersion) {
        if (!semver_1.valid(req.params.packageVersion)) {
            return next(400);
        }
    }
    npm_fetch_dependencies_1.getDependencyTreeFromNpm(req.params.packageName, req.params.packageVersion, options, (result) => {
        res.status(200).send(result);
    });
}
exports.routes.use((err, req, res, next) => {
    res.status(err.status || 500).send(err);
});
//# sourceMappingURL=index.js.map