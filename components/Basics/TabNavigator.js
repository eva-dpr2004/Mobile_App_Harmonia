import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
            <Image
              source={require('../../assets/img/icones/profil.png')} 
              style={styles.icones}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MesAnimaux')} style={styles.tabButton}>
            <Image
              source={require('../../assets/img/icones/mes-animaux.png')} 
              style={styles.icones}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Activites')} style={styles.tabButton}>
            <Image
              source={require('../../assets/img/icones/activites.png')} 
              style={styles.icones}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogoutClick} style={styles.tabButton}>
            <Text style={styles.tabLogoutButton}>Déconnexion</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: '1%',
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabLogoutButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ffffffaa',
    borderRadius: 5,
    color: '#1f3b64',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tabText: {
    fontSize: 12,
    color: '#1f3b64'
  },
  icones: {
    width: 24,
    height: 24,
  },
});

export default TabNavigator;
