import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import MesAnimauxList from '../../components/Animaux/MesAnimauxList';
import BoutonAjouterAnimal from '../../components/Animaux/BoutonAjouterAnimal';
import AucunAnimal from '../../components/Animaux/AucunAnimal';

function MesAnimaux() {
  const { authState } = useContext(AuthContext);
  const [animaux, setAnimaux] = useState([]);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const navigation = useNavigation();

  const fetchAnimaux = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      const url = `http://localhost:3001/animals/byUserId/${authState.user.Id_Utilisateur}`;
      axios.get(url, { withCredentials: true })
        .then(response => {
          setAnimaux(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des animaux:', error);
          Alert.alert("Erreur", "Impossible de récupérer les animaux. Veuillez réessayer plus tard.");
        });
    }
  }, [authState]);

  useEffect(() => {
    fetchAnimaux();
  }, [fetchAnimaux]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Mes Animaux</Text>
      {message && <Text style={{ color: 'green', marginBottom: 20 }}>{message}</Text>}
      
      {animaux.length === 0 ? (
        <AucunAnimal />
      ) : (
        <MesAnimauxList
          animaux={animaux}
          page={page}
          itemsPerPage={itemsPerPage}
          setMessage={setMessage}
          fetchAnimaux={fetchAnimaux}
          setPage={setPage}
        />
      )}

      <BoutonAjouterAnimal navigation={navigation} />
    </View>
  );
}

export default MesAnimaux;
