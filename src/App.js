import React from 'react'
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Board} from "./Components/Board/Board";

function App() {
  return (
    <div className="App">
      <Header/>
      <Board/>
      <Footer/>
    </div>
  );
}

export default App;
