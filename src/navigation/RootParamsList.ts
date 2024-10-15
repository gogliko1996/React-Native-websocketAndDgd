import { Screens } from "./screen.name";

export type RootParamList = {
  [Screens.home]: undefined;

};

export type ScreensType = keyof RootParamList;
