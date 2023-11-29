import { AuthProvider } from "./src/context/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "./src/constant/navigation";
import SignUp from "./src/components/organims/sign-up";
import Login from "./src/components/organims/login";
import Flashcards from "./src/components/organims/flash-card";
import Cards from "./src/components/organims/card";
export default function App() {
  const Stack = createStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={ROUTES.login} component={Login} />
          <Stack.Screen
            name={ROUTES.signup}
            component={SignUp}
            options={{
              headerShown: true,
              headerBackTitleVisible: true,
              title: "",
            }}
          />
          <Stack.Screen name={ROUTES.flashcards} component={Flashcards} />
          <Stack.Screen name={ROUTES.cards.name} component={Cards} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
