import React, { useRef, useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { Box, Zone } from "./dgd";

const DraggableBox: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    { id: 1, zone: "zone1", pan: new Animated.ValueXY() },
    { id: 2, zone: "zone1", pan: new Animated.ValueXY() },
    { id: 3, zone: "zone1", pan: new Animated.ValueXY() },
  ]);

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
                style={[box.pan.getLayout(), styles.box]}
              ></Animated.View>
            ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropZone: {
    width: "80%",
    minHeight: 150,
    marginVertical: 20,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
  },
  box: {
    width: "90%",
    zIndex: 100,
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  zoneText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default DraggableBox;
