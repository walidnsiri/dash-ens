import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { queryApi } from "../utils/queryApi";
import { fetchImageFromService } from "../utils/getImage";

const initialState = {
  groupRdi: {},
  groupUP: {},
  status: 'loading',
  readCount: 0
}

const fetchimg = async (im) => {
  const img = await fetchImageFromService(im);
  if (img) return img;
};

export const fetchGroupUsers = createAsyncThunk("groups/fetchUsers", async (group)=> {
    let users=group.users;
    users.map(async(user,index) => {
            const img = await fetchimg(user.image);
            return { ...users[index], "image": img };
    });
    return group;
})



const changeGroupsSlice = createSlice({
    name: 'groups',
    initialState: initialState,
    reducers: {
        /*setNotifications: async (state, action) => {
            state.notifications=action.payload;
        },
        addNotification: (state,action) => {
          state.notifications.push(action.payload);
        },
        removeReadNotification: (state,action) => {
          let notif = action.payload;
          const notifs = state.notifications.filter(notification => notification.id_event != notif.id_event);
          state.notifications = notifs;
          const readNotifs =state.notifications.filter(notification => notification.read == false);
          state.readCount = readNotifs.length;
        }*/
    },
    extraReducers(builder){
      builder
        .addCase(fetchGroupUsers.pending, (state,action) => {
            state.status = 'loading';
        })
        .addCase(fetchGroupUsers.fulfilled, (state,action) => {
          state.status = 'succeeded';
          const group = action.payload;
          if(group.type=="rdi"){
            state.groupRdi = action.payload;
          }
          if(group.type=="up"){
            state.groupUP = action.payload;
          }
        })
        .addCase(fetchGroupUsers.rejected, (state,action) => {
          state.status = 'failed';
        })
    }
    
  });

export const selectGroupRdi = state => state.groups.groupRdi;
export const selectGroupUP = state => state.groups.groupUP;
//export const {setNotifications,removeReadNotification} = changeGroupsSlice.actions
export default changeGroupsSlice.reducer