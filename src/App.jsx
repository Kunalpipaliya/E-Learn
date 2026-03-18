import logo from './logo.svg';
import './App.css';
import SIgnUp from './Auth/SIgnUp';
import Login from './Auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Dashboard from './Pages/Dashboard';
import Language from './Pages/Language';
import Topic from './Pages/Topic';
import Questions from './Pages/Questions';
import Drawer from '@mui/material/Drawer';
import ResponsiveDrawer from './Components/Drawer';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="App">
      <Toaster position='top-center' reverseOrder={false}/>
      <BrowserRouter>
        <Switch>
          
          <Route path="/dashboard">
            <ResponsiveDrawer/>
            <Dashboard/>

          </Route>
          <Route path="/signup">
            <SIgnUp/>
          
          </Route>
          <Route path="/">
            <Login/>
          
          </Route>
        </Switch>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
