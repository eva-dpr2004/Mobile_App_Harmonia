import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './context/AuthContext';
import { AnimalProvider } from './context/AnimalContext';
import useAuth from './context/useAuth';

import Accueil from './screens/Accueil/Accueil';
import Inscription from './screens/Authentification/Inscription';
import Connexion from './screens/Authentification/Connexion';
import ConditionsUtilisations from './screens/Legal/ConditionsUtilisations';
import MentionsLegales from './screens/Legal/MentionsLegales';
import PolitiqueDeCookies from './screens/Legal/PolitiqueDeCookies';
import PolitiqueDeConfidentialite from './screens/Legal/PolitiqueDeConfidentialite';

import Profil from './screens/Profil/Profil';
import ModifierProfil from './screens/Profil/ModifierProfil';
import SupprimerProfil from './screens/Profil/SupprimerProfil';
import AjouterAnimal from './screens/Animaux/AjouterAnimal';
import TypesAnimaux from './screens/Animaux/TypesAnimaux';
import ModifierAnimal from './screens/Animaux/ModifierAnimal';
import MesAnimaux from './screens/Animaux/MesAnimaux';
import Activites from './screens/Activites/Activites';

const Stack = createNativeStackNavigator();

export default function App() {
  const [authState, setAuthState] = useAuth();

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <AnimalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Accueil">
          <Stack.Screen name="Accueil" component={Accueil} options={{ title: 'Accueil' }} />
          <Stack.Screen name="Inscription" component={Inscription} options={{ title: 'Inscription' }} />
          <Stack.Screen name="Connexion" component={Connexion} options={{ title: 'Connexion' }} />
          <Stack.Screen name="ConditionsUtilisations" component={ConditionsUtilisations} options={{ title: 'Conditions Utilisations' }} />
          <Stack.Screen name="PolitiqueDeCookies" component={PolitiqueDeCookies} options={{ title: 'Politique De Cookies' }} />
          <Stack.Screen name="PolitiqueDeConfidentialite" component={PolitiqueDeConfidentialite} options={{ title: 'Politique De Confidentialite' }} />
          <Stack.Screen name="MentionsLegales" component={MentionsLegales} options={{ title: 'Mentions Legales' }} />
          {authState.isAuthenticated ? (
            <>
              <Stack.Screen name="Profil" component={Profil} options={{ title: 'Profil' }} />
              <Stack.Screen name="ModifierProfil" component={ModifierProfil} options={{ title: 'Modifier Profil' }} />
              <Stack.Screen name="SupprimerProfil" component={SupprimerProfil} options={{ title: 'Supprimer Profil' }} />
              <Stack.Screen name="AjouterAnimal" component={AjouterAnimal} options={{ title: 'Ajouter Animal' }} />
              <Stack.Screen name="MesAnimaux" component={MesAnimaux} options={{ title: 'Mes Animaux' }} />
              <Stack.Screen name="ModifierAnimal" component={ModifierAnimal} options={{ title: 'Modifier Animal' }} />
              <Stack.Screen name="TypesAnimaux" component={TypesAnimaux} options={{ title: 'Types Animaux' }} />
              <Stack.Screen name="Activites" component={Activites} options={{ title: 'Activités' }} />
            </>
          ) : null}
        </Stack.Navigator>
      </NavigationContainer>
      </AnimalProvider>
    </AuthContext.Provider>
  );
}
