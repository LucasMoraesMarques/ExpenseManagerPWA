import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/screen1" element={<Screen1/>}/>
        <Route path="/screen2" element={<Screen2/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
