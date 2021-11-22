import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './src/routes';

const app = express();

app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('uploads'));
app.use(router);

const port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
