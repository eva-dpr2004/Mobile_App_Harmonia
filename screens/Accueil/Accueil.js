import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AccueilMain from '../../components/Accueil/AccueilMain';
import TabNavigator from '../../components/Basics/TabNavigator';

function Accueil({ navigation }) {
  return (
    <LinearGradient
      colors={['#e0c3fc', '#8ec5fc']}
      style={styles.container}
    >
      <AccueilMain navigation={navigation} />
      <TabNavigator />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Accueil;
