import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screen/Home/Home";
import { navigationRef } from "./utils";
import { RootParamList } from "./RootParamsList";
import { Screens } from "./screen.name";
import { SignIn } from "../screen/Auth/SignIn/SignIn";
import { SignUp } from "../screen/Auth/SignUp/SignUp";
import { useSelector } from "react-redux";
import { selectInitialRouteNameForUser } from "../screen/Auth/authRedux";

const Stack = createStackNavigator<RootParamList>();

export const RootStack = () => {
  const initialRouteName = useSelector(selectInitialRouteNameForUser);
  
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name={Screens.home} component={Home} options={{ headerShown: false }} />
        <Stack.Screen name={Screens.signIn} component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name={Screens.signUp} component={SignUp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
