import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Patients from './Pages/Patients';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/patients' element={<Patients/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
