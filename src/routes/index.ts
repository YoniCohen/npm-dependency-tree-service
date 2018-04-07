import { Router, Request, Response, NextFunction } from 'express';
import { valid as semver_valid } from 'semver';
import { getDependencyTreeFromNpm, FetchOptions } from 'npm-fetch-dependencies';

export const routes = Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(403).send();
});

routes.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("OK");
});

routes.get('/tree/:packageName', (req: Request, res: Response, next: NextFunction) => {
    handleTreeRequest(req, res, next);
});

routes.get('/tree/:packageName/:packageVersion', (req: Request, res: Response, next: NextFunction) => {
    handleTreeRequest(req, res, next);
});

/* Handle request */
function handleTreeRequest(req: Request, res: Response, next: NextFunction) {
    const options: FetchOptions = {};
    options.includeDevelopmentPackages = req.query.includeDevelopmentPackages === 'true';

    /* Validate requested version (if requested) is semver valid */
    if (req.params.packageVersion) {
        if (!semver_valid(req.params.packageVersion)) {
            return next(400);
        }
    }

    getDependencyTreeFromNpm(req.params.packageName, req.params.packageVersion, options, (result: {}) => {
        res.status(200).send(result);
    });
}

routes.use((err: any, req: Request, res: Response, next: any) => {
    res.status(err.status || 500).send(err);
});