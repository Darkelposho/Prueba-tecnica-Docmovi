import { Meteor } from 'meteor/meteor';
import React, {Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PatientCollection } from '../db/PatientCollection';
import { Patient } from './Patient';
import { PatientForm } from './PatientForm';

const deletePatient = ({ _id }: any) => Meteor.call('patient.remove', _id);

export const App = () => {

  const patients = useTracker(() => PatientCollection.find().fetch());


  return (
  <div className='app'>
    <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
      <div className='app-bar'>
        <div className='app-header'>
          <h1 className="text-3xl font-bold underline">
            Formulario de ingreso de datos de paciente
          </h1>
        </div>
      </div>
    </header>
    <div className='main'>
      <Fragment>

        <h3>Ingrese Pacientes</h3>

        <PatientForm />

        <h3>Lista de pacientes</h3>

        <ul className="tasks">
          {patients.map(patient =>
            <Patient 
              key={patient._id}
              patient={patient}
              onDeleteClick={deletePatient}
            />
          )}
        </ul>
      </Fragment>
    </div> 
  </div>
  );
}
