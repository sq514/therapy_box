
import './App.css';
import Homepage from './components/Homepage/Homepage';
import LoginPage from './components/LoginPage/LoginPage'
import SignUpPage from './components/SignUpPage/SignUpPage'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/signup" element={<SignUpPage/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
