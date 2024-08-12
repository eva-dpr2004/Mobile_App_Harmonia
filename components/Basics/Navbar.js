import React, { useContext } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import logout from '../../context/useLogout';

const Navbar = () => {
  const navigation = useNavigation();
  const { authState, setAuthState } = useContext(AuthContext);

  const handleLogoutClick = () => {
    logout(setAuthState);
  };

  const handleLoginClick = () => {
    navigation.navigate('Connexion');
  };

  const handleLogoClick = () => {
    navigation.navigate('Accueil');
  };

  return (
    <NavContainer>
      <LogoContainer onPress={handleLogoClick}>
        <Logo source={require('../../assets/img/logo4-removebg-preview.png')} />
      </LogoContainer>
      <LinksContainer>
        {authState.isAuthenticated ? (
          <>
            <NavLink onPress={() => navigation.navigate('Profil')}>Profil</NavLink>
            <NavLink onPress={() => navigation.navigate('MesAnimaux')}>Mes animaux</NavLink>
            <NavLink onPress={() => navigation.navigate('Activites')}>Activités</NavLink>
            <NavLink onPress={() => navigation.navigate('Aides')}>Aides</NavLink>
            <LogoutButton onPress={handleLogoutClick}>
              <ButtonText>Déconnexion</ButtonText>
            </LogoutButton>
          </>
        ) : (
          <>
            <NavLink onPress={() => navigation.navigate('Inscription')}>Inscription</NavLink>
            <LoginButton onPress={handleLoginClick}>
              <ButtonText>Me connecter</ButtonText>
            </LoginButton>
          </>
        )}
      </LinksContainer>
    </NavContainer>
  );
};

export default Navbar;
