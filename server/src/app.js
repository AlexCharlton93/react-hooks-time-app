import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import { setupApp } from './common/setup';
import { config } from './common/config';
import { controllerCatch } from './common/errors';

async function initApp() {
    const app = express();
	
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(logger('dev'));
    app.use(express.json());
    app.use(cookieParser());

    // Remove security risk headers
	app.disable('x-powered-by');
	app.disable('etag');
	app.disable('Server');
	app.use(
		helmet({
			hsts: {
				maxAge: 31536000,
				includeSubDomains: true,
			},
		}),
    );
    
    app.use(compression());

    // eslint-disable-next-line no-unused-vars
	app.use((err, request, response, next) => controllerCatch(err, request, response));

	app.listen(config.environment.port, () => {
		console.log(`Running on port: ${config.environment.port}`);
	});

	await setupApp(app);
}

initApp();
