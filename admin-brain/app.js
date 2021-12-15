import express from 'express';
import router from './src/routes';
import cors from 'cors';
import morgan from 'morgan';

import {} from './src/helpers/database-helper';

const app = express();

app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

const port = process.env.PORT || 8084;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
