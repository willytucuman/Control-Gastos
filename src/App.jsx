import { useState, useEffect } from 'react'
import Header from '../components/Header'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Modal from '../components/Modal'
import { generarId } from './helpers'
import ListadoGastos from '../components/ListadoGastos'
import { object } from 'prop-types'
import Filtros from '../components/Filtros'


function App() {
  const[gastos,setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  ) 
 const[presupuesto, setPresupuesto]=useState(
  Number(localStorage.getItem("presupuesto")) ?? 0
 )
 const[isValidPresupuesto,setIsValidPresupuesto]=useState(false)
 const[modal,setModal] =useState(false);
 const [animarModal,setAnimar]=useState(false)
 const [gastoEditar,setGastoEditar] = useState({})
 const [filtro,setFiltro] = useState("")
 const [gastosFiltrados,setGastosFiltrados] = useState([])
 useEffect(()=>{
  if(Object.keys(gastoEditar).length > 0 ){
    setModal(true);

  setTimeout(()=>{
    setAnimar(true)
  },500)}
 },[gastoEditar])
 
 useEffect(()=>{
  localStorage.setItem("presupuesto",presupuesto ?? 0)
 },[presupuesto])

 useEffect(()=>{
  localStorage.setItem("gastos",JSON.stringify(gastos) ?? [])
},[gastos])

useEffect(()=>{
if(filtro){
  const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
  setGastosFiltrados(gastosFiltrados)
}
},[filtro])

 useEffect(()=>{
  const presupuestoLs = Number(localStorage.getItem("presupuesto"))
  if(presupuestoLs > 0) {
    setIsValidPresupuesto(true)
  }
 },[])

 const handleNuevoGasto=()=>{
  setModal(true);
  setGastoEditar({})
  setTimeout(()=>{
    setAnimar(true)
  },500)
 }
 const guardarGasto = gasto =>{
  if(gasto.id){
    const gastosActualizados = gastos.map(gastoState =>gastoState.id === gasto.id ? gasto : gastoState)
    setGastos(gastosActualizados)
    setGastoEditar({})
  }else{
    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos,gasto ])
  }
  setModal(false)
  setAnimar(false)
   setTimeout(()=>{
      setModal(false)
  },500)
 }

 const eliminarGasto =id =>{
  const gastosActualizados =gastos.filter(gasto => gasto.id !== id)
  setGastos(gastosActualizados)
}



  return (
    <div className={modal ? "fijar" : ""}>
      <Header
      gastos ={gastos}
      setGastos = {setGastos}
      presupuesto = {presupuesto}
      setPresupuesto = {setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />
    {isValidPresupuesto && (
       <>
       <main>
        <Filtros
        filtro = {filtro}
        setFiltro  = {setFiltro}
        />
      <ListadoGastos
        gastos = {gastos}
        setGastoEditar = {setGastoEditar}
        eliminarGasto = {eliminarGasto}
        filtro = {filtro}
        gastosFiltrados = {gastosFiltrados}
        />
       </main>
       <div className='nuevo-gasto'>
         <img src={IconoNuevoGasto} 
         alt="icono nuevo gasto" 
         onClick={handleNuevoGasto}
         />
     </div>
     </>
    )}
    {modal && <Modal  setModal = {setModal}
                      animarModal={animarModal}
                      setAnimar = {setAnimar}
                      guardarGasto = {guardarGasto}
                      gastoEditar = {gastoEditar}
                      setGastoEditar = {setGastoEditar}
                      />
                      }
    </div>
  )
}

export default App
