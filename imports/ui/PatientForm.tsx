import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validateRut } from 'rutlib';
import { DatosPaciente } from '../db/PatientCollection';
import Data from '../Json/Data.json';

export const PatientForm = () => {

    const onSubmit = (patient: DatosPaciente) => {
        Meteor.call('patient.insert', patient);
        reset();
    }

    const { register, handleSubmit, reset, formState: {errors} } = useForm<DatosPaciente>();

    const [zona, setZona] = useState('');
 
  return (
    <div >
        <div className='col-md-5 col-lg-6'>
        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            <div className='col-auto'>
                <label htmlFor="nombre">Nombre</label>
                <input {...register("nombre",{
                    required: {
                        value: true,
                        message: "El nombre es requerido"
                    },
                    pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "El nombre solo puede contener letras"
                    },
                })} type="text" 
                    className='form-control'    
                />
                {
                    errors.nombre && <p>{errors.nombre.message}</p>
                }
            </div>
            <div className='col-auto'>
                <label htmlFor="apellido_p">Apellido Paterno</label>
                <input {...register("apellido_p",{
                    required: {
                        value: true,
                        message: "El apellido paterno es requerido"
                    },
                    pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "El apellido paterno solo puede contener letras"
                    },
                })} type="text" 
                className='form-control'
                />
                {
                    errors.apellido_p && <p>{errors.apellido_p.message}</p>
                }
            </div>
            <div className='col-auto'>
                <label htmlFor="apellido_m">Apellido Materno</label>
                <input {...register("apellido_m",{
                    required: {
                        value: true,
                        message: "El apellido materno es requerido"
                    },
                    pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "El apellido materno solo puede contener letras"
                    },
                })} type="text" 
                className="form-control"
                />
                {
                    errors.apellido_m && <p>{errors.apellido_m.message}</p>
                }
            </div>
            <div className='col-auto'>
                <label htmlFor="rut">Rut</label>
                <input {...register("rut",{
                    required: {
                        value: true,
                        message: "El rut es requerido"
                    },
                    pattern: {
                        value: /^[0-9]+-[0-9kK]$/,
                        message: "El rut debe tener el formato 12345678-9"
                    },
                    validate: {
                        rut: value => validateRut(value)
                    }
                })} type="text" 
                className="form-control"
                />
                {
                    errors.rut && <p>{errors.rut.message}</p>
                }
            </div>
            
            <div className='col-auto'>
                <label htmlFor="Region">Region</label>
                <select {...register("region",{
                    required: {
                        value: true,
                        message: "La region es requerida"
                    },
                })}
                value = {zona}
                onChange={(e) => setZona(e.target.value)}
                className="form-select"
                aria-label="Default select example"
                >
                    {
                        Data.map((region: any) => {
                            return <option key={region.numero} value={region.region}>{region.region}
                            </option>
                        })
                    }
                </select>
            </div>
            
            <div className='col-auto'>
                <label htmlFor="Comuna">Comuna</label>
                <select {...register("comuna",{
                    required: {
                        value: true,
                        message: "La comuna es requerida"
                    },
                })}
                className="form-select"
                aria-label="Default select example"
                >
                    {
                        Data.map((region: any) => {
                            if(region.region === zona){
                                console.log(region.comunas)
                                return region.comunas.map((comuna: any) => {
                                    return <option key={comuna} value={comuna}>{comuna}
                                    </option>
                                })
                            }
                        })
                    }
                </select>      
            </div>
            <div className="d-grid gap-2 col-2 mx-auto">
                <button type="submit" className="btn btn-primary">Añadir paciente</button>
            </div>  
        </form>
        </div>
    </div>
    
  );
};