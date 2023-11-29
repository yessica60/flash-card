import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FIREBASE_AUTH } from "../../../api/db";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ROUTES } from "../../../constant/navigation";
import { AuthContext } from "../../../context/auth";
import { ERROR_MESSAGES } from "../../../constant/errors";
import { useCallback } from "react";

const baseState = () => ({
  email: "",
  password: "",
});

export default function Login({ navigation }) {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState(baseState());
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = ({ value, key }) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        form.email,
        form.password
      );

      const user = FIREBASE_AUTH.currentUser;

      if (user) {
        setForm(baseState());
        navigation.navigate(ROUTES.flashcards);
        setError(null);
      } else {
        setError("SignIn failed: User not authenticated"); // Pending
      }
    } catch (err) {
      setError(ERROR_MESSAGES[err.message]);
    }
  };

  useEffect(() => {
    const { email, password } = form;

    setValid(() => {
      if (!email.length || !password.length) {
        return false;
      }

      if (password.length < 6) return false;

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

  const { email, password } = form;

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
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.login}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/Logo.png")}
        />

        <View style={{ width: "100%" }}>
          <Text style={styles.font}>E-mail</Text>

          <TextInput
            style={styles.input}
            placeholder="s@gmail.com"
            value={email}
            onChangeText={(value) => handleChange({ key: "email", value })}
          />

          <Text style={styles.font}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(value) => handleChange({ key: "password", value })}
          />
        </View>

        {error && <Text style={{ color: "red" }}>{error}</Text>}

        <TouchableOpacity
          style={[
            styles.button_login,
            { backgroundColor: "#000", marginBottom: 50 },
          ]}
          onPress={signIn}
          disabled={!valid}>
          <Text
            style={{
              fontFamily: "Bebas",
              fontSize: 25,
              fontWeight: "400",
              color: "white",
            }}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ bottom: 0, position: "absolute" }}
          onPress={() => navigation.navigate(ROUTES.signup)}>
          <Text
            style={{
              fontFamily: "Bebas",
              fontSize: 18,
              fontWeight: "bold",
              color: "black",
            }}>
            Sign up
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
  image: {
    marginBottom: 5,
  },
  login: {
    width: "90%",
    height: 700,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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
  button_login: {
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
