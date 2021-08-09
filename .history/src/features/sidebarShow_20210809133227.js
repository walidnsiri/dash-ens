import { createSlice } from "@reduxjs/toolkit"



const changeStateSlice = createSlice({
    name: 'ChangeState',
    initialState: {
      sidebarShow: 'responsive'
    },
    reducers: {
      setsidebar: (state,action) => {
        console.log(action)
          state.sidebarShow=action.sidebarShow;
      }
    }
  });

export const {setsidebar} = changeStateSlice.actions
export default changeStateSlice.reducer