import React, { useContext } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext'; 
import {
  AccueilContainer,
  MainContent,
  MainTitle,
  ImagesRow,
  ImageContainer1,
  ImageContainer2,
  ImageContainer3,
  ImageContainer4,
  Description,
  Description2,
  StartButton,
  StartButtonText
} from './AccueilMainStyles';

function AccueilMain() {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation(); 

  const handleCommencerClick = () => {
    navigation.navigate('Inscription'); 
  };

  return (
    <AccueilContainer>
      <MainContent>
        <MainTitle>
          Prenez soin de vos compagnons avec amour et simplicité, suivez leur santé et leur bien-être au bout des doigts !
        </MainTitle>
        <ImagesRow>
          <ImageContainer1>
            <Image source={require('../../assets/img/1.png')} style={{ width: 100, height: 100 }} />
          </ImageContainer1>
          <ImageContainer2>
            <Image source={require('../../assets/img/2.png')} style={{ width: 100, height: 100 }} />
          </ImageContainer2>
        </ImagesRow>
        <Description>
          Avec notre tableau d'activités, surveillez l'activité physique quotidienne et hebdomadaire de vos animaux !
        </Description>
        <ImagesRow>
          <ImageContainer3>
            <Image source={require('../../assets/img/3.png')} style={{ width: 100, height: 100 }} />
          </ImageContainer3>
          <ImageContainer4>
            <Image source={require('../../assets/img/4.png')} style={{ width: 100, height: 100 }} />
          </ImageContainer4>
        </ImagesRow>
        <Description2>
          Surveillez leurs activités physiques dans un tableau répertoriant les sorties et découvrez la moyenne de temps pour chaque semaine !
        </Description2>
        {!authState.isAuthenticated && (
          <StartButton onPress={handleCommencerClick}>
            <StartButtonText>Commencer maintenant</StartButtonText>
          </StartButton>
        )}
      </MainContent>
    </AccueilContainer>
  );
}

export default AccueilMain;
