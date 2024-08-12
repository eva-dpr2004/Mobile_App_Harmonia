import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Alert, Modal, Pressable, Image } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import logout from '../../context/useLogout';

function SupprimerProfil() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/auth/deleteuser/${authState.user.Id_Utilisateur}`, { withCredentials: true });
      if (response.data.success) {
        setMessage('Compte supprimé avec succès.');
        logout(setAuthState);
        navigation.navigate('Accueil'); 
      } else {
        setMessage('Erreur lors de la suppression du compte.');
      }
    } catch (error) {
      setMessage('Erreur lors de la suppression du compte.');
      console.error('Erreur:', error);
    }
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/Vecteurs/supprimer_profil.png')}
        style={styles.image}
      />
      <View style={styles.box}>
        <Text style={styles.title}>Supprimer Profil</Text>
        <Text style={styles.paragraph}>
          Vous souhaitez supprimer votre profil ? En supprimant votre compte, vous perdrez définitivement toutes vos données, et tout le contenu associé.
        </Text>
        <Pressable onPress={openModal} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Supprimer mon compte</Text>
        </Pressable>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Confirmation de Suppression</Text>
              <Pressable onPress={closeModal} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseButtonText}>x</Text>
              </Pressable>
            </View>
            <View style={styles.modalWarning}>
              <Text style={styles.modalWarningIcon}>⚠️</Text>
              <Text style={styles.modalWarningText}>
                Cette action ne peut pas être annulée. Êtes-vous sûr de vouloir continuer ?
              </Text>
            </View>
            <Pressable onPress={handleDelete} style={styles.modalDeleteButton}>
              <Text style={styles.modalDeleteButtonText}>Supprimer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    padding: 5,
  },
  modalCloseButtonText: {
    fontSize: 18,
    color: '#888',
  },
  modalWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalWarningIcon: {
    fontSize: 40,
    color: 'red',
    marginRight: 10,
  },
  modalWarningText: {
    fontSize: 16,
  },
  modalDeleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  modalDeleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SupprimerProfil;
