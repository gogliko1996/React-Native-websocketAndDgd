import React, { useEffect, useState } from "react";
import {
  ScreenContent,
  ScreenRoot,
} from "../../../components/ScreenRoot/ScreenRoot.style";
import { Button, TextInput } from "react-native";
import { loginUser } from "../authRedux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { styles } from "./signIn.style";
import { navigate } from "../../../navigation/utils";
import { Screens } from "../../../navigation/screen.name";

export const SignIn: React.FC = () => {
  const [userObject, setUserObject] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const handlerChange = (field: keyof typeof userObject, value: string) => {
    setUserObject({ ...userObject, [field]: value });
  };

  const login = () => {
    dispatch(loginUser(userObject));
  };

  return (
    <ScreenRoot>
      <ScreenContent>
        <TextInput
          inputMode="text"
          placeholder="email"
          style={styles.input}
          onChangeText={(e) => handlerChange("email", e)}
          value={userObject.email}
        />
        <TextInput
          inputMode="text"
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(e) => handlerChange("password", e)}
          value={userObject.password}
        />
        <Button title="SignIn" onPress={() => navigate(Screens.signUp)} />
        <Button title="LogIn" onPress={() => login()} />
      </ScreenContent>
    </ScreenRoot>
  );
};
