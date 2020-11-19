import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
const app = express();
import cors from 'cors';
app.use(express.json());
app.use(cors());

const PORT = 9001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged me here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
