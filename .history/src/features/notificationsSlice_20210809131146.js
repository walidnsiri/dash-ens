import { createSlice } from "@reduxjs/toolkit"



const changeNotificationsSlice = createSlice({
    name: 'changeNotificationsSlice',
    initialState: {
      notifications: {}
    },
    reducers: {
        setNotifications(state,{ type, ...rest }) {
          return {...state, ...rest};
      }
    }
  });

export const {setNotifications} = changeNotificationsSlice.actions
export default changeNotificationsSlice.reducer