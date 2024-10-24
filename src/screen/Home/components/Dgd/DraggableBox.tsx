import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  Text,
  GestureResponderEvent,
  PanResponderGestureState,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Box, Zone } from "./DraggableBox.props";
import { styles } from "./DraggableBox.stye";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { creatTodo, deleteTodo, updateTodo } from "../../redux";
import { DeleteButton } from "../DeleteButton/DeleteButton";

const DraggableBox: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [zone, setzone] = useState<string>("");

  const user = useSelector((state: RootState) => state.user.user);
  const todo = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch<AppDispatch>();

  const userId = user.id;

  const wss = new WebSocket("ws://localhost:8000");
  useEffect(() => {
    if (userId) {
      wss.onopen = () => {
        const message = JSON.stringify({ type: "USER_ID", id: userId });
        wss.send(message);
      };
    }
  }, [userId, wss]);

  useEffect(() => {
    if (todo) {
      const newTodo = todo?.map((item) => {
        return { ...item, pan: new Animated.ValueXY() };
      });

      setBoxes(newTodo);
    }
  }, [todo]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      const dataType = data.type;
      if (dataType === "Create_User") {
        setBoxes([...boxes, { ...data.payload, pan: new Animated.ValueXY() }]);
      }

      if (dataType === "UPDATE_TODO") {
        const newBoxes: Box[] = [...boxes].map((item) => {
          if (item.id === data.payload.id) {
            return { ...item, status: data.payload.status };
          }
          return item;
        });
        setBoxes(newBoxes);
      }

      if (dataType === "Delete") {
        const filterBoxes: Box[] = [...boxes].filter(
          (item) => item.id !== data.payload.id
        );

        setBoxes(filterBoxes);
      }
    };

    wss.addEventListener("message", handleMessage);

    wss.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      wss.removeEventListener("message", handleMessage);
      wss.close();
    };
  }, [wss]);

  useEffect(() => {
    if (showInput) {
      setShowInput(!showInput);
    }
    setzone("");
    setInputValue("");
  }, [boxes]);

  const handleDrop = (
    gestureState: PanResponderGestureState,
    boxId: number,
    startZone: string
  ) => {
    const moveY = gestureState.moveY;
    let newStatus: Zone = "todo";

    if (moveY > 340 && moveY < 570) {
      newStatus = "inProgres";
    } else if (moveY > 570) {
      newStatus = "done";
    }

    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === boxId ? { ...box, status: newStatus } : box
      )
    );

    const updateList = boxes.find((item) => item.id === boxId);

    if (updateList) {
      dispatch(
        updateTodo({
          id: Number(updateList.id),
          updateData: {
            title: updateList.title,
            description: updateList.description,
            status: newStatus,
            startStatus: startZone,
          },
        })
      );
    }

    const currentBox = boxes.find((box) => box.id === boxId);
    currentBox?.pan.setValue({ x: 0, y: 0 });
  };

  const createPanResponder = (boxId: number, startZone: string) => {
    const currentBox = boxes?.find((box) => box.id === boxId);

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: currentBox?.pan.x as Animated.Value,
            dy: currentBox?.pan.y as Animated.Value,
          },
        ],
        { useNativeDriver: false }
      ),

      onPanResponderRelease: (
        e: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => handleDrop(gestureState, boxId, startZone),
    });
  };

  const serchInput = (zone: string) => {
    setShowInput(!showInput);
    setzone(zone);
  };

  const creatList = () => {
    dispatch(
      creatTodo({ title: inputValue, description: "asd", status: zone, userId })
    );
  };

  const deleteList = (id: number) => {
    dispatch(deleteTodo(id))
  }

  return (
    <View style={styles.container}>
      {["todo", "inProgres", "done"].map((zones: string) => (
        <View key={zones} style={styles.dropZone}>
          <Text style={styles.zoneText}>{zones}</Text>
          {boxes
            .filter((box) => box.status === zones)
            .map((box) => (
              <Animated.View
                key={box.id}
                {...createPanResponder(Number(box.id), zones).panHandlers}
                style={[box.pan.getLayout(), styles.box]}
              >
                <Text>{box.title}</Text>
                <DeleteButton opPress={() => deleteList(Number(box.id))} />
              </Animated.View>
            ))}

          {showInput && zones === zone ? (
            <>
              <TextInput
                style={styles.input}
                onChangeText={(e) => setInputValue(e)}
                value={inputValue}
              />

              <View style={styles.buttonBox}>
                <TouchableOpacity onPress={() => serchInput(zones)}>
                  <Text style={{ fontSize: 18 }}>CLOSE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => creatList()}>
                  <Text>SAVE</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Button title="Add card" onPress={() => serchInput(zones)} />
          )}
        </View>
      ))}
    </View>
  );
};

export default DraggableBox;
