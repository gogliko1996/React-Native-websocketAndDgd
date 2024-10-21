import { Screens } from "./screen.name";

export type RootParamList = {
  [Screens.home]: undefined;
  [Screens.signIn]: undefined | any;
  [Screens.signUp]: undefined;

};

export type ScreensType = keyof RootParamList;
