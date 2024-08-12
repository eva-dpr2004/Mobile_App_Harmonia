import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function NotFoundRedirection() {
  const navigation = useNavigation();

  const redirectToHome = () => {
    navigation.navigate('Accueil');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops, cette page n'existe pas</Text>
      <Text style={styles.message}>Vous pouvez cliquer sur le bouton pour vous rediriger à la page d'accueil.</Text>
      <TouchableOpacity style={styles.button} onPress={redirectToHome}>
        <Text style={styles.buttonText}>Aller à la page d'accueil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1f3b64',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NotFoundRedirection;
