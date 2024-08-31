import React from 'react';
import { View, StyleSheet } from 'react-native';
import AccueilMain from '../../components/Accueil/AccueilMain';
import TabNavigator from '../../components/Basics/TabNavigator';

function Accueil({ navigation }) {
  return (
    <View style={styles.container}>
      <AccueilMain navigation={navigation} />
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
