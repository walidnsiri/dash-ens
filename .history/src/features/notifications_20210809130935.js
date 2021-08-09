import { createSlice } from "@reduxjs/toolkit"



const changeNotificationsState = createSlice({
    name: 'ChangeNotificationState',
    initialState: {
      notifications: {}
    },
    reducers: {
        setNotifications(state,{ type, ...rest }) {
          return {...state, ...rest};
      }
    }
  });

export const {setNotifications} = changeNotificationsState.actions
export default changeNotificationsState.reducer