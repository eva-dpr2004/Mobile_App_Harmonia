import React, { useContext, useEffect, useState, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';

import Accueil from './screens/Accueil/Accueil';
import Inscription from './screens/Authentification/Inscription';
import Connexion from './screens/Authentification/Connexion';
import Profil from './screens/Profil/Profil';
import SupprimerProfil from './screens/Profil/SupprimerProfil';
import ModifierProfil from './screens/Profil/ModifierProfil';
import MesAnimaux from './screens/Animaux/MesAnimaux';
import AjouterAnimal from './screens/Animaux/AjouterAnimal';
import TypesAnimaux from './screens/Animaux/TypesAnimaux';
import ModifierAnimal from './screens/Animaux/ModifierAnimal';
import Activites from './screens/Activites/Activites';
import Aides from './screens/Aides/Aides';
import AvisGlobal from './screens/Aides/Feedback/AvisGlobal';
import BesoinAide from './screens/Aides/Feedback/BesoinAide';
import ValidationAjout from './screens/Confirmation/ValidationAjout';
import EnvoieConfirmation from './screens/Confirmation/EnvoieConfirmation';
import MentionsLegales from './screens/Legal/MentionsLegales';
import ConditionsUtilisations from './screens/Legal/ConditionsUtilisations';
import PolitiqueDeConfidentialite from './screens/Legal/PolitiqueDeConfidentialite';
import PolitiqueDeCookies from './screens/Legal/PolitiqueDeCookies';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const { authState } = useContext(AuthContext);
  const [animalCount, setAnimalCount] = useState(0);

  const fetchAnimalCount = useCallback(async () => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      try {
        const response = await axios.get(`http://localhost:3001/animals/byUserId/${authState.user.Id_Utilisateur}`);
        setAnimalCount(response.data.length);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    }
  }, [authState.isAuthenticated, authState.user?.Id_Utilisateur]);

  useEffect(() => {
    fetchAnimalCount();
  }, [fetchAnimalCount]);

  const canAddAnimals = authState.isAuthenticated && animalCount < 50;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Inscription" component={authState.isAuthenticated ? Accueil : Inscription} />
        <Stack.Screen name="Connexion" component={authState.isAuthenticated ? Accueil : Connexion} />
        <Stack.Screen name="Profil" component={authState.isAuthenticated ? Profil : Connexion} />
        <Stack.Screen name="ModifierProfil" component={authState.isAuthenticated ? ModifierProfil : Connexion} />
        <Stack.Screen name="SupprimerProfil" component={authState.isAuthenticated ? SupprimerProfil : Connexion} />
        <Stack.Screen name="MesAnimaux" component={authState.isAuthenticated ? MesAnimaux : Connexion} />
        <Stack.Screen name="AjouterAnimal" component={canAddAnimals ? AjouterAnimal : MesAnimaux} />
        <Stack.Screen name="TypesAnimaux" component={canAddAnimals ? TypesAnimaux : MesAnimaux} />
        <Stack.Screen name="ModifierAnimal" component={authState.isAuthenticated ? ModifierAnimal : Connexion} />
        <Stack.Screen name="Activites" component={authState.isAuthenticated ? Activites : Connexion} />
        <Stack.Screen name="Aides" component={authState.isAuthenticated ? Aides : Connexion} />
        <Stack.Screen name="AvisGlobal" component={authState.isAuthenticated ? AvisGlobal : Connexion} />
        <Stack.Screen name="BesoinAide" component={authState.isAuthenticated ? BesoinAide : Connexion} />
        <Stack.Screen name="ValidationAjout" component={authState.isAuthenticated ? ValidationAjout : Connexion} />
        <Stack.Screen name="EnvoieConfirmation" component={authState.isAuthenticated ? EnvoieConfirmation : Connexion} />
        <Stack.Screen name="MentionsLegales" component={MentionsLegales} />
        <Stack.Screen name="ConditionsUtilisations" component={ConditionsUtilisations} />
        <Stack.Screen name="PolitiqueDeConfidentialite" component={PolitiqueDeConfidentialite} />
        <Stack.Screen name="PolitiqueDeCookies" component={PolitiqueDeCookies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
