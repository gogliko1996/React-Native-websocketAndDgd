import { configureStore } from '@reduxjs/toolkit'
import createUserSlice from '../screen/Auth/authRedux'
import createTodoreducer from '../screen/Home/redux'

const store = configureStore({
  reducer: {
    user: createUserSlice,
    todo: createTodoreducer
  },
})
export type RootState = ReturnType<typeof store.getState>;
  
export type AppDispatch = typeof store.dispatch;

export default store