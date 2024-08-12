import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { AnimalContext } from '../../context/AnimalContext';

function MesAnimauxList({ fetchAnimalCount }) {
  const { authState } = useContext(AuthContext);
  const { setSelectedAnimal } = useContext(AnimalContext);
  const navigation = useNavigation();
  const [animaux, setAnimaux] = useState([]);
  const [message, setMessage] = useState('');

  const fetchAnimaux = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      const url = `http://localhost:3001/animals/byUserId/${authState.user.Id_Utilisateur}`;
      axios.get(url, { withCredentials: true })
        .then(response => {
          setAnimaux(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des animaux:', error);
        });
    }
  }, [authState]);

  useEffect(() => {
    fetchAnimaux();
  }, [fetchAnimaux]);

  const handleDeleteClick = (animal) => {
    Alert.alert(
      'Confirmation de Suppression',
      'Cette action ne peut pas être annulée. Êtes-vous sûr de vouloir continuer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', onPress: () => handleConfirmDelete(animal) },
      ]
    );
  };

  const handleConfirmDelete = async (animal) => {
    try {
      const url = `http://localhost:3001/animals/deleteAnimal/${animal.Id_Animal}`;
      const response = await axios.delete(url, { withCredentials: true });
      if (response.data.success) {
        setMessage('Animal supprimé avec succès !');
        fetchAnimaux();
        fetchAnimalCount();
      } else {
        setMessage('Erreur lors de la suppression de l\'animal.');
      }
    } catch (error) {
      setMessage('Erreur lors de la suppression de l\'animal.');
      console.error('Erreur:', error);
    }
  };

  const handleEditClick = (animal) => {
    setSelectedAnimal(animal);
    navigation.navigate('ModifierAnimal');
  };

  if (animaux.length === 0) {
    return (
      <View style={styles.noAnimalContainer}>
        <Text>Aucun animal pour le moment.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Animaux</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      <FlatList
        data={animaux}
        keyExtractor={(item) => item.Id_Animal.toString()}
        renderItem={({ item }) => (
          <View style={styles.animalCard}>
            <Image source={{ uri: item.photoURL }} style={styles.animalImage} />
            <Text>{item.Nom}</Text>
            <Text>Date de Naissance: {item.Date_De_Naissance}</Text>
            <Text>Date d'Adoption: {item.Date_Adoption}</Text>
            <Text>Espèce: {item.Espece}</Text>
            <Text>Race: {item.Race}</Text>
            <Text>Sexe: {item.Sexe}</Text>
            <Text>Poids: {item.Poids} kg</Text>
            <TouchableOpacity onPress={() => handleEditClick(item)}>
              <Text style={styles.editIcon}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteClick(item)}>
              <Text style={styles.deleteIcon}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
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
  noAnimalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  animalCard: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  animalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  editIcon: {
    color: 'blue',
    marginTop: 10,
  },
  deleteIcon: {
    color: 'red',
    marginTop: 10,
  },
});

export default MesAnimauxList;
