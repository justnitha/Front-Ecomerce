import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import FrontEndMentor_Ecomere from './pages/FrontEndMentor-Ecomere';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FrontEndMentor_Ecomere/>}/>
      </Routes>
    </Router>
  );
}

export default App;
