import { configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import changeStateSlice  from "../features/sidebarShow";
import changeNotificationsSlice  from "../features/notificationsSlice";


const store = configureStore({
  reducer: {
    changeStateSlice: changeStateSlice,
    changeNotificationsSlice: changeNotificationsSlice 
  },
  middleware: getDefaultMiddleware(),
  devTools: true
})



export default store
