import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';  

function Accueil({ navigation }) {
  const { authState } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button title="Inscription" onPress={() => navigation.navigate('Inscription')} />
      <Button title="Connexion" onPress={() => navigation.navigate('Connexion')} />
      {authState.isAuthenticated && (
        <>
          <Button title="Profil" onPress={() => navigation.navigate('Profil')} />
          <Button title="Modifier Profil" onPress={() => navigation.navigate('ModifierProfil')} />
          <Button title="Supprimer Profil" onPress={() => navigation.navigate('SupprimerProfil')} />
          <Button title="Ajouter Animal" onPress={() => navigation.navigate('AjouterAnimal')} />
          <Button title="Mes Animaux" onPress={() => navigation.navigate('MesAnimaux')} />
        </>
      )}
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
