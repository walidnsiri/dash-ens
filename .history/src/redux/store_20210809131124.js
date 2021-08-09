import { configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import changeStateSlice  from "../features/sidebarShow";
import changeNotificationsSlice  from "../features/notifications";


const store = configureStore({
  reducer: {changeStateSlice,changeNotificationsSlice},
  middleware: getDefaultMiddleware(),
  devTools: true
})



export default store
