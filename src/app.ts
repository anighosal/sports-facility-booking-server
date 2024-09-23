import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(morgan('tiny'));

// application routes
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Wellcome to sports facility booking platform');
});
app.use(globalErrorHandler);
app.options('*', cors());

//Not Found
app.use(notFound);

export default app;
