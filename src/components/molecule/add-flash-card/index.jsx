import { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { FAB, Overlay } from "@rneui/base";
import { useModal } from "../../../hooks/useModal";
import { FLASHCARDS } from "../../../api/db";
import { AuthContext } from "../../../context/auth";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

export default function AddFlashcard() {
  const [nameFlashcard, setNameFlashcard] = useState("");
  const { user } = useContext(AuthContext);
  const { visible, show, hide } = useModal();

  useEffect(() => {
    setNameFlashcard("");
  }, [visible]);

  const createFlashcard = () => {
    console.log(`Creating Flashcard`);
    FLASHCARDS.add({
      nameFlashcard,
      userId: user.uid,
    });

    hide();
  };

  const [fontsLoaded] = useFonts({
    Bebas: require("../../../assets/fonts/BebasNeue-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,
      }}>
      <FAB
        icon={{ name: "add", color: "white" }}
        onPress={show}
        size="small"
        color="#539CFE"
      />

      <Overlay
        overlayStyle={{ backgroundColor: "#82D1F3" }}
        isVisible={visible}
        onBackdropPress={hide}>
        <View>
          <Text
            style={{
              color: "white",
              fontFamily: "Bebas",
              fontSize: 40,
              textAlign: "center",
              margin: "5%",
            }}>
            New Flashcard
          </Text>

          <TextInput
            style={{
              color: "white",
              fontFamily: "Bebas",
              textAlignVertical: "center",
              textAlign: "center",
              fontSize: 23,
              margin: "15%",
            }}
            placeholder="Flashcard name..."
            onChangeText={(value) => setNameFlashcard(value)}
            value={nameFlashcard}
          />

          <View
            style={{
              alignContent: "center",
              margin: "2%",
              fontFamily: "Bebas",
              width: 100,
              alignSelf: "center",
            }}>
            <Button
              color="#48A7D9"
              title="Add"
              onPress={createFlashcard}
              disabled={!nameFlashcard.length}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
}
