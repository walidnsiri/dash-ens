import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  notifications: [
    {
     user_id:{},
     id_event:{},
     type:"rdi",
     read: false,
     createdAt:"",
     modifiedAt:""
    },
    
  ]
}


const changeNotificationsSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        setNotifications: (state, action) => {
          //fetch event from database and update events
          // to do
          //fetch user from database and update users

          state.notifications=action.payload;
      }
    }
  });

export const selectNotifications = state => state.notifications.notifications
export const {setNotifications} = changeNotificationsSlice.actions
export default changeNotificationsSlice.reducer