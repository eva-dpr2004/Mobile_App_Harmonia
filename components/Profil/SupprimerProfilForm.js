import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import logout from '../../context/useLogout';
import { deleteUser } from '../../services/Users';

function SupprimerProfilForm() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      const response = await deleteUser(authState.user.Id_Utilisateur);
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
    setIsModalVisible(false);
  };

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/Vecteurs/supprimer_profil.png')}
        style={styles.image}
      />
      <View style={styles.box}>
        <Text style={styles.title}>
          <Text 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >&#8592;</Text>
          Supprimer Profil
        </Text>
        <Text style={styles.paragraph}>
          Vous souhaitez supprimer votre profil ? En supprimant votre compte, vous perdrez définitivement toutes vos données, et tout le contenu associé.
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={openModal}>
          <Text style={styles.deleteButtonText}>Supprimer mon compte</Text>
        </TouchableOpacity>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Confirmation de Suppression</Text>
              <Text style={styles.modalWarning}>
                Cette action ne peut pas être annulée. Êtes-vous sûr de vouloir continuer ?
              </Text>
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
                  <Text style={styles.modalButtonText}>Supprimer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                  <Text style={styles.modalButtonText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  box: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    fontSize: 24,
    color: '#183255',
    marginRight: 10,
    top: -4,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalWarning: {
    fontSize: 16,
    marginBottom: 20,
    color: '#d9534f',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#d9534f',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
  },
});

export default SupprimerProfilForm;
