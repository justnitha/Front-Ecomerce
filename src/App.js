import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontEndMentor_Ecomere from './pages/FrontEndMentor-Ecomere';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Front-Ecomere' element={<FrontEndMentor_Ecomere/>}/>
      </Routes>
    </Router>
  );
}

export default App;
