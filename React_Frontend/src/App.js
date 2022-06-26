import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LOGIN_FORM from "./pages/login";
import SIGNUP_FORM from "./pages/register";
import MAIN_PAGE from "./pages/main"
import './style.css';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route  exact path = "/" element={<LOGIN_FORM/>} />
          <Route  exact path = "/signup" element={<SIGNUP_FORM />} />
          <Route  exact path = "/main" element={<MAIN_PAGE />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
