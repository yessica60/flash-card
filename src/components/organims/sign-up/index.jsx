import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../../context/auth";
import { FIREBASE_AUTH } from "../../../api/db";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ERROR_MESSAGES } from "../../../constant/errors";
import { ROUTES } from "../../../constant/navigation";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const baseState = () => ({
  email: "",
  password: "",
  passwordConfirmation: "",
});

export default function SignUp({ navigation }) {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState(baseState());
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);
  const [correct, setCorrect] = useState(null);

  const handleChange = ({ value, key }) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        form.email,
        form.password
      );

      if (user) {
        setCorrect("Check your email and password");
        setForm(baseState());
        navigation.navigate(ROUTES.flashcards);
        setError(null);
      }
    } catch (err) {
      setError(ERROR_MESSAGES[err.message]);
    }
  };

  useEffect(() => {
    const { email, password, passwordConfirmation } = form;

    setValid(() => {
      if (!email.length || !password.length || !passwordConfirmation.length) {
        return false;
      }

      if (password.length < 6) return false;

      if (password !== passwordConfirmation) return false;

      return true;
    });
  }, [form]);

  useEffect(() => {
    if (user) navigation.navigate(ROUTES.flashcards);
  }, [navigation, user]);

  useEffect(() => {
    setForm(baseState());
    setError(null);
  }, []);

  const { email, password, passwordConfirmation } = form;

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
    <View style={styles.container}>
      <View style={styles.sign_up}>
        <View style={{ alignSelf: "center" }}>
          <Text
            style={{
              fontFamily: "Bebas",
              color: "#3EB1BE",
              fontSize: 30,
              width: "90%",
              marginBottom: 50,
              fontWeight: "bold",
              textAlign: "center",
            }}>
            SIGN UP
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.font}>E-mail</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="s@gmail.com"
              value={email}
              onChangeText={(value) => handleChange({ key: "email", value })}
            />
          </View>
          <Text style={styles.font}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(value) => handleChange({ key: "password", value })}
          />

          <Text style={styles.font}>Confirm password</Text>

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={passwordConfirmation}
            secureTextEntry={true}
            onChangeText={(value) =>
              handleChange({ key: "passwordConfirmation", value })
            }
          />
        </View>

        {error && <Text style={{ color: "red" }}>{error}</Text>}
        {correct && <Text style={{ color: "red" }}>{correct}</Text>}

        <TouchableOpacity
          style={[styles.button_sign_up, { backgroundColor: "#000" }]}
          onPress={signUp}
          disabled={!valid}>
          <Text
            style={{
              fontFamily: "Bebas",
              fontSize: 27,
              fontWeight: "400",
              color: "white",
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sign_up: {
    width: "90%",
    height: 700,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 59,
    backgroundColor: "#D8F3FF",
    borderColor: "rgba(55, 198, 236, 0.5)",
    borderWidth: 1,
    borderRadius: 2,
    paddingLeft: 10,
    marginBottom: 45,
  },
  button_sign_up: {
    width: 226,
    height: 53,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 7,
  },
  font: {
    fontFamily: "Bebas",
    fontSize: 27,
    fontWeight: "400",
    color: "#3EB1BE",
    paddingBottom: 21,
    textAlign: "center",
  },
});
