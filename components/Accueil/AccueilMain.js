import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext'; 

function AccueilMain() {
  const navigation = useNavigation();
  const { authState } = useContext(AuthContext); 

  const handleCommencerClick = () => {
    navigation.navigate('Inscription'); 
  };

  return (
    <View style={styles.AccueilMain}>
      <Image 
        source={require('../../assets/img/logo4-removebg-preview.png')} 
        style={styles.HarmoniaLogo}
      />
      <View style={styles.AccueilContainer}>
        <View style={styles.TextColumn}>
          <Text style={styles.MainTitle}>
            Prenez soin de vos compagnons avec amour et simplicité, suivez leur santé et leur bien-être au bout des doigts !
          </Text>
          <Text style={styles.Description}>
            Avec notre tableau d'activités, surveillez l'activité physique quotidienne et hebdomadaire de vos animaux !
          </Text>
          <Text style={styles.Description}>
            Surveillez leurs activités physiques dans un tableau répertoriant les sorties et découvrez la moyenne de temps pour chaque semaine !
          </Text>
          {!authState.isAuthenticated && (
            <TouchableOpacity 
              style={styles.StartButton} 
              onPress={handleCommencerClick}
            >
              <Text style={styles.StartButtonText}>Commencer maintenant</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.ImagesColumn}>
          <View style={styles.ImageContainer}>
            <Image 
              source={require('../../assets/img/Vecteurs/pets_owner_playing.jpg')} 
              style={styles.Image}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AccueilMain: {
    flex: 1,
    backgroundColor: '#F1F3F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  HarmoniaLogo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  AccueilContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  TextColumn: {
    flex: 1,
    paddingRight: 20,
  },
  MainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  Description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  StartButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  StartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  ImagesColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageContainer: {
    width: 200,
    height: 200,
  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default AccueilMain;
