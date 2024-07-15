import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import requestLogger from './Middleware/request-logger';
import { connectDB } from './Services/database';
import api from './Apis';


const app = express();
//connect db
connectDB();
app.use(requestLogger);
app.set('trust proxy', 1);

app.use(cookieParser())
app.use(helmet());
app.use(
  cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 8 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_, response, __, options) => {
    // return BaseController.responsHandler(response, options.statusCode, options.message)
  },
});

const VERSION_1 = '/api/v1';
app.use(VERSION_1, limiter);
api(app, VERSION_1);
app.disable('x-powered-by');


export default app;