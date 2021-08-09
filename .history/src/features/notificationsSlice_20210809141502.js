import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  notifications: {}
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

export const {setNotifications} = changeNotificationsSlice.actions
export default changeNotificationsSlice.reducer