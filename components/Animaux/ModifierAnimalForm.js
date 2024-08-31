import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import DOMPurify from 'dompurify';
import { AnimalContext } from '../../context/AnimalContext';
import { AuthContext } from '../../context/AuthContext';
import { updateAnimal } from '../../services/Animaux';

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
  const [initialAnimal, setInitialAnimal] = useState(null);

  useEffect(() => {
    if (selectedAnimal) {
      setAnimal(selectedAnimal);
      setInitialAnimal({
        ...selectedAnimal,
        Nom: selectedAnimal.Nom.replace(/\s/g, ''),
        Race: selectedAnimal.Race.replace(/\s/g, ''),
        Espece: selectedAnimal.Espece.replace(/\s/g, ''),
        Sexe: selectedAnimal.Sexe.replace(/\s/g, ''),
        Poids: selectedAnimal.Poids,
        Habitat: selectedAnimal.Habitat.replace(/\s/g, '')
      });
    } else {
      navigation.navigate('MesAnimaux');
    }
  }, [selectedAnimal, navigation]);

  const validationSchema = Yup.object().shape({
    Nom: Yup.string()
      .required('Nom est requis')
      .max(100, 'Le nom ne peut pas dépasser 100 caractères')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ_-]*$/, 'Le nom ne doit contenir que des lettres, des tirets ou des underscores')
      .test('contains-two-letters', 'Le nom doit contenir au moins 2 lettres', value =>
        (value.replace(/\s/g, '').match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g) || []).length >= 2)
      .test('no-consecutive-uppercase', 'Le nom ne doit pas contenir deux majuscules consécutives', value =>
        !/(?:[A-Z]{2,})/.test(value))
      .test('no-sql-keywords', 'Le nom ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
    Date_De_Naissance: Yup.date()
      .required('Date de naissance est requise')
      .nullable()
      .max(new Date(), 'La date de naissance ne peut pas être dans le futur'),
    Date_Adoption: Yup.date()
      .required('Date d\'adoption est requise')
      .nullable()
      .min(Yup.ref('Date_De_Naissance'), 'Date d\'adoption doit être après la date de naissance')
      .max(new Date(), 'La date d\'adoption ne peut pas être dans le futur'),
    Espece: Yup.string()
      .required('Type d\'animal est requis')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s_-]*$/, 'Le type d\'animal ne doit pas contenir de caractères spéciaux')
      .test('no-sql-keywords', 'Le type d\'animal ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
    Race: Yup.string()
      .required('Race est requise')
      .max(100, 'La race ne peut pas dépasser 100 caractères')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s_-]*$/, 'La race ne doit pas contenir de caractères spéciaux')
      .test('no-consecutive-uppercase', 'La race ne doit pas contenir deux majuscules consécutives', value =>
        !/(?:[A-Z]{2,})/.test(value))
      .test('no-sql-keywords', 'La race ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
    Sexe: Yup.string()
      .required('Sexe est requis')
      .test('no-sql-keywords', 'Le sexe ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
    Poids: Yup.number()
      .required('Poids est requis')
      .min(0.1, 'Le poids doit être au minimum de 0.1 kg')
      .max(4000, 'Le poids ne peut pas dépasser 4000kg'),
    Habitat: Yup.string()
      .required('Habitat est requis')
      .test('no-sql-keywords', 'L\'habitat ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value)),
  });

  const handleChange = (name, value) => {
    setAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const isValid = await validationSchema.isValid(animal);
    if (!isValid) {
      Alert.alert('Validation', 'Veuillez remplir correctement tous les champs.');
      return;
    }

    const isModified = Object.keys(animal).some(key => {
      const newValue = typeof animal[key] === 'string' ? animal[key].replace(/\s/g, '') : animal[key];
      const oldValue = typeof initialAnimal[key] === 'string' ? initialAnimal[key] : selectedAnimal[key];

      if (newValue === '' && oldValue !== '') {
        Alert.alert('Validation', `Le champ ${key} ne peut pas être vidé.`);
        return false;
      }

      return newValue !== oldValue;
    });

    if (!isModified) {
      Alert.alert('Validation', 'Aucune modification détectée ou les espaces ne sont pas pris en compte.');
      return;
    }

    const sanitizedAnimal = {
      ...animal,
      Nom: DOMPurify.sanitize(animal.Nom),
      Race: DOMPurify.sanitize(animal.Race),
      Espece: DOMPurify.sanitize(animal.Espece),
      Sexe: DOMPurify.sanitize(animal.Sexe),
      Habitat: DOMPurify.sanitize(animal.Habitat),
    };

    try {
      const response = await updateAnimal(selectedAnimal.Id_Animal, sanitizedAnimal, authState.token);

      if (response.success) {
        setSelectedAnimal(null);
        navigation.navigate('MesAnimaux');
      } else if (response.error) {
        setMessage(response.error);
      }
    } catch (error) {
      setMessage('Vous avez dépassé la limite de 3 modifications de l\'animal par jour');
    }
  };

  if (!animal) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier Animal: {initialAnimal?.Nom}</Text>
      <View style={styles.form}>
        {message ? <Text style={styles.error}>{message}</Text> : null}
        <View style={styles.inputGroup}>
          <Text>Nom:</Text>
          <TextInput
            style={styles.input}
            value={animal.Nom}
            onChangeText={(text) => handleChange('Nom', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Date de Naissance:</Text>
          <TextInput
            style={styles.input}
            value={animal.Date_De_Naissance}
            onChangeText={(text) => handleChange('Date_De_Naissance', text)}
            placeholder="AAAA-MM-JJ"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Date d'Adoption:</Text>
          <TextInput
            style={styles.input}
            value={animal.Date_Adoption}
            onChangeText={(text) => handleChange('Date_Adoption', text)}
            placeholder="AAAA-MM-JJ"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Espèce:</Text>
          <TextInput
            style={styles.input}
            value={animal.Espece}
            onChangeText={(text) => handleChange('Espece', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Race:</Text>
          <TextInput
            style={styles.input}
            value={animal.Race}
            onChangeText={(text) => handleChange('Race', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Sexe:</Text>
          <TextInput
            style={styles.input}
            value={animal.Sexe}
            onChangeText={(text) => handleChange('Sexe', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Poids (kg):</Text>
          <TextInput
            style={styles.input}
            value={animal.Poids.toString()}
            onChangeText={(text) => handleChange('Poids', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Habitat:</Text>
          <TextInput
            style={styles.input}
            value={animal.Habitat}
            onChangeText={(text) => handleChange('Habitat', text)}
          />
        </View>
        <Button title="Enregistrer les modifications" onPress={handleSubmit} />
      </View>
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
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default ModifierAnimalForm;
