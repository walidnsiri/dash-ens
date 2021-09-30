import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
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

export const fetchGroupUsersAdminOrDsi = createAsyncThunk("groups/fetchUsers/adminOrDsi", async (group) => {
  let users = group.users;
  let new_users = [];
  await Promise.all(users.map(async (user, index) => {
    const new_user = await fetchUserImage(user);
    new_users.push(new_user);
  }));
  group.users = new_users;
  return group;
})



export const fetchGroupUsers = createAsyncThunk("groups/fetchUsers", async (group) => {
  let users = group.users;
  let new_users = [];
  await Promise.all(users.map(async (user, index) => {
    const new_user = await fetchUserImage(user);
    new_users.push(new_user);
  }));
  group.users = new_users;
  return group;
})

const fetchUserImage = async (user) => {
  const img = await fetchimg(user.image);
  return { ...user, "image": img ? img : "" }
}



const changeGroupsSlice = createSlice({
  name: 'groups',
  initialState: initialState,
  reducers: {
    resetState: async (state, action) => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGroupUsers.pending, (state, action) => {
        return {...state, status : 'loading'};
      })
      .addCase(fetchGroupUsers.fulfilled, (state, action) => {
        const group = action.payload;
        if (group.type == "rdi") {
          return {...state, groupRdi : group, status : 'succeeded'}
        }
        if (group.type == "up") {
          return {...state, groupUP : group, status : 'succeeded'}
        }
      })
      .addCase(fetchGroupUsers.rejected, (state, action) => {
        return {...state, status : 'failed'};
      })
      .addCase(fetchGroupUsersAdminOrDsi.pending, (state, action) => {
        return {...state, status : 'loading'};
      })
      .addCase(fetchGroupUsersAdminOrDsi.fulfilled, (state, action) => {
        const group = action.payload;
        if (group.type == "rdi") {
            let groupUP = Object.assign([], state.groupUP);
            groupUP.push(group);
            return {...state, groupUp : groupUP, status : 'succeeded'}
        }
        if (group.type == "up") {
            let groupRDI = Object.assign([], state.groupRdi);
            groupRDI.push(group);
            return {...state, groupRdi : groupRDI, status : 'succeeded'}
        }

      })
      .addCase(fetchGroupUsersAdminOrDsi.rejected, (state, action) => {
        return {...state, status : 'failed'};
      })
  }

});

export const selectGroupRdi = state => state.groups.groupRdi;
export const selectGroupUP = state => state.groups.groupUP;
export const {resetState} = changeGroupsSlice.actions
export default changeGroupsSlice.reducer