import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Admin from './Pages/Admin/Admin';
import User from './Pages/User/User';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Admin" element={<Admin/>} />
        <Route path="/User" element={<User/>} />
      </Routes>
    </Router>
  );
}

export default App;
