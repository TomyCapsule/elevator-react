import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeFloor } from '../features/floors/floorsSlice';
import { changeButton } from '../features/floors/buildingButtonSlice';
import { addAction } from '../features/floors/elevatorActions';


export default function Button(props){
    const currentFloor = useSelector((state)=>state.floors.value);
    const dispatch = useDispatch();
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const [isLit, setIsLit] = useState(false);

    let handlePromises = async (floor) => {
        console.log('isOpen,',props.isOpen);
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
            handlePromiseCall(floor);
            dispatch(addAction({actionType,floor}))
        }else{
            alert("Save failed");
        }
    }

    let handlePromiseCall = async (floor) =>{   
        setIsLit(true); 
        props.handleOpen(true);    
        dispatch(changeButton(null));
        let thisFloor = currentFloor;
        while(thisFloor != floor){
            if(thisFloor < floor){
                thisFloor++;
            }else{
                thisFloor--;
            }
            await wait(1500);
            dispatch(changeFloor(thisFloor));
            console.log('thisFloor',thisFloor);   
        }
        setTimeout(()=>props.handleOpen(false),500);
        setIsLit(false);
    }


    return(
        <div className="flex justify-center items-center">
            <button onClick={()=>handlePromises(props.floor)} 
                className={`rounded-full text-white w-1/2 h-1/2 text-3xl ${isLit && currentFloor != props.floor ? 'bg-amber-600': 'bg-black'}`}
            >
                {props.floor}
            </button>
        </div>
    )
};