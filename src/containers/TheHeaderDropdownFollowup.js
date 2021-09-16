import React, {useEffect,useState,useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { queryApi } from "../utils/queryApi";
import {selectReadCount,selectFollowups,fetchFollowups,fetchFollowup} from '../features/followupsSlice';
import { Client } from '@stomp/stompjs';
import { UserContext } from "utils/UserContext";
import addNotification from 'react-push-notification';
import { fetchImageFromService } from "../utils/getImage";
import Moment from 'react-moment';
import moment from 'moment'
import useravatar from "../assets/img/avatars/user.png";

const SOCKET_URL = 'ws://localhost:8799/ws';

const TheHeaderDropdownFollowup = () => {
  const [user,] = useContext(UserContext)
  const dispatch = useDispatch();
  const followups = useSelector(selectFollowups);
  const readCount = useSelector(selectReadCount);

  const followupStatus = useSelector(state => state.followups.status)
  
  useEffect(()=>  {
      
    let onConnected = () => {
      client.subscribe('/users/queue/followups', function (msg) {
        if (msg.body) {
          var jsonBody = JSON.parse(msg.body);
          if (jsonBody) {
            if(user.appNotificationEnabled){
              dispatch(fetchFollowup(jsonBody.followupView));
              addNotification({
                duration: 10000,
                title: `Suivi ${jsonBody.followupView.notification.type}`,
                subtitle: jsonBody.followupView.notification.createdAt,
                message: 'Vous avez reçu une notification de suivi',
                theme: 'darkblue',
                native: true // when using native, your OS will handle theming.
              });
              console.log(jsonBody)
            }
          }
        }
      });
    }

    let onDisconnected = () => {
      console.log("Disconnected!!")
    }

    const client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected,
      connectHeaders: {username: user.id}
    });

    client.activate();
    if(followups.length == 0) {dispatch(fetchFollowups);}
  },[])


  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" /><CBadge shape="pill" color="info">{readCount}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Vous avez {readCount} notifications de suivi</strong>
        </CDropdownItem>

        {followups?.map((follow, index) => (
        <CDropdownItem key={index}>
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={follow?.image ? follow?.image : useravatar}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                
              </div>
            </div>
            <div>
              <small className="text-muted">{follow?.fullName}</small>
              <small className="text-muted float-right mt-1"><Moment fromNow locale="fr">{follow?.createdAt}</Moment></small>
            </div>
            <div className="font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span>
              Notification {follow?.type}
            </div>
            <div className="small text-muted text-truncate">
            {moment(follow?.notification.due_date).format('L')}
            </div>
          </div>
        </CDropdownItem>
        ))}
        
        <CDropdownItem href="/followups" className="text-center border-top"><strong>Consulter toutes notifications de suivi</strong></CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownFollowup