import React from 'react';
import { View, StyleSheet } from 'react-native';
import AccueilMain from '../../components/Accueil/AccueilMain';

function Accueil({ navigation }) {
  return (
    <View style={styles.container}>
      <AccueilMain navigation={navigation} />
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
