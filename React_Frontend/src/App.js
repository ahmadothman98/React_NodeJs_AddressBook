import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login_form from "./pages/login";
import Signup_form from "./pages/register";
import './style.css';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
            <Route  exact path = "/" element={<Signup_form />} />
            <Route  exact path = "/login" element={<Login_form />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
