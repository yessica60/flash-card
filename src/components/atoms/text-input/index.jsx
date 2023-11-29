import React, { useState } from "react";
import { TextInput } from "react-native";

const TextInputAtom = ({ placeholder, onChangeText, style }) => {
  const [text, setText] = useState("");
  const defaultTextStyle = {
    fontSize: 12,
    color: "#fff",
    ...style,
  };
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={(newText) => {
        setText(newText);
        onChangeText(newText);
      }}
      style={defaultTextStyle}
      value={text}
    />
  );
};

export default TextInputAtom;