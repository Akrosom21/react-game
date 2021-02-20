import React, {useState} from 'react'
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Board} from "./Components/Board/Board";

function App() {
    const lightTheme = {
        background: {background: 'radial-gradient(circle, #717f91 0%, #515282 100%)'},
        headerText: {color: '#000'},
        tableText: {color: '#000'},
        score: {
            scoreBox: {background: '#999', color: '#000'}
        },
        footer: {color: '#000'}
    }
    const darkTheme = {
        background: {background: 'radial-gradient(circle, #717f91 0%, #515282 100%)'},
        headerText: {color: '#fff'},
        tableText: {color: '#fff'},
        score: {
            scoreBox: {background: '#222', color: '#fff'}
        },
        footer: {color: '#fff'}
    }
    const [theme, setTheme] = useState({...lightTheme})
    let localTheme = JSON.parse(localStorage.getItem('theme'))
    if (!lightTheme) {
        localStorage.setItem('theme', JSON.stringify(lightTheme))
    }
    const setDark = () => {
        setTheme(darkTheme)
        localStorage.setItem('theme', JSON.stringify(darkTheme))
    }
    const setLight = () => {
        setTheme(lightTheme)
        localStorage.setItem('theme', JSON.stringify(lightTheme))
    }

  return (
    <div className="App" style={lightTheme.background}>
      <Header theme={localTheme == null ? theme : localTheme} setDark={setDark} setLight={setLight}/>
      <Board theme={localTheme == null ? theme : localTheme}/>
      <Footer theme={localTheme == null ? theme : localTheme}/>
    </div>
  );
}

export default App;
