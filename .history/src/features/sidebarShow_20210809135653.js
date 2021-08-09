import { createSlice } from "@reduxjs/toolkit"



const changeStateSlice = createSlice({
    name: 'ChangeState',
    initialState: {
      sidebarShow: 'responsive'
    },
    reducers: {
      setsidebar: (state,action) => {
        console.log(state.payload)
        state.sidebarShow = action.payload
        console.log(state.payload)
      }
    }
  });

export const {setsidebar} = changeStateSlice.actions
export default changeStateSlice.reducer