import './App.css';
import TTTBoard from './components/TTTBoard';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/game" element={<GameScreen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
