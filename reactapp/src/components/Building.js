import React from 'react'
import Dashboard from './Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { changeFloor } from '../features/floors/floorsSlice';
import { changeButton } from '../features/floors/buildingButtonSlice';
import { addCallback } from '../features/floors/callbackArraySlice';
import { addAction } from '../features/floors/elevatorActions';
import '../App.css';

export default function Building(props){
    const currentFloor = useSelector((state)=>state.floors.value);
    const currentButton = useSelector((state)=>state.buildingButton.value);
    const dispatch = useDispatch();
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    let handlePromises = async (floor) => {
        let actionType;
        currentFloor < floor ? actionType = 'Going up' : actionType = 'Going down';
        let rawResponse = await fetch('/save-action',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body: `actionType=${actionType}&floor=${floor}`
        });
        let response = await rawResponse.json();
        if(response.result){
            // dispatch(addCallback(handlePromiseCall(floor)));
            handlePromiseCall(floor)
            dispatch(addAction({actionType,floor}))
        }else{
            alert("Save failed");
        }
    }

    let handlePromiseCall = async (floor) => {
        props.handleOpen(true);
        dispatch(changeButton(floor));
        let thisFloor = currentFloor;
        while(thisFloor != floor){
            if(thisFloor < floor){
                thisFloor++;
            }else{
                thisFloor--;
            }
            await wait(2000);
            dispatch(changeFloor(thisFloor));
            console.log('thisFloor',thisFloor);
            
        }
        setTimeout(()=>props.handleOpen(false),500);
    }

    return(
        <div className={`bg-stone-300 col-span-4 h-full flex justify-center items-center`}>
            <table className="table-auto w-full border-separate border-spacing-2 text-center mb-10  border-slate-500">
                <thead>
                    <tr>
                        <th className="border border-slate-600">Floor</th>
                        <th className="border border-slate-600">Current</th>
                        <th className="border border-slate-600">Button</th>
                    </tr>
                </thead>
                <tbody>
                    {props.floors.map((elt,i)=>{
                        return(
                            <tr key={i}>
                                <td className="border border-slate-700">{elt}</td>
                                <td className="border border-slate-700 elevator">{currentFloor == elt ? <div className={`bg-stone-800 w-full h-6 ${!props.isOpen && !props.isOpenTwo ? 'open' : ''} `}></div> : undefined}</td>
                                <td className="border border-slate-700"><button onClick={()=>handlePromises(elt)} className={`${currentButton == elt && currentFloor != elt ? 'bg-emerald-700': 'bg-inherit'} w-full`}>Call</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Dashboard />
        </div>
    )
}