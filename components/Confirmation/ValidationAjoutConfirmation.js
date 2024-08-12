import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';

function ValidationAjoutRedirection() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MesAnimaux');
    }, 5000); 
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ConfettiCannon
        count={200}
        origin={{x: width / 2, y: 0}}
        colors={['#a1dffb', '#f9d5bb', '#f28c8c']}
      />
      <Text style={styles.title}>Ajout d'animal effectué avec succès !</Text>
      <Image
        source={require('../../assets/img/mouton.png')}
        style={styles.image}
      />
      <Text style={styles.message}>Vous allez être redirigé à la page comprenant vos animaux !</Text>
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ValidationAjoutRedirection;
