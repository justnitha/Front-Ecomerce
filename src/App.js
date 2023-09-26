import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import FrontEndMentorEcomere from './pages/FrontEndMentorEcomere';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FrontEndMentorEcomere/>}/>
      </Routes>
    </Router>
  );
}

export default App;
