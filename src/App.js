import React, {useState} from 'react'
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Board} from "./Components/Board/Board";
import useSound from "use-sound";
import soundSelect from "./music/start.mp3";

function App() {
    const [soundEnabled, setSoundEnabled] = useState(false)
    const [play] = useSound(soundSelect, {soundEnabled})
    const lightTheme = {
        background: {background: 'radial-gradient(circle, #08d9d6 0%, #08d9d6 100%)'},
        headerText: {color: '#eaeaea'},
        headerBorder: {borderColor: '#ff2e63'},
        tableText: {color: '#eaeaea', backgroundColor: '#aa96da'},
        score: {
            scoreBox: {background: '#aa96da', color: '#eaeaea'}
        },
        buttonsColors: {backgroundColor: '#ff2e63', color: '#eaeaea'},
        footer: {color: '#eaeaea', borderColor: '#ff2e63'}
    }
    const darkTheme = {
        background: {background: 'radial-gradient(circle, #393e46 0%, #222831 100%)'},
        headerText: {color: '#eeeeee'},
        headerBorder: {borderColor: '#00adb5'},
        tableText: {color: '#eeeeee', backgroundColor: '#393e46'},
        score: {
            scoreBox: {background: '#393e46', color: '#eeeeee'}
        },
        buttonsColors: {backgroundColor: '#00adb5', color: '#eeeeee'},
        footer: {color: '#eeeeee', borderColor: '#00adb5'}
    }
    const [theme, setTheme] = useState({...darkTheme})
    let localTheme = JSON.parse(localStorage.getItem('theme'))
    if (!lightTheme) {
        localStorage.setItem('theme', JSON.stringify(darkTheme))
    }
    const setDark = () => {
        setTheme(darkTheme)
        localStorage.setItem('theme', JSON.stringify(darkTheme))
    }
    const setLight = () => {
        setTheme(lightTheme)
        localStorage.setItem('theme', JSON.stringify(lightTheme))
    }
    const soundsSwitch = () => {
        soundEnabled ? setSoundEnabled(false) : setSoundEnabled(true)
    }
    return (
        <div className="App" style={localTheme == null ? theme.background : localTheme.background}>
            <Header theme={localTheme == null ? theme : localTheme} setDark={setDark} setLight={setLight}
                    soundsSwitch={soundsSwitch}/>
            <Board theme={localTheme == null ? theme : localTheme} play={play} soundEnabled={soundEnabled}/>
            <Footer theme={localTheme == null ? theme : localTheme}/>
        </div>
    );
}

export default App;
