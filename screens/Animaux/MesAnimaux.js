import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import MesAnimauxList from '../../components/Animaux/MesAnimauxList';
import BoutonAjouterAnimal from '../../components/Animaux/BoutonAjouterAnimal';
import AucunAnimal from '../../components/Animaux/AucunAnimal';
import TabNavigator from '../../components/Basics/TabNavigator';

function MesAnimaux() {
  const { authState } = useContext(AuthContext);
  const [animaux, setAnimaux] = useState([]);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const navigation = useNavigation();

  const fetchAnimaux = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      const url = `http://localhost:8000/animals/byUserId/${authState.user.Id_Utilisateur}`;
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
    <LinearGradient
      colors={['#e0c3fc', '#8ec5fc']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {message && <Text style={styles.message}>{message}</Text>}
        
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
      </ScrollView>
      <TabNavigator />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    color: 'green',
    marginBottom: 20,
  },
});

export default MesAnimaux;
