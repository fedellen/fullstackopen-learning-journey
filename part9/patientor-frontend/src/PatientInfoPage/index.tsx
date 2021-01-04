import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import {
  Entry,
  HospitalEntry,
  Patient,
  OccupationalHealthCareEntry,
  HealthCheckEntry
} from '../types';
import { apiBaseUrl } from '../constants';

const PatientInfoPage: React.FC = () => {
  const [{ patientsFull }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patientsFull).find((p) => p.id === id);
  console.log(id);
  console.log(patient);

  React.useEffect(() => {
    const fetchPatient = async () => {
      if (!patient) {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          console.log(`we got the data ${patientFromApi}`);
          patientFromApi
            ? dispatch({ type: 'FULL_PATIENT_INFO', payload: patientFromApi })
            : console.log('Could not find patient...');
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchPatient();
  }, [dispatch]);

  if (!patient) {
    return <div>loading...</div>;
  }

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntryComp entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalEntryComp entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckEntryComp entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const HospitalEntryComp: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
    <div>
      Discharged on {entry.discharge.date}, criteria: {entry.discharge.criteria}
    </div>
  );

  const OccupationalEntryComp: React.FC<{
    entry: OccupationalHealthCareEntry;
  }> = ({ entry }) => (
    <div>
      Employer: {entry.employerName}
      {entry.sickLeave && (
        <div>
          On sick leave from {entry.sickLeave.startDate} until{' '}
          {entry.sickLeave.endDate}
        </div>
      )}
    </div>
  );

  const HealthCheckEntryComp: React.FC<{ entry: HealthCheckEntry }> = ({
    entry
  }) => <div>Health Check Rating: {entry.healthCheckRating}</div>;

  return (
    <div>
      <h1>{patient.name}</h1>
      <p>{patient.dateOfBirth}</p>
      <p>{patient.ssn}</p>
      <p>{patient.gender}</p>
      <p>{patient.occupation}</p>
      <h2>Entries</h2>
      {patient.entries.map((e: Entry) => (
        <div key={e.id}>
          <p>
            {e.date} | {e.description}
          </p>
          <p>
            Specialist: {e.specialist} | Reason: {e.type}
          </p>
          {<EntryDetails entry={e} />}
          {e.diagnosisCodes?.map((d) => (
            <ul key={d}>
              <li>{d}</li>
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PatientInfoPage;
