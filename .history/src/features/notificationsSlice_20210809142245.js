import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  notifications: [{1:"3asba"}]
}


const changeNotificationsSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        setNotifications: (state, action) => {
          state.notifications=action.payload;
      }
    }
  });

export const selectNotifications = state => state.notifications.notifications
export const {setNotifications} = changeNotificationsSlice.actions
export default changeNotificationsSlice.reducer