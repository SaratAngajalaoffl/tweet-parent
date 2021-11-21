import express from 'express';
import router from './src/routes';
import cors from 'cors';
import morgan from 'morgan';

import { testPsqlConnection } from './src/helpers/database-helper';
import { registerModels } from './src/models';

const app = express();

testPsqlConnection();
registerModels();

app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
