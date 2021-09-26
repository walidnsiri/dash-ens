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
import {selectReadCount,selectNotifications,fetchNotifications,fetchNotification} from '../features/notificationsSlice';
import { Client } from '@stomp/stompjs';
import { UserContext } from "utils/UserContext";
import addNotification from 'react-push-notification';
import { fetchImageFromService } from "../utils/getImage";
import Moment from 'react-moment';
import moment from 'moment'
import useravatar from "../assets/img/avatars/user.png";

const SOCKET_URL = 'ws://localhost:8799/ws';

const TheHeaderDropdownMssg = () => {
  const [user,] = useContext(UserContext)
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const readCount = useSelector(selectReadCount);

  const notificationsStatus = useSelector(state => state.notifications.status)
  useEffect(()=>  {
    let onConnected = () => {
      client.subscribe('/users/queue/messages', function (msg) {
        if (msg.body) {
          var jsonBody = JSON.parse(msg.body);
          if (jsonBody) {
            if(user.appNotificationEnabled){
              dispatch(fetchNotification(jsonBody.notificationView));
              addNotification({
                duration: 10000,
                title: `Notification ${jsonBody.notificationView.type}`,
                subtitle: jsonBody.notificationView.createdAt,
                message: 'Vous avez reçu une notification',
                theme: 'darkblue',
                native: true // when using native, your OS will handle theming.
              });
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
    if( notifications?.length == 0) {dispatch(fetchNotifications());}
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
          <strong>Vous avez {readCount} notifications</strong>
        </CDropdownItem>

        {notifications?.map((notificatio, index) => (
        <CDropdownItem key={index}>
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={notificatio?.image ? notificatio?.image : useravatar}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                
              </div>
            </div>
            <div>
              <small className="text-muted">{notificatio?.fullName}</small>
              <small className="text-muted float-right mt-1"><Moment fromNow locale="fr">{notificatio?.createdAt}</Moment></small>
            </div>
            <div className="font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span>
              Notification {notificatio?.type}
            </div>
            <div className="small text-muted text-truncate">
            {moment(notificatio?.due_date).format('L')}
            </div>
          </div>
        </CDropdownItem>
        ))}
        
        <CDropdownItem href="/notifications" className="text-center border-top"><strong>Consulter toutes notifications</strong></CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownMssg