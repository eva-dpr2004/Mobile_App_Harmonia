import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function BoutonAjouterAnimal() {
  const navigation = useNavigation();

  const redirectToAddAnimal = () => {
    navigation.navigate('AjouterAnimal');
  };

  return (
    <View style={styles.container}>
      <Button title="Ajouter un Animal" onPress={redirectToAddAnimal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default BoutonAjouterAnimal;
