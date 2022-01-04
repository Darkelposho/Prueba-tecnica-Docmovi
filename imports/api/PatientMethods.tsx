import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { DatosPaciente, PatientCollection } from '../db/PatientCollection';


Meteor.methods({
    'patient.insert'(patient: DatosPaciente) {
        check(patient, Object);
        PatientCollection.insert(patient);
    },

    'patient.remove'(patientId: string) {
        check(patientId, String);

        const patient = PatientCollection.findOne({_id: patientId});

        if (!patient) {
            throw new Meteor.Error('Access denied.');
          }

        PatientCollection.remove(patientId);
    },

    'patient.setChecked'(patientId: string, isChecked: boolean) {
        check(patientId, String);
        check(isChecked, Boolean);
        PatientCollection.update(patientId, { $set: { isChecked } });
    }

    
    
});
