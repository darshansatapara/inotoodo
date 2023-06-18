import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home';
import NoteState from './contaxt/notes/NoteState';
import Alert from './component/alert';
import Login from './component/Login';
import Singup from './component/Singup';



function App() {


  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              path="/signup"
              element={<Singup showAlert={showAlert} />}
            />
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
          </Routes>

        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
