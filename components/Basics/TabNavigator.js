import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import logout from '../../context/useLogout';

function TabNavigator() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogoutClick = async () => {
    await logout(setAuthState, navigation);
  };

  return (
    <View style={styles.tabContainer}>
      {authState.isAuthenticated ? (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Profil')} style={styles.tabButton}>
            <Text style={styles.tabText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MesAnimaux')} style={styles.tabButton}>
            <Text style={styles.tabText}>Mes Animaux</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Activites')} style={styles.tabButton}>
            <Text style={styles.tabText}>Activités</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ConditionsUtilisations')} style={styles.tabButton}>
            <Text style={styles.tabText}>Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PolitiqueDeCookies')} style={styles.tabButton}>
            <Text style={styles.tabText}>Cookies</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PolitiqueDeConfidentialite')} style={styles.tabButton}>
            <Text style={styles.tabText}>Confidentialité</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MentionsLegales')} style={styles.tabButton}>
            <Text style={styles.tabText}>Mentions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogoutClick} style={styles.tabButton}>
            <Text style={[styles.tabText, { color: 'red' }]}>Déconnexion</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Inscription')} style={styles.tabButton}>
            <Text style={styles.tabText}>Inscription</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Connexion')} style={styles.tabButton}>
            <Text style={styles.tabText}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ConditionsUtilisations')} style={styles.tabButton}>
            <Text style={styles.tabText}>Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PolitiqueDeCookies')} style={styles.tabButton}>
            <Text style={styles.tabText}>Cookies</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PolitiqueDeConfidentialite')} style={styles.tabButton}>
            <Text style={styles.tabText}>Confidentialité</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MentionsLegales')} style={styles.tabButton}>
            <Text style={styles.tabText}>Mentions</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F1F3F6',
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 16,
    color: '#1f3b64',
  },
});

export default TabNavigator;
