import './App.css';
import {Routes,Route, useLocation} from "react-router-dom";
import { HomePage,LandingPage, DetailPage, FormPage } from './views/index';
import Nav from './components/Nav/Nav';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      { location.pathname === "/home" && <Nav />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path="/form" element={<FormPage/>} />
      </Routes>
    </div>
  );
}

export default App;
