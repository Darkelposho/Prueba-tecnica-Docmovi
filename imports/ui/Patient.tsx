import React from 'react';

export const Patient = ({ patient, onDeleteClick }: any) => {
  return (
    <li>
      <span>{patient.nombre}</span>
      <span>{patient.apellido_p}</span>
      <span>{patient.apellido_m}</span>
      <span>{patient.rut}</span>
      <span>{patient.region}</span>
      <span>{patient.comuna}</span>
      <button onClick={ () => onDeleteClick(patient) }>&times;</button>
    </li>
  );
};