import patients from '../../data/patients';
import { NewPatient, PublicPatient, Patient } from '../types';

const getAllPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: Math.floor(Math.random() * 99999999).toString(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getAllPatients, addPatient, getPatient };
