import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'
const Header = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto}) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>

      {isValidPresupuesto ? (
      <ControlPresupuesto 
      setGastos = {setGastos}
      gastos = {gastos}
      presupuesto ={presupuesto} 
      setPresupuesto = {setPresupuesto}
      setIsValidPresupuesto = {setIsValidPresupuesto} />):
      (  <NuevoPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        />
        )}
    
    </header>
  )
}

export default Header
