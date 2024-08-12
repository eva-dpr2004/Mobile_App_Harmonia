import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ModifierProfil() {
  const { authState } = useContext(AuthContext);
  const [formData, setFormData] = useState({ Nom: '', Email: '' });
  const [message, setMessage] = useState('');
  const [updateCounts, setUpdateCounts] = useState({ Nom: 0, Email: 0 });
  const navigation = useNavigation();

  useEffect(() => {
    const loadUpdateCounts = async () => {
      const userId = authState.user.Id_Utilisateur;
      const storedCounts = await AsyncStorage.getItem(`updateCounts_${userId}`);
      if (storedCounts) {
        setUpdateCounts(JSON.parse(storedCounts));
      }
    };

    loadUpdateCounts();
  }, [authState.user.Id_Utilisateur]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
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

    const url = `http://localhost:3001/auth/updateuser/${authState.user.Id_Utilisateur}`;
    axios.put(url, formData, { withCredentials: true })
      .then(async response => {
        if (response.data.success) {
          setMessage('Profil mis à jour avec succès');

          const newCounts = { ...updateCounts };
          if (formData.Nom) newCounts.Nom += 1;
          if (formData.Email) newCounts.Email += 1;
          setUpdateCounts(newCounts);

          const userId = authState.user.Id_Utilisateur;
          await AsyncStorage.setItem(`updateCounts_${userId}`, JSON.stringify(newCounts));

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
        <Text style={styles.title}>Modifier Profil</Text>
        <Text>Modifiez l'information de votre choix :</Text>
        <Text style={styles.label}>Modifier le Nom:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nouveau Nom"
          value={formData.Nom}
          onChangeText={(value) => handleChange('Nom', value)}
        />
        <Text style={styles.label}>Modifier l'Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Votre nouvel email"
          value={formData.Email}
          onChangeText={(value) => handleChange('Email', value)}
        />
        <Button title="Mettre à jour" onPress={handleSubmit} />
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ModifierProfil;
