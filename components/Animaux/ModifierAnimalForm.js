import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AnimalContext } from '../../context/AnimalContext';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';

function ModifierAnimalForm() {
  const { selectedAnimal, setSelectedAnimal } = useContext(AnimalContext);
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const [animal, setAnimal] = useState({
    Nom: '',
    Date_De_Naissance: '',
    Date_Adoption: '',
    Espece: '',
    Race: '',
    Sexe: '',
    Poids: '',
    Habitat: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedAnimal) {
      setAnimal(selectedAnimal);
    } else {
      navigation.navigate('MesAnimaux');  
    }
  }, [selectedAnimal, navigation]);

  const validationSchema = Yup.object().shape({
    Nom: Yup.string()
      .required('Nom est requis')
      .max(50, 'Le nom ne peut pas dépasser 50 caractères')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ _-]*$/, 'Le nom ne doit contenir que des lettres, des espaces, des tirets ou des underscores')
      .test('contains-two-letters', 'Le nom doit contenir au moins 2 lettres', value => 
        (value.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g) || []).length >= 2),
    Date_De_Naissance: Yup.date()
      .required('Date de naissance est requise')
      .nullable()
      .max(new Date(), 'La date de naissance ne peut pas être dans le futur'),
    Date_Adoption: Yup.date()
      .required('Date d\'adoption est requise')
      .nullable()
      .min(
        Yup.ref('Date_De_Naissance'),
        'Date d\'adoption doit être après la date de naissance'
      )
      .max(new Date(), 'La date d\'adoption ne peut pas être dans le futur'),
    Espece: Yup.string()
      .required('Type d\'animal est requis')
      .oneOf([
        'chat', 'chien', 'lapin', 'hamster', 'cochon d\'inde', 'furet', 'chinchilla', 'souris', 'singe', 'hérisson',
        'poissons rouges', 'carpes koï', 'poisson-clown', 'poisson-ange', 'poisson-chat',
        'perroquet', 'canari', 'poule', 'coq', 'canard', 'oie', 'dindon', 'perruche', 'pigeon', 'moineau',
        'tortue', 'lézard', 'gecko', 'serpent', 'axolotl', 'salamandre', 'iguane', 'caméléon', 'grenouille', 'triton'
      ], 'Type d\'animal invalide'),
    Race: Yup.string().required('Race est requise'),
    Sexe: Yup.string().required('Sexe est requis'),
    Poids: Yup.number()
      .required('Poids est requis')
      .min(0.1, 'Le poids doit être au minimum de 0.1 kg')
      .max(4000, 'Le poids ne peut pas dépasser 4000kg'),
    Habitat: Yup.string().required('Habitat est requis')
  });

  const handleChange = (name, value) => {
    setAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const isValid = await validationSchema.isValid(animal);
    if (!isValid) {
      Alert.alert('Erreur', 'Veuillez remplir correctement tous les champs.');
      return;
    }

    const isModified = Object.keys(animal).some(key => animal[key] !== selectedAnimal[key]);
    if (!isModified) {
      Alert.alert('Erreur', 'Veuillez modifier au moins un champ.');
      return;
    }

    try {
      await axios.put(`http://localhost:3001/animals/updateAnimal/${selectedAnimal.Id_Animal}`, animal, {
        headers: {
          'Authorization': `Bearer ${authState.token}`
        },
        withCredentials: true
      });
      setSelectedAnimal(null);
      navigation.navigate('MesAnimaux');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'animal:', error);
      setMessage('Erreur lors de la mise à jour de l\'animal');
    }
  };

  if (!animal) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier Animal: {animal.Nom}</Text>
      
      <Text style={styles.label}>Nom:</Text>
      <TextInput
        value={animal.Nom}
        onChangeText={(value) => handleChange('Nom', value)}
        style={styles.input}
      />
      
      <Text style={styles.label}>Date de Naissance:</Text>
      <TextInput
        value={animal.Date_De_Naissance}
        onChangeText={(value) => handleChange('Date_De_Naissance', value)}
        style={styles.input}
      />
      
      <Text style={styles.label}>Date d'Adoption:</Text>
      <TextInput
        value={animal.Date_Adoption}
        onChangeText={(value) => handleChange('Date_Adoption', value)}
        style={styles.input}
      />
      
      <Text style={styles.label}>Espèce:</Text>
      <TextInput
        value={animal.Espece}
        onChangeText={(value) => handleChange('Espece', value)}
        style={styles.input}
      />
      
      <Text style={styles.label}>Race:</Text>
      <TextInput
        value={animal.Race}
        onChangeText={(value) => handleChange('Race', value)}
        style={styles.input}
      />
      
      <Text style={styles.label}>Sexe:</Text>
      <TextInput
        value={animal.Sexe}
        onChangeText={(value) => handleChange('Sexe', value)}
        style={styles.input}
      />
      
      <Text style={styles.label}>Poids (kg):</Text>
      <TextInput
        value={animal.Poids}
        onChangeText={(value) => handleChange('Poids', value)}
        style={styles.input}
      />
      
      <Text style={styles.label}>Habitat:</Text>
      <TextInput
        value={animal.Habitat}
        onChangeText={(value) => handleChange('Habitat', value)}
        style={styles.input}
      />

      <Button title="Enregistrer les modifications" onPress={handleSubmit} />

      {message ? <Text style={styles.error}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default ModifierAnimalForm;
