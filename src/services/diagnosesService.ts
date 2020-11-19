import diagnoses from '../../data/diagnoses';
import { DiagnosesEntry } from '../types';

const getAllDiagnoses = (): Array<DiagnosesEntry> => {
  return diagnoses;
};

export default { getAllDiagnoses };
