import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { AnimalContext } from '../../context/AnimalContext';
import { getAnimalsByUserId, deleteAnimalById } from '../../services/Animaux';
import AucunAnimal from './AucunAnimal';

function MesAnimauxList({ fetchAnimalCount }) {
  const { authState } = useContext(AuthContext);
  const { setSelectedAnimal } = useContext(AnimalContext);
  const navigation = useNavigation();
  const [animaux, setAnimaux] = useState([]);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const defaultImage = require('../../assets/img/dog.png');

  const fetchAnimaux = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      getAnimalsByUserId(authState.user.Id_Utilisateur)
        .then((data) => {
          setAnimaux(data);
          if ((page - 1) * itemsPerPage >= data.length && page > 1) {
            setPage(prevPage => prevPage - 1);
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des animaux:', error);
        });
    }
  }, [authState, page, itemsPerPage]);

  useEffect(() => {
    fetchAnimaux();
  }, [fetchAnimaux]);

  const handleDeleteClick = (animal) => {
    Alert.alert(
      'Confirmation de Suppression',
      "Cette action ne peut pas être annulée. Êtes-vous sûr de vouloir continuer ?",
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => handleConfirmDelete(animal),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleConfirmDelete = async (animal) => {
    try {
      const data = await deleteAnimalById(animal.Id_Animal);
      if (data.success) {
        setMessage('Animal supprimé avec succès !');
        setTimeout(() => {
          setMessage('');
        }, 5000);
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

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  if (animaux.length === 0) {
    return <AucunAnimal />;
  }

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAnimaux = animaux.slice(startIndex, endIndex);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Animaux</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <FlatList
        data={displayedAnimaux}
        keyExtractor={animal => animal.Id_Animal.toString()}
        renderItem={({ item }) => (
          <View style={styles.animalCard}>
            <Image source={item.photoURL ? { uri: item.photoURL } : defaultImage} style={styles.animalImage} />
            <Text style={styles.animalName}>{item.Nom}</Text>
            <Text>Date de Naissance: {item.Date_De_Naissance}</Text>
            <Text>Date d'Adoption: {item.Date_Adoption}</Text>
            <Text>Espèce: {item.Espece}</Text>
            <Text>Race: {item.Race}</Text>
            <Text>Sexe: {item.Sexe}</Text>
            <Text>Poids: {item.Poids} kg</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEditClick(item)} style={styles.iconButton}>
                <Text style={styles.iconText}>Éditer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteClick(item)} style={styles.iconButton}>
                <Text style={styles.iconText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={
          animaux.length > itemsPerPage && (
            <View style={styles.pagination}>
              <Button title="Précédent" onPress={() => handleChangePage(Math.max(page - 1, 1))} />
              <Text>{page}</Text>
              <Button title="Suivant" onPress={() => handleChangePage(page + 1)} />
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  animalCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  animalImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  animalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: '#1a3558',
    padding: 10,
    borderRadius: 5,
  },
  iconText: {
    color: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default MesAnimauxList;
