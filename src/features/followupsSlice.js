import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { queryApi } from "../utils/queryApi";
import { fetchImageFromService } from "../utils/getImage";

const initialState = {
  followups: [],
  status: 'loading',
  readCount: 0
}

const fetchimg = async (im) => {
  const img = await fetchImageFromService(im);
  if (img) return img;
};
const fetchUser = async (id, index, notifs) => {
  const [res, error] = await queryApi("user/" + id);
  if (res) {
    const img = await fetchimg(res.image);
    notifs[index] = { ...notifs[index], "fullName": res.fullName, "image": img };
    return notifs;
  }
}

export const fetchFollowup = createAsyncThunk("followups/fetchFollowup", async (followup)=> {
  const [res, error] = await queryApi("user/" + followup.notification.userId);
  if (res) {
    const img = await fetchimg(res.image);
    return { ...followup, "fullName": res.fullName, "image": img };
  }
})



export const fetchFollowups = createAsyncThunk("followups/fetchFollowups", async ()=> {  
  const body = {
      pageRequest: {
        number: 1,
        limit: 4,
        sort: "descending"
      },
      query: {
        "user_id": "60cca063b036b51e8d33013a",
        "deleted" : false,
        "read" : false
      },
    };

    const [res, error] = await queryApi("notification/followup/search", body, "POST");
    if (res) {
      
        let followups = res.followups;
        await Promise.all(followups.map(async(follow, index) => {
          followups = await fetchUser(follow.notification.id_ens_modifier, index, followups);
        }));
        return [followups,res.read];
    }
    if (error) {
      return [];
    }

});


const changeFollowupsSlice = createSlice({
    name: 'followups',
    initialState: initialState,
    reducers: {
        setFollowups: async (state, action) => {
            state.followups=action.payload;
        },
        addFollowups: (state,action) => {
          state.followups.push(action.payload);
        }
    },
    extraReducers(builder){
      builder
        .addCase(fetchFollowups.pending, (state,action) => {
            state.status = 'loading';
        })
        .addCase(fetchFollowups.fulfilled, (state,action) => {
          state.status = 'succeeded';
          state.followups = action.payload[0];
          state.readCount = action.payload[1];
          console.log(state.followups)
        })
        .addCase(fetchFollowups.rejected, (state,action) => {
          state.status = 'failed';
        })
        .addCase(fetchFollowup.pending, (state,action) => {
          state.status = 'loading';
        })
        .addCase(fetchFollowup.fulfilled, (state,action) => {
          state.status = 'succeeded';
          state.followups.pop()
          state.followups.unshift(action.payload)
          state.readCount = state.readCount +1;
        })
        .addCase(fetchFollowup.rejected, (state,action) => {
          state.status = 'failed';
        })
    }
    
  });

export const selectFollowups = state => state.followups.followups
export const selectReadCount = state => state.followups.readCount
export const {setFollowups} = changeFollowupsSlice.actions
export default changeFollowupsSlice.reducer