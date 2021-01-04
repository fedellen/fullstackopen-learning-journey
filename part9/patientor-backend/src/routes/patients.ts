import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  res.json(patient);
});

router.post('/:id/entries', (req, res) => {
  try {
    const entry = toNewEntry(req.body);
    const entryAdded = patientService.addEntry(entry, req.params.id);
    res.json(entryAdded);
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
});

export default router;
