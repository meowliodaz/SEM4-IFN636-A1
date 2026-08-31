import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Game from './pages/Game';
import Review from './pages/Review';
import Admin from './pages/Admin';
import User from './pages/User';
import NewUser from './pages/NewUser';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Profile />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/game/:id/your-review" element={<Review />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/user/new" element={<NewUser />} />
        <Route path="/admin/user/:userId" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
