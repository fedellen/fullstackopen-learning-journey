/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Discharge,
  NewPatient,
  Gender,
  HealthCheckRating,
  NewEntry,
  SickLeave
} from './types';

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name...');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date...');
  }
  return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn...');
  }
  return ssn;
};

const parseGender = (gender: any): string => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender...');
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation...');
  }
  return occupation;
};

const parseEntryDate = (date: any): string => {
  if (!date || !isDate(date) || !isString(date)) {
    throw new Error('Incorrect or missing occupation...');
  }
  return date;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description...');
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist...');
  }
  return specialist;
};

const parseDischarge = (discharge: any): Discharge => {
  console.log(discharge);
  if (
    !discharge ||
    !isString(discharge.criteria) ||
    !isDate(discharge.date) ||
    !isString(discharge.date)
  ) {
    throw new Error('Incorrect or missing discharge...');
  }
  return discharge as Discharge;
};

const parseHealthCheck = (healthCheck: any): number => {
  if (!healthCheck || !isHealthCheck(healthCheck)) {
    throw new Error('Incorrect or missing healthCheck...');
  }
  return healthCheck;
};

const parseEmployer = (employer: any): string => {
  if (!employer || !isString(employer)) {
    throw new Error('Incorrect or missing employer...');
  }
  return employer;
};

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  } else if (!isString(sickLeave.startDate) || !isString(sickLeave.endDate)) {
    throw new Error('Incorrect Sick Leave....');
  } else {
    return sickLeave as SickLeave;
  }
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isHealthCheck = (
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatientEntry = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewEntry => {
  switch (object.type) {
    case 'HealthCheck':
      return {
        type: 'HealthCheck',
        description: parseDescription(object.description),
        date: parseEntryDate(object.date),
        specialist: parseSpecialist(object.specialist),
        healthCheckRating: parseHealthCheck(object.healthCheckRating)
      };
    case 'Hospital':
      return {
        type: 'Hospital',
        description: parseDescription(object.description),
        date: parseEntryDate(object.date),
        specialist: parseSpecialist(object.specialist),
        discharge: parseDischarge(object.discharge)
      };
    case 'OccupationalHealthcare':
      return {
        type: 'OccupationalHealthcare',
        description: parseDescription(object.description),
        date: parseEntryDate(object.date),
        specialist: parseSpecialist(object.specialist),
        employerName: parseEmployer(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
    default:
      throw new Error('Incorrect or missing EntryType...');
  }
};
