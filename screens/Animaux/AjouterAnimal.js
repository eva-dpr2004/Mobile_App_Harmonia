import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { storage } from '../../firebase';
import * as ImagePicker from 'expo-image-picker';

const typesAnimauxDisponibles = [
  'chat', 'chien', 'lapin', 'hamster', 'cochon d\'inde', 'furet', 'chinchilla', 'souris', 'singe', 'hérisson',
  'poissons rouges', 'carpes koï', 'poisson-clown', 'poisson-ange', 'poisson-chat',
  'perroquet', 'canari', 'poule', 'coq', 'canard', 'oie', 'dindon', 'perruche', 'pigeon', 'moineau',
  'tortue', 'lézard', 'gecko', 'serpent', 'axolotl', 'salamandre', 'iguane', 'caméléon', 'grenouille', 'triton'
];

export default function AjouterAnimal() {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const formik = useFormik({
    initialValues: {
      Nom: '',
      Date_De_Naissance: '',
      Date_Adoption: '',
      Espece: '',
      Race: '',
      Sexe: '',
      Poids: '',
      Habitat: '',
    },
    validationSchema: Yup.object({
      Nom: Yup.string()
        .required('Nom est requis')
        .max(50, 'Le nom ne peut pas dépasser 50 caractères')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ _-]*$/, 'Le nom ne doit contenir que des lettres, des espaces, des tirets ou des underscores')
        .test('contains-two-letters', 'Le nom doit contenir au moins 2 lettres', value => 
          (value.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g) || []).length >= 2),
      Date_De_Naissance: Yup.date()
        .required('Date de naissance est requise')
        .nullable()
        .max(today, 'La date de naissance ne peut pas être dans le futur'),
      Date_Adoption: Yup.date()
        .required('Date d\'adoption est requise')
        .nullable()
        .min(
          Yup.ref('Date_De_Naissance'),
          'Date d\'adoption doit être après la date de naissance'
        )
        .max(today, 'La date d\'adoption ne peut pas être dans le futur'),
      Espece: Yup.string()
        .required('Type d\'animal est requis')
        .oneOf(typesAnimauxDisponibles, 'Type d\'animal invalide'),
      Race: Yup.string().required('Race est requise'),
      Sexe: Yup.string().required('Sexe est requis'),
      Poids: Yup.number()
        .required('Poids est requis')
        .min(0.1, 'Le poids doit être au minimum de 0.1 kg')
        .max(4000, 'Le poids ne peut pas dépasser 4000kg'),
      Habitat: Yup.string().required('Habitat est requis'),
    }),
    onSubmit: async values => {
      values.Espece = values.Espece.toLowerCase();

      if (file) {
        try {
          const fileRef = storage.ref(`animals/${file.uri.split('/').pop()}`);
          await fileRef.putFile(file.uri);
          const photoURL = await fileRef.getDownloadURL();
          values.photoURL = photoURL;
        } catch (error) {
          console.error('Erreur lors du téléchargement de l\'image:', error);
          setFileError('Erreur lors du téléchargement de l\'image.');
          return;
        }
      }

      try {
        await axios.post("http://localhost:3001/animals/ajoutAnimal", values, {
          headers: {
            'Authorization': `Bearer ${authState.token}`
          },
          withCredentials: true
        });
        console.log('Animal ajouté');
        navigation.navigate('Accueil');
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'animal:", error);
      }
    },
  });

  const handleFileChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setFile(result);
      setPreview(result.uri);
      setFileError('');
    } else {
      setFileError('Veuillez sélectionner une image valide.');
      setFile(null);
      setPreview(null);
    }
  };

  const navigateToList = () => {
    navigation.navigate('ListeAnimaux');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter Animal</Text>
      <View>
        <Text>Choisir une photo :</Text>
        <TouchableOpacity onPress={handleFileChange} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Télécharger une image</Text>
        </TouchableOpacity>
      </View>
      {fileError ? <Text style={styles.error}>{fileError}</Text> : null}
      {preview ? <Image source={{ uri: preview }} style={styles.imagePreview} /> : null}
      
      <Text>Nom :</Text>
      <TextInput 
        style={styles.input}
        value={formik.values.Nom}
        onChangeText={formik.handleChange('Nom')}
        onBlur={formik.handleBlur('Nom')}
      />
      {formik.touched.Nom && formik.errors.Nom ? (
        <Text style={styles.error}>{formik.errors.Nom}</Text>
      ) : null}

      <Text>Date de naissance :</Text>
      <TextInput 
        style={styles.input}
        value={formik.values.Date_De_Naissance}
        onChangeText={formik.handleChange('Date_De_Naissance')}
        onBlur={formik.handleBlur('Date_De_Naissance')}
        max={today}
      />
      {formik.touched.Date_De_Naissance && formik.errors.Date_De_Naissance ? (
        <Text style={styles.error}>{formik.errors.Date_De_Naissance}</Text>
      ) : null}

      <Text>Date d'adoption :</Text>
      <TextInput 
        style={styles.input}
        value={formik.values.Date_Adoption}
        onChangeText={formik.handleChange('Date_Adoption')}
        onBlur={formik.handleBlur('Date_Adoption')}
        max={today}
      />
      {formik.touched.Date_Adoption && formik.errors.Date_Adoption ? (
        <Text style={styles.error}>{formik.errors.Date_Adoption}</Text>
      ) : null}

      <Text>Type d'animal :</Text>
      <TextInput 
        style={styles.input}
        value={formik.values.Espece}
        onChangeText={formik.handleChange('Espece')}
        onBlur={formik.handleBlur('Espece')}
      />
      {formik.touched.Espece && formik.errors.Espece ? (
        <Text style={styles.error}>{formik.errors.Espece}</Text>
      ) : null}
      <TouchableOpacity onPress={navigateToList}>
        <Text style={styles.link}>Voir la liste des types d'animaux disponibles</Text>
      </TouchableOpacity>

      <Text>Race :</Text>
      <TextInput 
        style={styles.input}
        value={formik.values.Race}
        onChangeText={formik.handleChange('Race')}
        onBlur={formik.handleBlur('Race')}
      />
      {formik.touched.Race && formik.errors.Race ? (
        <Text style={styles.error}>{formik.errors.Race}</Text>
      ) : null}

      <Text>Sexe :</Text>
      <View style={styles.radioContainer}>
        {['Mâle', 'Femelle', 'Inconnu', 'Hermaphrodite'].map((sex) => (
          <TouchableOpacity key={sex} onPress={() => formik.setFieldValue('Sexe', sex)}>
            <Text style={formik.values.Sexe === sex ? styles.selectedRadio : styles.radio}>{sex}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {formik.touched.Sexe && formik.errors.Sexe ? (
        <Text style={styles.error}>{formik.errors.Sexe}</Text>
      ) : null}

      <Text>Poids (en kg) :</Text>
      <TextInput 
        style={styles.input}
        value={formik.values.Poids}
        onChangeText={formik.handleChange('Poids')}
        onBlur={formik.handleBlur('Poids')}
        keyboardType="numeric"
        placeholder="Entrez le poids en kg (ex: 0.250)"
      />
      {formik.touched.Poids && formik.errors.Poids ? (
        <Text style={styles.error}>{formik.errors.Poids}</Text>
      ) : null}

      <Text>Habitat :</Text>
      <View style={styles.radioContainer}>
        {['Intérieur', 'Extérieur'].map((habitat) => (
          <TouchableOpacity key={habitat} onPress={() => formik.setFieldValue('Habitat', habitat)}>
            <Text style={formik.values.Habitat === habitat ? styles.selectedRadio : styles.radio}>{habitat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {formik.touched.Habitat && formik.errors.Habitat ? (
        <Text style={styles.error}>{formik.errors.Habitat}</Text>
      ) : null}

      <Button title="Ajouter +" onPress={formik.handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radio: {
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedRadio: {
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    backgroundColor: '#007bff',
    color: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
