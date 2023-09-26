import './App.css';
import {Routes,Route, useLocation} from "react-router-dom";
import { HomePage,LandingPage, DetailPage, FormPage } from './views/index';

import About from './views/About/About';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path="/form" element={<FormPage/>} />
        <Route path="/about" element= {<About/>}/>
      </Routes>
    </div>
  );
}

export default App;
