import { useEffect, useState } from 'react';
import './App.css';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

function App() {

  //citas en localstorage
  let initialDates = JSON.parse(localStorage.getItem('citas'))

  if(!initialDates) initialDates=[]

  const [citas,setCitas] = useState(initialDates)

  useEffect(() => {
    if(initialDates){
      localStorage.setItem('citas',JSON.stringify(citas))
    }else{
      localStorage.setItem('citas',JSON.stringify([]))
    }
    //eslint-disable-next-line
  },[citas])

  const saveCita = cita => {
    setCitas([...citas,cita])
    console.log(citas);
  }

  const deleteCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    setCitas(nuevasCitas)
  }

  const title = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              saveCita={saveCita}
            />
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {citas.map(cita => (
              <Cita key={cita.id} cita={cita} deleteCita={deleteCita}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
