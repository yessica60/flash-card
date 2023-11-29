import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useCallback } from "react";

import { useFlashcards } from "../../../hooks/useFlashCards";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { COLORS } from "../../../constant/style";
import FlascardCard from "../../molecules/flash-card";
import AddFlashcard from "../../molecules/add-flash-card";

export default function Flashcards() {
  const flashcards = useFlashcards();
  const [longPressedId, setLongPressedId] = useState(null);
  const [cardColors, setCardColors] = useState({});

  useEffect(() => {
    if (longPressedId !== null) {
      console.log(`ID: ${longPressedId}`);
    }
  }, [longPressedId]);

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

  const getRandomColor = (id) => {
    if (cardColors[id]) {
      return cardColors[id];
    } else {
      const usedColors = Object.values(cardColors);

      if (usedColors.length === COLORS.length) {
        usedColors.length = 0;
      }

      let availableColors = COLORS.filter(
        (color) => !usedColors.includes(color.valor)
      );
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      const color = availableColors[randomIndex].valor;

      setCardColors((prevColors) => ({ ...prevColors, [id]: color }));

      return color;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setLongPressedId(null)}>
      <View
        style={{
          backgroundColor: "#A1DCF5",
          height: "100%",
          paddingTop: 40,
          padding: 25,
        }}>
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            borderRadius: 10,
          }}>
          <Text style={styles.texto}>Studiale Cards</Text>

          <ScrollView
            style={{
              marginTop: 20,
              marginLeft: 15,
              marginRight: 15,
              fontFamily: "Bebas",
            }}>
            {flashcards.length ? (
              flashcards.map((flashcard, index) => (
                <FlascardCard
                  key={flashcard.id}
                  flashcard={flashcard}
                  isLongPressed={longPressedId === flashcard.id}
                  onLongPress={() => setLongPressedId(flashcard.id)}
                  backgroundColor={getRandomColor(flashcard.id)}
                />
              ))
            ) : (
              <Text>Try adding a new category</Text>
            )}
          </ScrollView>

          <AddFlashcard />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontFamily: "Bebas",
    color: "#3EB1BE",
    fontSize: 60,
    textAlign: "center",
    marginTop: "10%",
  },
});
