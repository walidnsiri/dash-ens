import { createSlice } from "@reduxjs/toolkit"



const changeStateSlice = createSlice({
    name: 'ChangeState',
    initialState: {
      sidebarShow: 'responsive'
    },
    reducers: {
      setsidebar: (state,{ type, ...rest }) => {
        console.log({...rest})
        state.sidebarShow = {...state, ...rest}
      }
    }
  });

export const {setsidebar} = changeStateSlice.actions
export default changeStateSlice.reducer