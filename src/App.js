import GameBoardDamka from './View/GameBoardDamka';

function App() {

  const board = [
    // ['empty' ,'white', 'empty' ,'white', 'empty' ,'white', 'empty', 'white'],
    // ['white', 'empty', 'white', 'empty', 'white', 'empty', 'white', 'empty'],   
    // ['empty' ,'white', 'empty' ,'white', 'empty' ,'white', 'empty', 'white'],
    // ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    // ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    // ['black', 'empty', 'black', 'empty', 'black', 'empty', 'black', 'empty'],
    // ['empty', 'black', 'empty', 'black', 'empty', 'black', 'empty', 'black'],
    // ['black', 'empty', 'black', 'empty', 'black', 'empty', 'black', 'empty'], 
    ['black', 'empty', 'black', 'empty', 'black', 'empty', 'black', 'empty'].reverse(),
    ['empty', 'black', 'empty', 'black', 'empty', 'black', 'empty', 'black'].reverse(),
    ['black', 'empty', 'black', 'empty', 'black', 'empty', 'black', 'empty'].reverse(), 
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'].reverse(),
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'].reverse(),
    ['empty' ,'white', 'empty' ,'white', 'empty' ,'white', 'empty', 'white'].reverse(),
    ['white', 'empty', 'white', 'empty', 'white', 'empty', 'white', 'empty'].reverse(),   
    ['empty' ,'white', 'empty' ,'white', 'empty' ,'white', 'empty', 'white'].reverse(),
  ]

  return (
    <div className="App">
      <GameBoardDamka board={board}/>
    </div>
  );
}

export default App;