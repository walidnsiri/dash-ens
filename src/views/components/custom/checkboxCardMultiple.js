import React, { useState, useEffect } from "react";

import avatar from "../../../assets/img/avatars/user.png";
import {
    CCol,
    CAlert,
} from "@coreui/react";

const CheckboxCardMultiple = (props) => {

    const {users,setEnseignant,enseignant,checkboxgrid,setFilterUsersCombines,type,setSelectsUsers} = props;
    const [userse,setUserse] = useState([]);
    const [selectedUsers,setSelectedUsers] = useState([]);

    const addOrRemoveUser = (user) => {
        if(setFilterUsersCombines){
            setFilterUsersCombines(user);
        }
    }

    const updateSelectedUsersList =(users) =>{
        if(setSelectsUsers) {
            setSelectsUsers(users);
        }
    }

     useEffect(() => {
        if(type == "added"){setSelectedUsers(users)}
      }, [users])

      useEffect(() => {
        updateSelectedUsersList(selectedUsers);
      }, [selectedUsers])
    
    
    
    const handleUserSelect = (e,user) => {
        e.preventDefault();
        setTimeout(()=>{
            const u = selectedUsers.filter(u => u.id === user.id);
            if(u.length > 0){
                const us = selectedUsers.filter(u => u.id !== user.id);
                setSelectedUsers([...us]);
            }
            if(u.length == 0){
                if(selectedUsers.length == 0){
                    setSelectedUsers([user]);
                }
                else {
                    setSelectedUsers([...selectedUsers, user]);
                }
            }
            addOrRemoveUser(user);
        },200)
    }

    return (
    <>
    {users?.length >0 ? 
        <div className={checkboxgrid} >
            {users?.map((user,index) => {
            return <label key={index*Math.random(10)} className="checkboxcard" style={{marginRight:"10px"}} onClick={e => {handleUserSelect(e,user)}} >
                <input className="checkboxcard__input" type="checkbox" checked={selectedUsers.includes(user)? true: false} onChange={e=>{}}/>
                <div className="checkboxcard__body">
                    <div className="checkboxcard__body-cover"><img className="checkboxcard__body-cover-image" src={user?.image? user?.image : avatar} /><span className="checkboxcard__body-cover-checkbox">
                        <svg className="checkboxcard__body-cover-checkbox--svg" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg></span></div>
                    <header className="checkboxcard__body-header">
                        <h2 className="checkboxcard__body-header-title">{user?.fullName}</h2>
                        <p className="checkboxcard__body-header-subtitle">{user?.authorities[0]?.authority? user?.authorities[0]?.authority : ""}</p>
                    </header>
                </div>
            </label>
            })}
        </div>
    :<CCol sm="12" xl="12" xs="12" md="12" style={{ paddingTop: "4%" }}>
    <CAlert color="warning" className="h-100">
        Pas de d'utilisateurs non assignées trouvés.
    </CAlert>
</CCol>
    }
    </>
    )
}

export default CheckboxCardMultiple;