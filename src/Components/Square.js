import React from "react";
import Soldier from "./Soldier";
import './square.css';

const Square = (props) =>{
    const color = props.color
    const teamsSoldier = props.teamsSoldier
    const indexSquare = props.indexSquare;
  
    let sold;

    

    const clickOnSquare = (index)=>{
        const arrBoardDamka = [...index, teamsSoldier]
        return arrBoardDamka;
    }

    if(teamsSoldier === 'black') {
        sold = <Soldier>black</Soldier>
    }
    else if(teamsSoldier === 'white') {
        sold = <Soldier>white</Soldier>
    }
    else {
        sold = <Soldier />
    }

    return(
        <>
            <div style={{'backgroundColor': color}} className="square" onClick={()=>props.getGameMove(clickOnSquare(indexSquare))}>
                {sold}
                ({indexSquare[0]},{indexSquare[1]})
            </div>
        </>
    )
}

export default Square;