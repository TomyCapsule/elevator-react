import './App.css';
import Panel from './components/Panel';
import Building from './components/Building';
import {elevatorOneInt, elevatorTwoInt} from './helpers/floors';
import React, {useState} from 'react';


function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);

  let handleOpen = (bool) => {
    setIsOpen(bool);
  }

  let handleOpenTwo = (bool) => {
    setIsOpenTwo(bool);
  }

  let concatArray = elevatorOneInt.concat(elevatorTwoInt);
  concatArray = concatArray.filter((floor, index) => {
      return concatArray.indexOf(floor) == index;
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid grid-cols-8 h-full">
        <Panel floors={elevatorOneInt} isOpen={isOpen} handleOpen={handleOpen}/>
        <Building floors={concatArray.sort((a,b)=>b-a)} handleOpen={handleOpen} isOpen={isOpen} isOpenTwo={isOpenTwo}/>
        <Panel floors={elevatorTwoInt} isOpen={isOpenTwo} handleOpen={handleOpenTwo}/>
      </div>
    </div>
  );
}

export default App;
