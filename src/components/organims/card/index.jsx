import { Button } from "@rneui/base";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCards } from "../../../hooks/useFlashCards";
import { pluralize } from "../../../utils/text";
import { getRandom } from "../../../utils/number";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AddCard from "../../molecules/add-card";
import CardItem from "../../molecules/card-items";

export default function Cards({ route }) {
  const { id, nameFlashcard } = route.params.flashcard;
  const cards = useCards(id);
  const [active, setActive] = useState(null);

  const chooseNewCard = useCallback(() => {
    if (!cards.length) return;

    if (cards.length === 1) {
      setActive(cards[0].id);
      return;
    }

    setActive((prev) => {
      let newId;

      do {
        newId = getRandom(cards).id;
      } while (newId && newId === prev);

      return newId;
    });
  }, [setActive, cards]);

  useEffect(() => {
    if (!active && cards.length) {
      chooseNewCard();
    }
  }, [cards, active, chooseNewCard]);

  const activeCard = cards.find((card) => card.id === active);
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
        marginTop: 50,
        backgroundColor: "#C2E7F2",
        height: "100%",
        paddingTop: 40,
        padding: 25,
      }}>
      <View
        style={{
          backgroundColor: "white",
          height: "90%",
          borderRadius: 10,
        }}>
        <Text style={styles.texto}>Cards</Text>
        <Text style={styles.category}>{nameFlashcard}</Text>
        <Text style={styles.numero}>
          {pluralize({ noun: "Card", number: cards.length })}
        </Text>

        {!cards.length && (
          <Text style={styles.numero}>Try adding a card first...</Text>
        )}
        <View
          style={{
            backgroundColor: "#F2BBBB",
            height: "55%",
            width: "90%",
            borderRadius: 20,
            margin: 10,
            alignSelf: "center",
          }}>
          {active && <CardItem card={activeCard} />}
        </View>
        <View style={{ width: 90, alignSelf: "center" }}>
          <Button
            height="10%"
            color="#82D1F3"
            title="Next"
            disabled={cards.length < 2}
            onPress={chooseNewCard}
          />
        </View>
        <AddCard />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  texto: {
    fontFamily: "Bebas",
    color: "#F0D318",
    fontSize: 60,
    textAlign: "center",
    marginTop: "10%",
  },
  category: {
    fontFamily: "Bebas",
    color: "#F05D18",
    fontSize: 45,
    textAlign: "center",
    marginTop: "1%",
  },
  numero: {
    fontFamily: "Bebas",
    color: "#3FA9E1",
    fontSize: 30,
    textAlign: "center",
    marginTop: "1%",
  },
});
