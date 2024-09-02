import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function AucunAnimal() {
  const noAnimalImage = require('../../assets/img/dog-cat.png'); 

  return (
    <View style={styles.container}>
      <Image source={noAnimalImage} style={styles.image} />
      <Text style={styles.text}>Aucun animal pour le moment.</Text>
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'gray',
  },
});

export default AucunAnimal;
