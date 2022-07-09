import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialize } from '../features/floors/elevatorActions';

export default function Dashboard(){
    const [isLogin, setIsLogin] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const elevatorActions = useSelector((state)=>state.elevatorActions.value);
    const dispatch = useDispatch();
    const bottomRef = useRef(null);

    let handleLogin = async () => {
        let rawResponse = await fetch('/users/login',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body: `login=${login}&password=${password}`
        });
        let response = await rawResponse.json();
        if(response.result){
            setIsLogin(true);
        }else{
            alert('Wrong login/password, try elevatorAdmin / azerty');
        }
    }

    useEffect(()=>{
        async function getActions(){
            let rawResponse = await fetch('/get-actions');
            let response = await rawResponse.json();
            if(response.result){
                console.log('result:',response.getActions);
                dispatch(initialize(response.getActions));
            }else{
                alert('Failed to retrieve actions');
            }
        }
        if(isLogin){
            getActions();
        }
    },[isLogin]);

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    },[elevatorActions])

    if(isLogin){
        return(
            <div className="w-full flex flex-col items-center justify-center overflow-scroll" style={{height:"50vh"}}>
                {elevatorActions.map((elt,i)=>{
                    return <p key={i}>Action: {elt.actionType} / to Floor: {elt.floor}</p>
                })}
                <div ref={bottomRef}/>
            </div>
        )
    }else{
        return(
            <div className="w-full flex flex-col justify-center items-center gap-10">
                <input className="w-1/2" type="text" name="login" value={login} onChange={(e)=>setLogin(e.target.value)} placeholder="Login"/>
                <input className="w-1/2" type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <button className="w-1/2 bg-orange-300" onClick={()=>handleLogin()}>Login</button>          
            </div>
        )
    }
    
}