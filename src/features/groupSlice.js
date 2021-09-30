import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { queryApi } from "../utils/queryApi";
import { fetchImageFromService } from "../utils/getImage";

const initialState = {
  groupRdi: [],
  groupUP: [],
  status: 'loading',
  readCount: 0
}

const fetchimg = async (im) => {
  const img = await fetchImageFromService(im);
  if (img) return img;
};

export const fetchGroupUsersAdminOrDsi = createAsyncThunk("groups/fetchUsers/adminOrDsi", async (group)=> {
  let users=group.users;
  let new_users = [];
  await Promise.all(users.map(async(user,index) => {
          const new_user =  await fetchUserImage(user);
          new_users.push(new_user);
  }));
  group.users=new_users;
  return group;
})



export const fetchGroupUsers = createAsyncThunk("groups/fetchUsers", async (group)=> {
    let users=group.users;
    let new_users = [];
    await Promise.all(users.map(async(user,index) => {
            const new_user =  await fetchUserImage(user);
            new_users.push(new_user);
    }));
    group.users=new_users;
    return group;
})

const fetchUserImage = async(user)  => {
  const img = await fetchimg(user.image);
  return {...user, "image" : img? img : ""}
}



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
        .addCase(fetchGroupUsersAdminOrDsi.pending, (state,action) => {
          state.status = 'loading';
        })
        .addCase(fetchGroupUsersAdminOrDsi.fulfilled, (state,action) => {
          state.status = 'succeeded';
          const group = action.payload;
          if(group.type=="rdi"){
            /*let grp = state.groupRdi;
            let actionp = action.payload;
            if(state.groupRdi.length > 0){
              state.groupRdi = [...grp,...actionp];
            }else {
              state.groupRdi = [action.payload]
            }*/
            state.groupRdi.push(action.payload);
          }
         if(group.type=="up"){
          /*let grp = state.groupUP;
          let actionp = action.payload;
            if(state.groupUP.length > 0){
              state.groupUP = [...grp,...actionp];
            }else {
              state.groupUP = [action.payload]
            }*/
            state.groupUP.push(action.payload);
          }
          
        })
        .addCase(fetchGroupUsersAdminOrDsi.rejected, (state,action) => {
          state.status = 'failed';
        })
    }
    
  });

export const selectGroupRdi = state => state.groups.groupRdi;
export const selectGroupUP = state => state.groups.groupUP;
//export const {setNotifications,removeReadNotification} = changeGroupsSlice.actions
export default changeGroupsSlice.reducer