import patients from '../../data/patients';
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry
} from '../types';

const getAllPatients = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: Math.floor(Math.random() * 99999999).toString(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getAllPatients, addPatient };
