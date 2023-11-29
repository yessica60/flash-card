import React from "react";
import { Text } from "react-native";

export default function TextAtom({ text, style }) {
  const defaultTextStyle = {
    fontSize: 12,
    color: "#fff",
    ...style, 
  };

  return <Text style={defaultTextStyle}>{text}</Text>;
}