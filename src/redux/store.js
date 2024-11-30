import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";  
import { userSlice } from "./features/userSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,  // use .reducer property of alertSlice
    user: userSlice.reducer,     // use .reducer property of userSlice
  },
});
