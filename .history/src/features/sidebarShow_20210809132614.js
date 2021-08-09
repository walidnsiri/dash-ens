import { createSlice } from "@reduxjs/toolkit"



const changeStateSlice = createSlice({
    name: 'ChangeState',
    initialState: {
      sidebarShow: 'responsive'
    },
    reducers: {
      setsidebar(state,action) {
          state.sidebarShow=action.payload;
      }
    }
  });

export const {setsidebar} = changeStateSlice.actions
export default changeStateSlice.reducer