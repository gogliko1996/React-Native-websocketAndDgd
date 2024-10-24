import React, { useEffect } from "react";
import { Text } from "react-native";
import DraggableBox from "./components/Dgd/DraggableBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getTodo } from "./redux";

export const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();  

  useEffect(() => {
    if (user.id) {
      dispatch(getTodo(user.id));
    }
  }, [user.id]);

  return <DraggableBox />;
};
