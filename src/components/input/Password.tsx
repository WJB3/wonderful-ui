import React, { useState, useEffect } from 'react';
import { classNames } from './../helper/className';
import Input from './Input';
import "./../styles/input.scss";
import Icon from './../icon';
import Button from './../button';
 

interface PageProps{
    
}

const Password:React.FunctionComponent<PageProps>=(PageProps)=>{

    const {
        ...props
    }=PageProps;

    const [ icon,setIcon]=useState("eye-off");
    const [ type,setType]=useState("text");

    useEffect(()=>{
        if(icon==="eye-off"){
            setType("password")
        }
        if(icon==="eye"){
            setType("text")
        }
    })
    
    return(
        <Input {...props} type={type} suffix={<Button shape={"circle"} flat onClick={()=>setIcon(icon==="eye"?"eye-off":"eye")}/>}/>
    )
}

export default Password;