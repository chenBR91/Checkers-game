import React, {useState, useEffect} from "react";
import Square from "../Components/Square";
import './GameBoardDamka.css';

// Global variable
let listAlignMove = [];
let turnToPlay = 'white';
let isMark = false;

const dataIsTurnPlayer = {
    whoIsplaying: '',
    pointsSoldierOnBoard: {
        pointX: 0,
        pointY: 0,
    },
    listAlignToMoves: {
        left: [],
        right: [],
    },
    whichIndexForward: {
        pointX: 0,
        pointY: 0,
    },
    listToKillSoldier: {
        left: [],
        right: [],
    },
   }



const GameBoardDamka = (props) =>{
    const matrixBoard = props.board;
    let matrixStateIndexAndType = [];
    
    // init defulat matrix to start play
    useEffect(()=>{
        matrixStateIndexAndType = matrixBoard.map((row, indexRow)=>(
            row.map((col, indexCol)=>{
                return [indexRow, indexCol, row[indexCol]]
            })
        ))
        //console.log('matrix', matrixStateIndexAndType);
        setArrPlay(matrixStateIndexAndType);
        
    },[])



    // color of the board
    const colorMark = 'gray';
    const color1 = 'tan'; // tan
    const color2 = 'peru'; // peru
    let setColor = color1; // color1

    const [arrPlay, setArrPlay] = useState(matrixStateIndexAndType);
    const [gameMove, setGameMove] = useState([]);
    //const [turnToPlay, setTurnToPlay] = useState('white');
    const [forwardPlay, setForwardPlay] = useState(false);
    const [counterBlackPlayer, setCounterBlackPlayer] = useState(12);
    const [counterWhitePlayer, setCounterWhitePlayer] = useState(12);
    
   

    // Main function game
    const gamingMoveArround = (indexMove) =>{
        if(!forwardPlay) {
            dataIsTurnPlayer['whoIsplaying'] = indexMove[2];
            dataIsTurnPlayer['pointsSoldierOnBoard']['pointX'] = indexMove[0];
            dataIsTurnPlayer['pointsSoldierOnBoard']['pointY'] = indexMove[1];
            //setGameMove(indexMove);  
            isMark = true;
            if(checksWhoNeedToPlay()){
                getAllowPossibillityToMove(dataIsTurnPlayer)
                //arrayAllowMove(indexMove);
                setForwardPlay(!forwardPlay);
                //changeTurnPlayer();
            }
            else {
                console.log('Error in choose squre, check who need to play please');
            }
            
        } 
        else {
            console.log('forward move');
            isMark = false;
            dataIsTurnPlayer['whichIndexForward']['pointX'] = indexMove[0];
            dataIsTurnPlayer['whichIndexForward']['pointY'] = indexMove[1];
            if(lawfullForwaedMove(dataIsTurnPlayer)){
                updateStateBoard(dataIsTurnPlayer); // pass
                setForwardPlay(!forwardPlay);       // pass
                changeTurnPlayer(dataIsTurnPlayer);
                console.log(`Turn ${turnToPlay} - ${dataIsTurnPlayer.whoIsplaying} to playing now`);
            }
        }
    }


    const updateStateBoard = (objDataOnThisTurn) => {
        console.log('updated board');
        console.log('objDataOnThisTurn', objDataOnThisTurn);
        const stateIndex = [objDataOnThisTurn.pointsSoldierOnBoard.pointX, objDataOnThisTurn.pointsSoldierOnBoard.pointY];
        console.log('stateIndex', stateIndex);

        const tempSwap = matrixBoard[objDataOnThisTurn.pointsSoldierOnBoard.pointX][objDataOnThisTurn.pointsSoldierOnBoard.pointY];
        matrixBoard[objDataOnThisTurn.pointsSoldierOnBoard.pointX][objDataOnThisTurn.pointsSoldierOnBoard.pointY] = matrixBoard[objDataOnThisTurn.whichIndexForward.pointX][objDataOnThisTurn.whichIndexForward.pointY];
        matrixBoard[objDataOnThisTurn.whichIndexForward.pointX][objDataOnThisTurn.whichIndexForward.pointY] = tempSwap;
        console.log('matrix board update', matrixBoard); 
    }


    const checksWhoNeedToPlay = () => {
        if(dataIsTurnPlayer.whoIsplaying === turnToPlay) {
            return 1; // valid
        }
        return 0; // invalid in turn
    }

    

    const getAllowPossibillityToMove = (objDataOnThisTurn) => {
        const xValue = objDataOnThisTurn['pointsSoldierOnBoard']['pointX'];
        const yValue = objDataOnThisTurn['pointsSoldierOnBoard']['pointY'];
        console.log('xValue = ', xValue);
        console.log('yValue =', yValue);
        const stepUpperX = xValue + 1;
        const stepDownerX = xValue - 1;
        const stepUpperY = yValue + 1;
        const stepDownerY = yValue - 1;     
        
        console.log('have getAllowPossibillityToMove?');
        if(objDataOnThisTurn.whoIsplaying === 'white') {
            if(limitedMovePlayer(stepDownerX, stepUpperY, objDataOnThisTurn.whoIsplaying)){
                objDataOnThisTurn.listAlignToMoves.left = [stepDownerX, stepUpperY];
            }
            if(limitedMovePlayer(stepDownerX, stepDownerY, objDataOnThisTurn.whoIsplaying)){
                objDataOnThisTurn.listAlignToMoves.right = [stepDownerX, stepDownerY];
            }
        }
        else if(objDataOnThisTurn.whoIsplaying === 'black'){
            console.log('getAllowPossibillityToMove black', stepDownerX, stepUpperY);
            console.log('getAllowPossibillityToMove black', stepDownerX, stepDownerY);
            if(limitedMovePlayer(stepUpperX, stepUpperY, objDataOnThisTurn.whoIsplaying)){
               console.log('****turn black*****', [stepUpperX, stepUpperY]);
                objDataOnThisTurn.listAlignToMoves.left = [stepUpperX, stepUpperY];
            }
            if(limitedMovePlayer(stepUpperX, stepDownerY, objDataOnThisTurn.whoIsplaying)){
                objDataOnThisTurn.listAlignToMoves.right = [stepUpperX, stepDownerY];
                console.log('*****turn black*****', [stepUpperX, stepDownerY]);
            }
        }
        console.log('list to where move', objDataOnThisTurn);
    }

   
    const limitedMovePlayer = (xAxisPoint, yAxisPoint, whoIsTurn) => {
        console.log('matrix board', matrixBoard);
        if(xAxisPoint >= 0 && xAxisPoint <= 7) {
            if(yAxisPoint >= 0 && yAxisPoint <=7) {
                if(matrixBoard[xAxisPoint][yAxisPoint] === whoIsTurn) {
                    console.log('Error you turn is not valid, chance again'); 
                    return false;
                }else {
                    return true; // arrPoint is correct
                }
                
            }
            else {
                return false;
            }
        }
        return false;
    }


    // Countinu limited function listAlignToMoves  לא מוכן
    const lawfullForwaedMove = (objDataOnThisTurn) => {
        let indexForwardX = objDataOnThisTurn.whichIndexForward.pointX;
        let indexForwardY = objDataOnThisTurn.whichIndexForward.pointY;
  
        if(JSON.stringify([indexForwardX, indexForwardY]) === JSON.stringify(objDataOnThisTurn.listAlignToMoves.left)){
            if(objDataOnThisTurn.whoIsplaying !== matrixBoard[indexForwardX][indexForwardY]) {
                return true;
            }
            else {
                return false;
            }
        }

        if(JSON.stringify([indexForwardX, indexForwardY]) === JSON.stringify(objDataOnThisTurn.listAlignToMoves.right)){
            if(objDataOnThisTurn.whoIsplaying !== matrixBoard[indexForwardX][indexForwardY]) {
                return true;
            }
            else {
                return false;
            }
        }
        
    }

    const checkLawfulForwardMove = (listMoves, indexToMove, indexFromMove) => {
        //console.log('listAlignMove', listMoves);
        //console.log('index move', indexToMove);
        //console.log('game move', indexFromMove);
        const [x,y] = indexToMove;
        const arrPointForward = [x, y];
        const [,,isSoldierToMove] = indexToMove;
        const [,,isSoldierFromMove] = indexFromMove;
        //console.log('isSoldierToMove', isSoldierToMove);
        //console.log('isSoldierFromMove', isSoldierFromMove);
        for(let i=0; i<listMoves.length; i++){
            if(JSON.stringify(arrPointForward) === JSON.stringify(listAlignMove[i])) {
                if(isSoldierFromMove === 'white') {
                    if(isSoldierToMove === 'empty') {
                        return true;
                    }
                    
                }
                else if(isSoldierFromMove === 'black') {
                    if(isSoldierToMove === 'empty') {
                        return true;
                    }
                }
            }
        }
        return false;
    }

 
    const changeTurnPlayer = (objDataOnThisTurn)=>{
        if(objDataOnThisTurn.whoIsplaying === 'white') {
            //setTurnToPlay('black');
            turnToPlay = 'black';
            objDataOnThisTurn['whoIsplaying'] = 'black'
            //console.log('turnToPlay', turnToPlay);
        }
        else if(objDataOnThisTurn.whoIsplaying === 'black') {
            objDataOnThisTurn['whoIsplaying'] = 'white';
            turnToPlay = 'white';
            //setTurnToPlay('white');
        }
    }

   

    return(
        <div className="board">
            {matrixBoard.map((row, indexRow)=>{
                return(
                    <div key={indexRow} className="row">
                        {row.map((col, indexCol)=>{
                            if(isMark && ((indexRow === dataIsTurnPlayer.listAlignToMoves.left[0] && indexCol === dataIsTurnPlayer.listAlignToMoves.left[1]) || (indexRow === dataIsTurnPlayer.listAlignToMoves.right[0] && indexCol === dataIsTurnPlayer.listAlignToMoves.right[1]))) {
                                setColor = colorMark;
                            }
                            else {
                                if(indexRow%2===0){
                                    if(indexCol%2===0)
                                        setColor = color1;
                                    else    
                                        setColor = color2;
                                }  
                                else{
                                    if(indexCol%2===0)
                                        setColor = color2;
                                    else    
                                        setColor = color1;
                                }
                            }
                            return(
                                <div key={indexCol} className="col">
                                    <Square 
                                       
                                        color={setColor} 
                                        teamsSoldier={row[indexCol]} 
                                        indexSquare={[indexRow, indexCol]}
                                        // getGameMove={gameMove=>setGameMove(gameMove)}
                                        getGameMove={(indexMove)=>gamingMoveArround(indexMove)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                )
            })}


        </div>
    )
}

export default GameBoardDamka;






/*
return(
        <div className="board">
            {matrixBoard.map((row, indexRow)=>{
                return(
                    <div key={indexRow} className="row">
                        {row.map((col, indexCol)=>{
                            if(indexRow%2===0){
                                if(indexCol%2===0)
                                    setColor = color1;
                                else    
                                    setColor = color2;
                            }  
                            else{
                                if(indexCol%2===0)
                                    setColor = color2;
                                else    
                                    setColor = color1;
                            }
                            //
                           
                            //
                            return(
                                <div key={indexCol} className="col">
                                    <Square 
                                       
                                        color={setColor} 
                                        teamsSoldier={row[indexCol]} 
                                        indexSquare={[indexRow, indexCol]}
                                        // getGameMove={gameMove=>setGameMove(gameMove)}
                                        getGameMove={(indexMove)=>gamingMoveArround(indexMove)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                )
            })}


        </div>
    )

*/