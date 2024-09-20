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
import JuriesAdd from '../Views/Juries/JuriesAdd';
import JuriesDetail from '../Views/Juries/JuriesDetail';
import JuriesEdit from '../Views/Juries/JuriesEdit';
import JuriesList from '../Views/Juries/JuriesList';
import ParticipantsAdd from '../Views/Participants/ParticipantsAdd';
import ParticipantsDetail from '../Views/Participants/ParticipantsDetail';
import ParticipantsEdit from '../Views/Participants/ParticipantsEdit';
import ParticipantsList from '../Views/Participants/ParticipantsList';

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

        <Route path="/juries" element={<JuriesList/>}></Route>
        <Route path="/juries/add" element={<JuriesAdd/>}></Route>
        <Route path="/juries/edit/:id" element={<JuriesEdit/>}></Route>
        <Route path="/juries/:id" element={<JuriesDetail/>}></Route>

        <Route path="/participants" element={<ParticipantsList/>}></Route>
        <Route path="/participants/add" element={<ParticipantsAdd/>}></Route>
        <Route path="/participants/edit/:id" element={<ParticipantsEdit/>}></Route>
        <Route path="/participants/:id" element={<ParticipantsDetail/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
