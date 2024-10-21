import { useEffect } from "react";
import { RootStack } from "./src/navigation/RootStack";
import store, { AppDispatch, RootState } from "./src/redux/store";

import { navigate } from "./src/navigation/utils";
import { Screens } from "./src/navigation/screen.name";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getUser } from "./src/screen/Auth/authRedux";
import { Text } from "react-native";

function MainApp() {
  const { user, status } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (!!user) {
      navigate(Screens.home);
    }
  }, [user]);

  if (!user && status) {
    return <Text> loading </Text>;
  }

  return <RootStack />;
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
