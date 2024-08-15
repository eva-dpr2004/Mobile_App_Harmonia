import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

function BoutonAjouterAnimal({ navigation }) {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Ajouter un Animal" onPress={() => navigation.navigate('AjouterAnimal')} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 20,
  },
});

export default BoutonAjouterAnimal;
