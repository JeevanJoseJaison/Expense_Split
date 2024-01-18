import React, { useState } from 'react';
import Modal from 'react-modal';
import "./userDetail.css"
import { useSelector } from 'react-redux';
Modal.setAppElement('#root');


const UserDetails = ({ openModels, isModalOpens, setIsModalOpens }) => {
    const user = useSelector((state) => state.detail)

    const closeModal = () => {
        setIsModalOpens(false);
    };




    return (
        <>
            <Modal
                isOpen={isModalOpens}
                onRequestClose={closeModal}
                contentLabel="Add User Modal"
            >
                <div className='userDetail'>
                    <h2 >User Detail</h2>
                    <button type="button" className='userButton' onClick={closeModal}>
                        Close
                    </button>
                    <div className='userList'>
                        {user.map((detail, index) => (
                            <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                                <p>{detail.name}</p>
                                <p>{detail.email}</p>
                                <p>{detail.mobile}</p>
                                <p>............</p>
                            </div>
                        ))}
                    </div>
                </div>


            </Modal>
        </>
    )
}
export default UserDetails;