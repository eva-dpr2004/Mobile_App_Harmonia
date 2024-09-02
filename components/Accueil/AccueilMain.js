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

  const handleConnexionClick = () => {
    navigation.navigate('Connexion'); 
  };

  return (
    <View style={styles.AccueilMain}>
      <Image 
        source={require('../../assets/img/cat-removebg-preview.png')} 
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
            <View style={styles.ButtonsContainer}>
              <TouchableOpacity 
                style={styles.StartButton} 
                onPress={handleCommencerClick}
              >
                <Text style={styles.StartButtonText}>Commencer maintenant</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.StartButton} 
                onPress={handleConnexionClick}
              >
                <Text style={styles.StartButtonText}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.ImagesColumn}>
          <View style={styles.ImageContainer}>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AccueilMain: {
    flex: 1,
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
    width: '100%',
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
    color: 'rgb(24, 50, 87)',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  Description: {
    color: '#1f3b64',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  ButtonsContainer:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap:'2%',
  },
  StartButton: {
    backgroundColor: '#1f3b64',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  StartButtonText: {
    color: 'white',
    fontSize: 16,
  }
});

export default AccueilMain;
