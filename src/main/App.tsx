import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatesList from '../Views/States/StatesList';
import StatesAdd from '../Views/States/StatesAdd';
import StatesEdit from '../Views/States/StatesEdit';
import StatesDetail from '../Views/States/StatesDetail';
import GalaTypesList from '../Views/GalaTypes/GalaTypesList';
import GalaTypesAdd from '../Views/GalaTypes/GalaTypesAdd';
import GalaTypesDetail from '../Views/GalaTypes/GalaTypesDetail';
import GalaTypesEdit from '../Views/GalaTypes/GalaTypesEdit';

function App() {
  return (
    <BrowserRouter>
    <div className='container'>
      <Sidebar/>
      <Header subtitle='CONTEST'/>
      <Routes>
        <Route path="/states" element={<StatesList/>}></Route>
        <Route path="/states/add" element={<StatesAdd/>}></Route>
        <Route path="/states/edit/:id" element={<StatesEdit/>}></Route>
        <Route path="/states/:id" element={<StatesDetail/>}></Route>

        <Route path="/galaTypes" element={<GalaTypesList/>}></Route>
        <Route path="/galaTypes/add" element={<GalaTypesAdd/>}></Route>
        <Route path="/galaTypes/edit/:id" element={<GalaTypesEdit/>}></Route>
        <Route path="/galaTypes/:id" element={<GalaTypesDetail/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
