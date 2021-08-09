import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  notifications: [
    {
     user_id:"3asba",
     id_event:"361",
     type:"rdi",
     read: false,
     createdAt:"",
     modifiedAt:""
    },
    {
      user_id:"3asba",
      id_event:"361",
      type:"rdi",
      read: false,
      createdAt:"",
      modifiedAt:""
     },
     {
      user_id:"3asba",
      id_event:"361",
      type:"rdi",
      read: false,
      createdAt:"",
      modifiedAt:""
     },
     {
      user_id:"3asba",
      id_event:"361",
      type:"rdi",
      read: false,
      createdAt:"",
      modifiedAt:""
     },
     {
      user_id:"3asba",
      id_event:"361",
      type:"rdi",
      read: false,
      createdAt:"",
      modifiedAt:""
     }
  ]
}


const changeNotificationsSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        setNotifications: (state, action) => {
          //fetch event from database and update notifications
          state.notifications=action.payload;
      }
    }
  });

export const selectNotifications = state => state.notifications.notifications
export const {setNotifications} = changeNotificationsSlice.actions
export default changeNotificationsSlice.reducer