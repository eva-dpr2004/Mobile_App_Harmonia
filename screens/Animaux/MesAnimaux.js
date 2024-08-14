import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { AnimalContext } from '../../context/AnimalContext';
import { View, Text, Image, ScrollView, Alert, StyleSheet, Pressable, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function MesAnimaux() {
  const { authState } = useContext(AuthContext);
  const { setSelectedAnimal } = useContext(AnimalContext);
  const navigation = useNavigation();
  const [animaux, setAnimaux] = useState([]);
  const [animalCount, setAnimalCount] = useState(0); 
  const [showModal, setShowModal] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState(null);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const defaultImage = `${process.env.PUBLIC_URL}/assets/img/dog.png`;
  const noAnimalImage = `${process.env.PUBLIC_URL}/assets/img/dog-cat.png`;

  const fetchAnimaux = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      const url = `http://localhost:3001/animals/byUserId/${authState.user.Id_Utilisateur}`;
      axios.get(url, { withCredentials: true })
        .then(response => {
          setAnimaux(response.data);
          setAnimalCount(response.data.length); // Met à jour le compte d'animaux
          if ((page - 1) * itemsPerPage >= response.data.length && page > 1) {
            setPage(prevPage => prevPage - 1);
          }
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des animaux:', error);
          Alert.alert("Erreur", "Impossible de récupérer les animaux. Veuillez réessayer plus tard.");
        });
    }
  }, [authState, page, itemsPerPage]);

  // Fonction pour compter les animaux
  const fetchAnimalCount = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      const url = `http://localhost:3001/animals/byUserId/${authState.user.Id_Utilisateur}`;
      axios.get(url, { withCredentials: true })
        .then(response => {
          setAnimalCount(response.data.length); // Met à jour le compte d'animaux
        })
        .catch(error => {
          console.error('Erreur lors de la récupération du compte des animaux:', error);
        });
    }
  }, [authState]);

  useEffect(() => {
    fetchAnimaux();
  }, [fetchAnimaux]);

  const handleDeleteClick = (animal) => {
    setAnimalToDelete(animal);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (animalToDelete) {
      try {
        const url = `http://localhost:3001/animals/deleteAnimal/${animalToDelete.Id_Animal}`;
        const response = await axios.delete(url, { withCredentials: true });
        if (response.data.success) {
          setMessage('Animal supprimé avec succès !');
          fetchAnimaux(); 
          fetchAnimalCount();
        } else {
          setMessage('Erreur lors de la suppression de l\'animal.');
          console.error('Erreur lors de la suppression de l\'animal:', response.data);
          Alert.alert("Erreur", "Erreur lors de la suppression de l'animal.");
        }
      } catch (error) {
        setMessage('Erreur lors de la suppression de l\'animal.');
        console.error('Erreur:', error);
        Alert.alert("Erreur", "Une erreur s'est produite lors de la suppression. Veuillez réessayer.");
      } finally {
        setShowModal(false);
        setAnimalToDelete(null);
      }
    }
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleEditClick = (animal) => {
    setSelectedAnimal(animal);
    navigation.navigate('ModifierAnimal'); 
  };

  const AucunAnimal = () => (
    <View style={styles.aucunAnimalContainer}>
      <Image source={{ uri: noAnimalImage }} style={styles.noAnimalImage} />
      <Text style={styles.noAnimalText}>Aucun animal pour le moment.</Text>
    </View>
  );

  if (animaux.length === 0) {
    return <AucunAnimal />;
  }

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAnimaux = animaux.slice(startIndex, endIndex);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Mes Animaux</Text>
      {message && <Text style={{ color: 'green', marginBottom: 20 }}>{message}</Text>}
      <ScrollView>
        {displayedAnimaux.map(animal => (
          <View key={animal.Id_Animal} style={{ marginBottom: 20, borderWidth: 1, padding: 10 }}>
            <Image
              source={{ uri: animal.photoURL || defaultImage }}
              style={{ width: 100, height: 100 }}
              resizeMode="cover"
              alt={animal.Nom}
            />
            <Text>Nom: {animal.Nom}</Text>
            <Text>Date de Naissance: {animal.Date_De_Naissance}</Text>
            <Text>Date d'Adoption: {animal.Date_Adoption}</Text>
            <Text>Espèce: {animal.Espece}</Text>
            <Text>Race: {animal.Race}</Text>
            <Text>Sexe: {animal.Sexe}</Text>
            <Text>Poids: {animal.Poids} kg</Text>
            <Pressable onPress={() => handleEditClick(animal)} style={{ marginVertical: 5 }}>
              <MaterialIcons name="edit" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => handleDeleteClick(animal)} style={{ marginVertical: 5 }}>
              <MaterialIcons name="delete" size={24} color="red" />
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        <Pressable onPress={() => handleChangePage(page - 1)} disabled={page === 1}>
          <Text style={{ color: page === 1 ? 'gray' : 'blue' }}>Previous</Text>
        </Pressable>
        <Text style={{ marginHorizontal: 10 }}>
          Page {page} of {Math.ceil(animaux.length / itemsPerPage)}
        </Text>
        <Pressable onPress={() => handleChangePage(page + 1)} disabled={page === Math.ceil(animaux.length / itemsPerPage)}>
          <Text style={{ color: page === Math.ceil(animaux.length / itemsPerPage) ? 'gray' : 'blue' }}>Next</Text>
        </Pressable>
      </View>

      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmation de Suppression</Text>
            <Text style={styles.modalText}>Êtes-vous sûr de vouloir supprimer cet animal ? Cette action est irréversible.</Text>
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowModal(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Annuler</Text>
              </Pressable>
              <Pressable onPress={handleConfirmDelete} style={styles.modalButton}>
                <Text style={[styles.modalButtonText, { color: 'red' }]}>Supprimer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  aucunAnimalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noAnimalImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noAnimalText: {
    fontSize: 18,
    color: 'gray',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  modalButtonText: {
    fontSize: 16,
  },
});

export default MesAnimaux;
