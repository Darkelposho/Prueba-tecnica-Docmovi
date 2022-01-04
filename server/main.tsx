import { Meteor } from 'meteor/meteor';
import { PatientCollection, DatosPaciente } from '../imports/db/PatientCollection';
import '/imports/api/PatientMethods';

const insertPatient = (patient: DatosPaciente) => PatientCollection.insert(patient);

  
Meteor.startup(() => {
  if (PatientCollection.find().count() === 0) {
    [
      {
        nombre: 'Juan',
        apellido_p: 'Perez',
        apellido_m: 'Perez',
        rut: '12345678-9',
        region: 'RM',
        comuna: 'Ñuñoa'
      },
    ].forEach(patient => insertPatient(patient));
  }
});