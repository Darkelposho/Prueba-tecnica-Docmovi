import { Mongo } from 'meteor/mongo';

export interface DatosPaciente {
  _id: string;
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    rut: string;
    region: string;
    comuna: string;
  }

export const PatientCollection = new Mongo.Collection<DatosPaciente>('patients');