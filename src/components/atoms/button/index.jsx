import React from "react";
import { Button } from "react-native";

export default function ButtonAtom({ title, onPress, style }) {
  return <Button title={title} onPress={onPress} style={style} />;
}