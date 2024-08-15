import React, { useState, useContext } from 'react';
import { View, Text, Image, ScrollView, Pressable, Modal, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importer le hook useNavigation
import axios from 'axios';
import { AnimalContext } from '../../context/AnimalContext'; // Importer AnimalContext

function MesAnimauxList({ animaux, page, itemsPerPage, setMessage, fetchAnimaux, setPage }) {
  const [showModal, setShowModal] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState(null);
  const { setSelectedAnimal } = useContext(AnimalContext); // Récupérer setSelectedAnimal du contexte
  const navigation = useNavigation(); // Utiliser useNavigation pour obtenir l'objet navigation

  const defaultImage = require('../../assets/img/dog.png');

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
        } else {
          setMessage('Erreur lors de la suppression de l\'animal.');
        }
      } catch (error) {
        setMessage('Erreur lors de la suppression de l\'animal.');
        Alert.alert("Erreur", "Une erreur s'est produite lors de la suppression. Veuillez réessayer.");
      } finally {
        setShowModal(false);
        setAnimalToDelete(null);
      }
    }
  };

  const handleEditClick = (animal) => {
    setSelectedAnimal(animal); // Mettre à jour l'animal sélectionné dans le contexte
    navigation.navigate('ModifierAnimal'); // Naviguer vers l'écran de modification
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAnimaux = animaux.slice(startIndex, endIndex);

  return (
    <ScrollView>
      {displayedAnimaux.map(animal => (
        <View key={animal.Id_Animal} style={styles.animalCard}>
          <Image
            source={{ uri: animal.photoURL || defaultImage }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text>Nom: {animal.Nom}</Text>
          <Pressable onPress={() => handleDeleteClick(animal)} style={styles.iconButton}>
            <MaterialIcons name="delete" size={24} color="red" />
          </Pressable>
          <Pressable onPress={() => handleEditClick(animal)} style={styles.iconButton}>
            <MaterialIcons name="edit" size={24} color="black" />
          </Pressable>
        </View>
      ))}
      
      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <Pressable onPress={() => handleChangePage(page - 1)} disabled={page === 1}>
          <Text style={{ color: page === 1 ? 'gray' : 'blue' }}>Previous</Text>
        </Pressable>
        <Text style={styles.pageText}>Page {page} of {Math.ceil(animaux.length / itemsPerPage)}</Text>
        <Pressable onPress={() => handleChangePage(page + 1)} disabled={page === Math.ceil(animaux.length / itemsPerPage)}>
          <Text style={{ color: page === Math.ceil(animaux.length / itemsPerPage) ? 'gray' : 'blue' }}>Next</Text>
        </Pressable>
      </View>

      {/* Modal for deletion confirmation */}
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        animationType="slide"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  animalCard: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  iconButton: {
    marginVertical: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  pageText: {
    marginHorizontal: 10,
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

export default MesAnimauxList;
