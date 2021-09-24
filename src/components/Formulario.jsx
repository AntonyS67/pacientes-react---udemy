import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

function Formulario({saveCita}) {
    const [cita,setCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })
    const [error,setError] = useState(false)

    const handleChange = (e) => {
        setCita({
            ...cita,
            [e.target.name]:e.target.value
        })
    }

    const {mascota,propietario,fecha,hora,sintomas} = cita;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //Validar
        if(mascota.trim()==='' || propietario.trim()==='' || fecha.trim()==='' || hora.trim()==='' || sintomas.trim()===''){
            setError(true)
            return;
        }

        //Eliminar el mensaje previo
        setError(false)

        //Asignar un ID
        cita.id = uuidv4()

        //Crear la cita
        saveCita(cita)

        //Reiniciar el form
        setCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }

    return (
        <>
            <h2>Crear Cita</h2>
            {error && (<p className="alerta-error">Todos los campos son obligatorios</p>)}
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={mascota}
                />

                <label htmlFor="">Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={handleChange}
                    value={propietario}
                />

                <label htmlFor="">Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />

                <label htmlFor="">Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />

                <label htmlFor="">Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    cols="30"
                    rows="10"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>
            </form>
        </>
    )
}

Formulario.propTypes = {
    saveCita:PropTypes.func.isRequired
}

export default Formulario
