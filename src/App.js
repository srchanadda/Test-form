import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormPage from './components/Form';

function App() {
  return (
    
        <BrowserRouter>
        <div className='App-header'>
          <Routes>
            <Route path="/" element={<FormPage/>}/>
          </Routes>
        </div>
        </BrowserRouter>
  );
}

export default App;
