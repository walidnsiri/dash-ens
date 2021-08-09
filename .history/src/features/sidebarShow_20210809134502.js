import { createSlice } from "@reduxjs/toolkit"



const changeStateSlice = createSlice({
    name: 'ChangeState',
    initialState: {
      sidebarShow: 'responsive'
    },
    reducers: {
      setsidebar: (state,action) => {
        console.log(state.sidebarShow)
        console.log(action.sidebarShow)
        state.sidebarShow = action
        console.log(state.sidebarShow)
      }
    }
  });

export const {setsidebar} = changeStateSlice.actions
export default changeStateSlice.reducer