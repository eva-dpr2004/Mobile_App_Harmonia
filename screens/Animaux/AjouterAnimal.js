import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabNavigator from '../../components/Basics/TabNavigator';
import AjouterAnimalForm from '../../components/Animaux/AjouterAnimalForm';

function Accueil({ navigation }) {
  return (
    <View style={styles.container}>
      <AjouterAnimalForm navigation={navigation} />
      <TabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Accueil;
