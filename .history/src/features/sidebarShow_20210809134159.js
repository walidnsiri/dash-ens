import { createSlice } from "@reduxjs/toolkit"



const changeStateSlice = createSlice({
    name: 'ChangeState',
    initialState: {
      sidebarShow: 'responsive'
    },
    reducers: {
      setsidebar: (state,{ type, ...rest }) => {
        console.log(state.sidebarShow)
        console.log({...rest})
        state.sidebarShow = {...state, ...rest}
        console.log(state.sidebarShow)
      }
    }
  });

export const {setsidebar} = changeStateSlice.actions
export default changeStateSlice.reducer