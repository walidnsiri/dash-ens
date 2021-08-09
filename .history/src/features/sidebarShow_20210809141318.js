import { createSlice } from "@reduxjs/toolkit"

const initialState={
  sidebarShow: 'responsive'
}

const changeStateSlice = createSlice({
    name: 'sidebar',
    initialState: initialState,
    reducers: {
      setsidebar: (state,action) => {
        state.sidebarShow = action.payload
      }
    }
  });

export const selectSidebar = state => state.sidebar.sidebarShow
export const {setsidebar} = changeStateSlice.actions
export default changeStateSlice.reducer