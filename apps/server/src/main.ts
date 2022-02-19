import express from 'express';
import { Application } from 'express';
import fileUpload from 'express-fileupload';
import { getWinners } from '../../../libs/generate-winners/src';

const app: Application = express();

app.use(fileUpload());

app.route('/api/winners').post(getWinners);

const httpServer: any = app.listen(3333, () => {
  console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});
