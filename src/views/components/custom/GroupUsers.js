import React, { useState, useEffect } from "react";
import avatar from "../../../assets/img/avatars/user.png";
const GroupUsersCard = (props) => {

    const {users} = props;

    return (
        <>
            <div className="scroll-notifs">
            <div class="cards-grp-list">
                {users?.map((user,index) => {
                    return (<div class={"card-group "+index}>
                    <div class="card_image"> <img src={user?.image? user?.image : avatar} /> </div>
                    <div class="card_title title-white">
                        <p>{user.fullName}</p>
                    </div>
                </div>)
                })}
            </div>
            </div>
        </>
    )
}

export default GroupUsersCard;