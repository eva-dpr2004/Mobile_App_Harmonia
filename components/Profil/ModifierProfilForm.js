import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { updateUserProfile } from '../../services/Users';  

function ModifierProfilForm() {
  const { authState } = useContext(AuthContext);
  const [formData, setFormData] = useState({ Nom: '', Email: '' });
  const [message, setMessage] = useState('');
  const [updateCounts, setUpdateCounts] = useState({ Nom: 0, Email: 0 });
  const navigation = useNavigation();

  useEffect(() => {
    const userId = authState.user.Id_Utilisateur;
    const storedCounts = JSON.parse(localStorage.getItem(`updateCounts_${userId}`));
    if (storedCounts) {
      setUpdateCounts(storedCounts);
    }
  }, [authState.user.Id_Utilisateur]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.Nom && !formData.Email) {
      setMessage('Veuillez remplir au moins un des champs.');
      return;
    }

    if (updateCounts.Nom >= 3 && formData.Nom) {
      setMessage('Vous avez dépassé le nombre de modifications du nom autorisées pour aujourd\'hui.');
      return;
    }
    if (updateCounts.Email >= 3 && formData.Email) {
      setMessage('Vous avez dépassé le nombre de modifications de l\'email autorisées pour aujourd\'hui.');
      return;
    }

    updateUserProfile(authState.user.Id_Utilisateur, formData)
      .then(response => {
        if (response.data.success) {
          setMessage('Profil mis à jour avec succès');

          const newCounts = { ...updateCounts };
          if (formData.Nom) newCounts.Nom += 1;
          if (formData.Email) newCounts.Email += 1;
          setUpdateCounts(newCounts);

          const userId = authState.user.Id_Utilisateur;
          localStorage.setItem(`updateCounts_${userId}`, JSON.stringify(newCounts));

          navigation.navigate('Profil');
        } else {
          setMessage('Erreur lors de la mise à jour du profil');
        }
      })
      .catch(error => {
        setMessage('Erreur lors de la mise à jour du profil');
        console.error('Erreur:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/Vecteurs/modification_profil-rbg.png')}
        style={styles.image}
      />
      <View style={styles.box}>
        <Text style={styles.title}>
          <Text 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >&#8592;</Text>
          Modifier Profil
        </Text>
        <View>
          <Text style={styles.instruction}>Modifiez l'information de votre choix :</Text>
          <Text style={styles.label}>Modifier le Nom:</Text>
          <TextInput
            style={styles.input}
            placeholder='Nouveau Nom'
            value={formData.Nom}
            onChangeText={(text) => handleChange('Nom', text)}
          />
          <Text style={styles.label}>Modifier l'Email:</Text>
          <TextInput
            style={styles.input}
            placeholder='Votre nouvel email'
            value={formData.Email}
            onChangeText={(text) => handleChange('Email', text)}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Mettre à jour</Text>
          </TouchableOpacity>
        </View>
        {message ? <Text style={styles.message}>{message}</Text> : null}
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
  instruction: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#183255',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
  },
});

export default ModifierProfilForm;
