import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

function Accueil({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Inscription" onPress={() => navigation.navigate('Inscription')} />
      <Button title="Connexion" onPress={() => navigation.navigate('Connexion')} />
      <Button title="Profil" onPress={() => navigation.navigate('Profil')} />
      <Button title="ModifierProfil" onPress={() => navigation.navigate('ModifierProfil')} />
      <Button title="SupprimerProfil" onPress={() => navigation.navigate('SupprimerProfil')} />
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