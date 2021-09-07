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
import {setNotifications,selectNotifications} from '../features/notificationsSlice';
import { Client } from '@stomp/stompjs';
import { UserContext } from "utils/UserContext";
import addNotification from 'react-push-notification';

const SOCKET_URL = 'ws://localhost:8799/ws';

const TheHeaderDropdownMssg = () => {
  const [user,] = useContext(UserContext)
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const [message,setMessage]= useState(null);

  useEffect(()=>  {
    let onConnected = () => {
      client.subscribe('/users/queue/messages', function (msg) {
        if (msg.body) {
          var jsonBody = JSON.parse(msg.body);
          console.log(jsonBody)
          if (jsonBody) {
            setMessage(jsonBody)
            if(user.appNotificationEnabled){
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


    /*const fetchNotifications = async () => {
      
      const body = {
        pageRequest: {
          number: 1,
          limit: 4,
        },
        query: {
          "user_id" : ""
        },
      };
      const [res, error] = await queryApi("notification/search", body, "POST");
      if (res) {
        //

      }
      if (error) {
        console.error(error);
      }
    };*/
  },[])

 // useEffect(()=> {console.log(message)},[message])
  
  const itemsCount = 4
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" /><CBadge shape="pill" color="info">{itemsCount}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Vous avez {itemsCount} notifications</strong>
        </CDropdownItem>
        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={'avatars/7.jpg'}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">John Doe</small>
              <small className="text-muted float-right mt-1">Just now</small>
            </div>
            <div className="text-truncate font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span> Important message
            </div>
            <div className="small text-muted text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={'avatars/6.jpg'}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-warning"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Jane Dovve</small>
              <small className="text-muted float-right mt-1">5 minutes ago</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={'avatars/5.jpg'}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-danger"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Janet Doe</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
          </div>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={'avatars/4.jpg'}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-info"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Joe Doe</small>
              <small className="text-muted float-right mt-1">4:03 AM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
          </div>
        </CDropdownItem>
        <CDropdownItem href="/notifications" className="text-center border-top"><strong>Consulter toutes notifications</strong></CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownMssg