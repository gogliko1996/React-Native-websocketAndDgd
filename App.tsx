import store from "./src/redux/store";
import DraggableBox from "./src/screen/Home/components/Dgd/Dgs";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <DraggableBox />
    </Provider>
  );
}
