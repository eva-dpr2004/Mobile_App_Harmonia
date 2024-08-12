import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function ProfilCard() {
  const { authState } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({ Nom: '', Email: '' });

  useEffect(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      axios.get(`http://localhost:3001/auth/basicinfo/${authState.user.Id_Utilisateur}`)
        .then(response => {
          if (response.data) {
            setUserInfo({ Nom: response.data.Nom, Email: response.data.Email });
          }
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des informations utilisateur:', error);
        });
    }
  }, [authState]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Profil</Text>
      <Text style={styles.info}>Nom: {userInfo.Nom}</Text>
      <Text style={styles.info}>Email: {userInfo.Email}</Text>
      <Button title="Modifier mon compte" />
      <Button title="Supprimer mon compte" color="red"  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default ProfilCard;
