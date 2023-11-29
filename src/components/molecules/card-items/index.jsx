import { useEffect, useCallback } from 'react';
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native';
import { useModal } from '../../../hooks/useModal';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function CardItem({ card }) {
  const { visible, toggle, show } = useModal(true);
  const { term, definition } = card;

  useEffect(() => {
    show();
  }, [card.term, show]);
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
    <View style = {{alignContent: 'center'}}>
      <TouchableHighlight
        underlayColor="#F2BBBB"
        activeOpacity={0.5}
        onPress={toggle}
      >
        {visible ? (
          <View style = {{alignContent: 'center', width: 'auto', height: 'auto', alignSelf:'center'}}>
          <Text style={styles.texto}>{term}</Text>
          </View>
        ) : (
          <>
          <View style = {{alignContent: 'center', width: 'auto', height: 'auto', alignSelf:'center'}}>
            <Text style={styles.des}>{definition}</Text></View>
          </>
          
        )}
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  texto: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 220,
    fontFamily: "Bebas",
    fontSize: 30,
    color: 'white'
  },
  des: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 200,
    marginHorizontal: 10,
    fontFamily: "Bebas",
    fontSize: 20,
    color: 'white'
  },

});