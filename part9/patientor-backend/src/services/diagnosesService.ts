import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getAllDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

export default { getAllDiagnoses };
