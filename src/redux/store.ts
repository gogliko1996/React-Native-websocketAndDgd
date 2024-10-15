import { configureStore } from '@reduxjs/toolkit'
import createUserSlice from '../screen/Auth/authRedux'

const store = configureStore({
  reducer: {
    user: createUserSlice
  },
})
export type RootState = ReturnType<typeof store.getState>;
  
export type AppDispatch = typeof store.dispatch;

export default store