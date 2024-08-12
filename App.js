import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './context/AuthContext';
import useAuth from './context/useAuth';

import Accueil from './screens/Accueil/Accueil';
import Inscription from './screens/Authentification/Inscription';
import Connexion from './screens/Authentification/Connexion';
import Profil from './screens/Profil/Profil';
import ModifierProfil from './screens/Profil/ModifierProfil';
import SupprimerProfil from './screens/Profil/SupprimerProfil';

const Stack = createNativeStackNavigator();

export default function App() {
  const [authState, setAuthState] = useAuth();

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Accueil">
          <Stack.Screen name="Accueil" component={Accueil} options={{ title: 'Accueil' }} />
          <Stack.Screen name="Inscription" component={Inscription} options={{ title: 'Inscription' }} />
          <Stack.Screen name="Connexion" component={Connexion} options={{ title: 'Connexion' }} />
          <Stack.Screen name="Profil" component={Profil} options={{ title: 'Profil' }} />
          <Stack.Screen name="ModifierProfil" component={ModifierProfil} options={{ title: 'ModifierProfil' }} />
          <Stack.Screen name="SupprimerProfil" component={SupprimerProfil} options={{ title: 'Supprimer Profil' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
