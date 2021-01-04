import patients from '../../data/patients';
import { NewPatient, PublicPatient, Patient, NewEntry, Entry } from '../types';

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

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const newEntry = {
    id: Math.floor(Math.random() * 99999999).toString(),
    ...entry
  };

  patients.map((p) => {
    if (p.id === patientId) {
      if (p.entries) {
        return {
          ...p,
          entries: [...p.entries, newEntry]
        };
      } else {
        return {
          ...p,
          entries: [newEntry]
        };
      }
    } else {
      return p;
    }
  });

  console.log(patients);
  return newEntry;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: Math.floor(Math.random() * 99999999).toString(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getAllPatients, addPatient, getPatient, addEntry };
