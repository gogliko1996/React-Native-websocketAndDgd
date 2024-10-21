import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  Text,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { Box, Zone } from "./DraggableBox.props";
import { styles } from "./DraggableBox.stye";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const DraggableBox: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    { id: 1, zone: "zone1", color: "#000", pan: new Animated.ValueXY() },
    { id: 2, zone: "zone1", color: "#fff", pan: new Animated.ValueXY() },
    { id: 3, zone: "zone1", color: "#000", pan: new Animated.ValueXY() },
  ]);

  const user = useSelector((state: RootState) => state.user.user);

  const userId = user.id;

  const wss = new WebSocket("ws://localhost:8000");

  useEffect(() => {
    if (user.id) {
      wss.onopen = () => {
        wss.send(JSON.stringify({ type: "USER_ID", id: userId }));
      };
    }
  }, [user.id]);

  useEffect(() => {
    wss.addEventListener("message", (event) => {
      console.log("event", event);
    });

    wss.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      wss.close();
    };
  });

  const handleDrop = (
    gestureState: PanResponderGestureState,
    boxId: number
  ) => {
    const moveY = gestureState.moveY;
    let newZone: Zone = "zone1";

    if (moveY > 340 && moveY < 570) {
      newZone = "zone2";
    } else if (moveY > 570) {
      newZone = "zone3";
    }

    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === boxId ? { ...box, zone: newZone } : box
      )
    );

    const currentBox = boxes.find((box) => box.id === boxId);
    currentBox?.pan.setValue({ x: 0, y: 0 });
  };

  const createPanResponder = (boxId: number) => {
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
      ) => handleDrop(gestureState, boxId),
    });
  };

  return (
    <View style={styles.container}>
      {["zone1", "zone2", "zone3"].map((zone) => (
        <View key={zone} style={styles.dropZone}>
          <Text style={styles.zoneText}>{zone}</Text>
          {boxes
            .filter((box) => box.zone === zone)
            .map((box) => (
              <Animated.View
                key={box.id}
                {...createPanResponder(box.id).panHandlers}
                style={[
                  box.pan.getLayout(),
                  { backgroundColor: box.color },
                  styles.box,
                ]}
              >
                <View
                  style={{ width: 20, height: 20, backgroundColor: "#000" }}
                />
              </Animated.View>
            ))}
        </View>
      ))}
    </View>
  );
};

export default DraggableBox;
