import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screen/Home/Home";
import { navigationRef } from "./utils";
import { RootParamList } from "./RootParamsList";
import { Screens } from "./screen.name";

const Stack = createStackNavigator<RootParamList>();

export const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={Screens.home}>
        <Stack.Screen name={Screens.home} component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
