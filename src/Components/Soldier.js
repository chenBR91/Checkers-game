import React from "react";
import './soldier.css';

const Soldier = (props) =>{
    const colorSoldier = props.children;
    let value;

    const soliderStyleColor = {
        background: colorSoldier
    }

    

    if(colorSoldier === 'white'){
        value = <div className={`soldier ${colorSoldier}`}></div>
    }
    else if(colorSoldier === 'black') {
        value = <div className={`soldier ${colorSoldier}`} ></div>
    }

    return(
        <>
            {value}
            {/* <div className="soldier">
            {props.children}
            </div> */}
        </>
    )
}

export default Soldier;