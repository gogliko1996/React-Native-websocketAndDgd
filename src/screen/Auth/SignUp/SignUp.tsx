import React, { useState } from "react";
import {
  ScreenContent,
  ScreenRoot,
} from "../../../components/ScreenRoot/ScreenRoot.style";
import { Button, TextInput } from "react-native";
import { Screens } from "../../../navigation/screen.name";
import { styles } from "./signUp.style";
import { navigate } from "../../../navigation/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { createUser } from "../authRedux";

export const SignUp: React.FC = () => {
  const [userObject, setUserObject] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const handlerChange = (field: keyof typeof userObject, value: string) => {
    setUserObject({ ...userObject, [field]: value });
  };

  const register = () => {
    dispatch(createUser(userObject));
  };

  return (
    <ScreenRoot>
      <ScreenContent>
        <TextInput
          inputMode="email"
          placeholder="firstName"
          style={styles.input}
          onChangeText={(e) => handlerChange("firstName", e)}
          value={userObject.firstName}
        />
        <TextInput
          inputMode="text"
          placeholder="lastName"
          style={styles.input}
          onChangeText={(e) => handlerChange("lastName", e)}
          value={userObject.lastName}
        />
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
        <Button title="SignIn" onPress={() => navigate(Screens.signIn)} />
        <Button title="registers" onPress={() => register()} />
      </ScreenContent>
    </ScreenRoot>
  );
};
