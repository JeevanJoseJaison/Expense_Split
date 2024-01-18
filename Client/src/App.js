
import './App.css';


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"
import AddUser from "./Components/AddUser"
import UserDetails from "./Components/UserDetails"
import { useDispatch } from 'react-redux';
import { setUserName, setOwes ,setIndividual ,setHistory , setDetail} from './Store/Action';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpens, setIsModalOpens] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', mobile: '' });
  const [users, setUsers] = useState([]);
  const [switchs, setSwitch] = useState(true)
  const [calc , setCalc] = useState(true)
  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModals = () => {
    setIsModalOpens(true);
  };

  useEffect(() => {
    const callUsers = async () => {
      try {

        // Make a POST request without waiting for the response
        const response = await axios.get('http://localhost:5000/exp/callUser');
        dispatch(setUserName(response.data.name))
        dispatch(setHistory(response.data.history))
        dispatch(setDetail(response.data.detail))
        console.log(response.data.detail);
      } catch (error) {
        console.error('Error making request:', error);
      }
    };
    callUsers()
  }, [calc])
  useEffect(()=>{
    const fetchBalance =async () =>{
      try{
      const response = await axios.get('http://localhost:5000/exp/overAllBalance');
      dispatch(setOwes(response.data))
    } catch (error) {
      console.error('Error making request:', error);
    }
    try{
      const response2 = await axios.get('http://localhost:5000/exp/individualBalance');
      dispatch(setIndividual(response2.data))
    } catch (error) {
      console.error('Error making request:', error);
    }
   
    }
   fetchBalance()
  },[calc])


  return (
    <div>
      <Navbar onClicks={openModal} onClickss ={openModals} setCalc = {setCalc} calc={calc}/>
      <Home switchs ={switchs} setSwitch ={setSwitch} setCalc ={setCalc} calc ={calc}/>
      <AddUser isModalOpen={isModalOpen} openModal={openModal} userData={userData} setUserData={setUserData} setIsModalOpen={setIsModalOpen}
        users={users} setUsers={setUsers} setCalc = {setCalc} calc={calc}
      />
      <UserDetails openModals ={openModals} isModalOpens ={isModalOpens} setIsModalOpens ={setIsModalOpens}/>


    </div>
  );
}

export default App;
