import { createSlice } from "@reduxjs/toolkit"

const initialState={
  sidebarShow: 'responsive'
}

const changeStateSlice = createSlice({
    name: 'sidebar',
    initialState: initialState,
    reducers: {
      setsidebar: (state,action) => {
        console.log(state.sidebarShow)
        state.sidebarShow = action.payload
        console.log(state.sidebarShow)
      }
    }
  });

export const {setsidebar} = changeStateSlice.actions
export default changeStateSlice.reducer