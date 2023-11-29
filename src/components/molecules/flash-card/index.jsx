import { useState, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { Overlay } from "@rneui/base";
import { Icon, Button } from "@rneui/themed";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ROUTES } from "../../../constant/navigation";
import { useCards } from "../../../hooks/useFlashCards";
import { useModal } from "../../../hooks/useModal";
import { pluralize } from "../../../utils/text";
import { FLASHCARDS } from "../../../api/db";

export default function FlascardCard({
  flashcard,
  isLongPressed,
  onLongPress,
  backgroundColor,
}) {
  const navigation = useNavigation();
  const { nameFlashcard, id } = flashcard;
  const cards = useCards(id);
  const { visible, show, hide } = useModal();
  const [newName, setNewName] = useState(nameFlashcard);

  const editFlashcard = async (flashcardId, newName) => {
    const flashcardRef = FLASHCARDS.doc(flashcardId);

    try {
      await flashcardRef.update({
        nameFlashcard: newName,
      });
      console.log("Flashcard successfully updated.");
      hide();
    } catch (error) {
      console.error("Error updating flashcard: ", error);
    }
  };

  const deleteFlashcard = async (flashcardId) => {
    const flashcardRef = FLASHCARDS.doc(flashcardId);

    try {
      await flashcardRef.delete();
      console.log("Flashcard successfully deleted.");
    } catch (error) {
      console.error("Error deleting flashcard: ", error);
    }
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
    <View style={{ flexDirection: "row" }}>
      <Overlay
        overlayStyle={{ backgroundColor: "#82D1F3" }}
        isVisible={visible}
        onBackdropPress={hide}>
        <View>
          <View>
            <Text style={styles.texto}>New Name</Text>

            <TextInput
              style={styles.inputtext}
              onChangeText={(text) => setNewName(text)}
              value={newName}
            />
          </View>

          <View style={styles.bottomdesing}>
            <Button
              color="#F591C0"
              title="Edit"
              onPress={() => editFlashcard(id, newName)}
            />
          </View>
        </View>
      </Overlay>

      <View
        style={{
          padding: 24,
          marginBottom: 24,
          borderRadius: 12,
          width: isLongPressed ? "80%" : "100%",
          backgroundColor: backgroundColor,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.cards.name, { flashcard })}
          onLongPress={onLongPress}
          activeOpacity={0.5}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: isLongPressed ? 20 : "auto",
            }}>
            <Text style={{ color: "black" }}>{nameFlashcard}</Text>
            <View>
              <Text>{pluralize({ noun: "Card", number: cards.length })}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {isLongPressed && (
        <View
          style={{
            padding: 24,
            marginBottom: 24,
            borderRadius: 12,
          }}>
          <Button
            type="clear"
            icon={<Icon name="edit" type="material" color="#539CFE" />}
            onPress={show}
          />

          <Button
            type="clear"
            icon={<Icon name="delete" type="material" color="#E74C3C" />}
            onPress={() => deleteFlashcard(id)}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  texto: {
    color: "white",
    fontFamily: "Bebas",
    fontSize: 40,
    textAlign: "center",
    margin: "5%",
  },

  inputtext: {
    color: "#95A2A5",
    fontFamily: "Bebas",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 23,
    marginVertical: 20,
  },
  bottomdesing: {
    alignContent: "center",
    fontFamily: "Bebas",
    width: 100,
    alignSelf: "center",
  },
});
