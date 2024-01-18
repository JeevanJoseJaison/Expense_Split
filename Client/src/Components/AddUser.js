import Modal from 'react-modal';
import axios from 'axios';
import { useState } from 'react';

Modal.setAppElement('#root');

const AddUser = ({isModalOpen,userData,setUserData,setIsModalOpen,setUsers,users ,setCalc,calc}) => {
const [added , setAdded] = useState(false);
    const fetchData = async () => {
        try {    
  
          // Make a POST request without waiting for the response
          await axios.post('http://localhost:5000/exp/addUser', userData);
           setCalc(!calc)
           setAdded(true);
         
        } catch (error) {
          console.error('Error making request:', error);
        }
      };
      const timeoutId = setTimeout(() => {
        setAdded(false);
      }, 1000);

    const handleAddUser = () => {
        
        fetchData ();
        setUserData({ name: '', email: '', mobile: '' })
        clearTimeout(timeoutId);
      };
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
     
        setUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        if(name === "name")
        setUsers([...users, value]);
      };
    
    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add User Modal"
            >
                <h2>Add User</h2>
                <form>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Mobile:
                        <input
                            type="tel"
                            name="mobile"
                            value={userData.mobile}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type="button" onClick={handleAddUser}>
                        Add User
                    </button>
                    <button type="button" onClick={closeModal}>
                        Close
                    </button>
                    {added&&(<h4>User Added</h4>)}
                </form>
            </Modal>
        </>
    )
}
export default AddUser;