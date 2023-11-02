import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {errorHandler} from './middlewares/error.middleware';
import {notFoundHandler} from './middlewares/not-found.middleware';
import Router from './routes';

// .env
dotenv.config();

// port
if (!process.env.APP_PORT) { process.exit(1); }
const PORT = parseInt(process.env.APP_PORT as string, 10);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(Router);

// handling errors
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
})