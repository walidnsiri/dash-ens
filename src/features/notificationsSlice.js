import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { queryApi } from "../utils/queryApi";
import { fetchImageFromService } from "../utils/getImage";
/*{
     id_event:"",
     type:"",
     read: false,
     createdAt:"",
     modifiedAt:"",
     fullName: "",
     image: ""
    },*/

const initialState = {
  notifications: [],
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

export const fetchNotification = createAsyncThunk("notifications/fetchNotification", async (notification)=> {
  const [res, error] = await queryApi("user/" + notification.userId);
  if (res) {
    const img = await fetchimg(res.image);
    return { ...notification, "fullName": res.fullName, "image": img };
  }
})



export const fetchNotifications = createAsyncThunk("notifications/fetchNotifications", async ()=> {
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

    const [res, error] = await queryApi("notification/search", body, "POST");
    if (res) {
      
        let notifs = res.notifications;
        await Promise.all(notifs.map(async(notif, index) => {
          notifs = await fetchUser(notif.id_ens_modifier, index, notifs);
        }));
        return [notifs,res.readCount];
    }
    if (error) {
      return [];
    }

});


const changeNotificationsSlice = createSlice({
    name: 'notifications',
    initialState: initialState,
    reducers: {
        setNotifications: async (state, action) => {
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
        }
    },
    extraReducers(builder){
      builder
        .addCase(fetchNotifications.pending, (state,action) => {
            state.status = 'loading';
        })
        .addCase(fetchNotifications.fulfilled, (state,action) => {
          state.status = 'succeeded';
          state.notifications = action.payload[0];
          state.readCount = action.payload[1];
        })
        .addCase(fetchNotifications.rejected, (state,action) => {
          state.status = 'failed';
        })
        .addCase(fetchNotification.pending, (state,action) => {
          state.status = 'loading';
        })
        .addCase(fetchNotification.fulfilled, (state,action) => {
          state.status = 'succeeded';
          if(state.notifications.length > 0){
          state.notifications.pop()
          }
          state.notifications.unshift(action.payload)
          state.readCount = state.readCount +1;
        })
        .addCase(fetchNotification.rejected, (state,action) => {
          state.status = 'failed';
        })
    }
    
  });

export const selectNotifications = state => state.notifications.notifications
export const selectReadCount = state => state.notifications.readCount
export const {setNotifications,removeReadNotification} = changeNotificationsSlice.actions
export default changeNotificationsSlice.reducer