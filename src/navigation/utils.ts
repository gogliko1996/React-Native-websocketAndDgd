import { createNavigationContainerRef } from '@react-navigation/native';
import { RootParamList, ScreensType } from './RootParamsList';


export const navigationRef = createNavigationContainerRef<RootParamList>();


export const navigate = (name: ScreensType, params?: RootParamList[ScreensType]) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate({ key: name, name, params });
    }
  };
  
  export const resetStack = (name: ScreensType) => {
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name }],
      });
    }
  };
  
  export const goBack = () => {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  };