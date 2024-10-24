import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./deleteBitton.style";
import { DeleteButtonProps } from "./DeleteButton.props";

export const DeleteButton: React.FC<DeleteButtonProps> = ({opPress}) => {
  return (
    <TouchableOpacity onPress={() => opPress()}>
      <View style={style.pointerConteiner}>
        <Text>DELETE</Text>
      </View>
    </TouchableOpacity>
  );
};
