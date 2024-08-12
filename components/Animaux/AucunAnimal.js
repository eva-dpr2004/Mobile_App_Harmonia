import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function AucunAnimal() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/dog-cat.png')} style={styles.image} />
      <Text>Aucun animal pour le moment.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default AucunAnimal;
