import { Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Bienvenidos a nuestra carta digital</Text>
      <Text>Aquí podrás consultar las tapas que ofrecemos</Text>
      <Text>¡Esperamos que disfrutes de tu experiencia!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
