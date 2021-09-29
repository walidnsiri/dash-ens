import React, { useState, useEffect } from "react";

import avatar from "../../../assets/img/avatars/user.png";

const CheckboxCardMultipleSuivi = (props) => {

    const {users,setEnseignant,enseignant} = props;
    const [ens,setEns] = useState({});

    useEffect(()=>{
        setEns(enseignant);
    },[enseignant])
    return (
    <>
        <div className="gridCheckbox" >
            {users?.map((user,index) => {
            return <label key={index} className="checkboxcard" style={{marginRight:"10px"}} onClick={e=>{setEnseignant(user);setEns(user)}} >
                <input className="checkboxcard__input" type="checkbox" checked={user == ens? true: false} onChange={e=>setEns(user)}/>
                <div className="checkboxcard__body">
                    <div className="checkboxcard__body-cover"><img className="checkboxcard__body-cover-image" src={user?.image? user?.image : avatar} /><span className="checkboxcard__body-cover-checkbox">
                        <svg className="checkboxcard__body-cover-checkbox--svg" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg></span></div>
                    <header className="checkboxcard__body-header">
                        <h2 className="checkboxcard__body-header-title">{user?.fullName}</h2>
                        <p className="checkboxcard__body-header-subtitle">{user?.authorities[0]?.authority}</p>
                    </header>
                </div>
            </label>
            })}
        </div>
    </>
    )
}

export default CheckboxCardMultipleSuivi;