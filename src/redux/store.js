import { configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import changeStateSlice  from "../features/sidebarShow";
import changeNotificationsSlice  from "../features/notificationsSlice";
import changeFollowupsSlice  from "../features/followupsSlice";
import changeGroupsSlice  from "../features/groupSlice";

const store = configureStore({
  reducer: {
    sidebar: changeStateSlice,
    notifications: changeNotificationsSlice ,
    followups: changeFollowupsSlice,
    groups:changeGroupsSlice,
  },
  middleware: getDefaultMiddleware(),
  devTools: true
})



export default store
