import { configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import changeStateSlice  from "../features/sidebarShow";


const store = configureStore({
  reducer: changeStateSlice,
  middleware: getDefaultMiddleware(),
  devTools: true
})



export default store
