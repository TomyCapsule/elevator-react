import React from 'react';
import Button from './Button'
import { useSelector } from 'react-redux';


export default function Panel(props){
    
    const elevatorActions = useSelector((state)=>state.elevatorActions.value);

    let upDownSrc =  "";
    if(elevatorActions.length > 0 && elevatorActions[elevatorActions.length-1].actionType == 'Going up'){
        upDownSrc = './up.png';
    }else if(elevatorActions.length > 0 && elevatorActions[elevatorActions.length-1].actionType == 'Going down'){
        upDownSrc = './down.png';
    }

    let doorSrc;
    if(!props.isOpen){
        doorSrc = './open.png';
    }else{
        doorSrc = './close.png';
    }

    let handleOpen = (bool) => {
        props.handleOpen(bool);
    }

    return(
        <div className="bg-neutral-400 col-span-2 h-full px-5">
            <div className="h-1/4 grid grid-cols-2">
                <div className="col-span-1 h-full flex items-center justify-center">
                    <img src={upDownSrc} className="w-1/2" alt=""/>
                </div>
                <div className="col-span-1 h-full flex items-center justify-center">
                    <img src={doorSrc} classame="w-1/2" alt="doors status"/>
                </div>
            </div>
            <div className="grid grid-cols-2 h-3/4">
                {props.floors.sort((a,b)=>b-a).map((elt,i)=>{
                    return(
                        <Button floor={elt} key={i} handleOpen={handleOpen} isOpen={props.isOpen}/>
                    )
                })}
            </div>
        </div>
    )
};