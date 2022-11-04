import {useState} from 'react';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import LoginPage from './components/LoginPage/LoginPage'
import SignUpPage from './components/SignUpPage/SignUpPage'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
const App = () =>{
  const [user,setUser] = useState('')
  return (
    <Router>
      <div className="App">
          <Routes>
              <Route path="/" element={<Homepage user={user}/>}/>
              <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
              <Route path="/signup" element={<SignUpPage/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
