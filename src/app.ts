import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { getDependencyTreeFromNpm } from 'npm-fetch-dependencies';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.disable('etag');
app.disable('view cache');

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(403).send();
});

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("OK");
});

app.get('/tree/:packageName', (req: Request, res: Response, next: NextFunction) => {
    getDependencyTreeFromNpm(req.params.packageName, null, {}, (result: {}) => {
        res.status(200).send(result);
    });
});

app.get('/tree/:packageName/:packageVersion', (req: Request, res: Response, next: NextFunction) => {
    getDependencyTreeFromNpm(req.params.packageName, req.params.packageVersion, {}, (result: {}) => {
        res.status(200).send(result);
    });
});

// no stacktraces leaked to user
app.use(function (err: any, req: Request, res: Response, next: any) {
    res.status(err.status || 500).send(err);
});

module.exports = app;