import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const typesAnimauxDisponibles = [
  'chat', 'chien', 'lapin', 'hamster', 'cochon d\'inde', 'furet', 'chinchilla', 'souris', 'singe', 'hérisson',
  'poissons rouges', 'carpes koï', 'poisson-clown', 'poisson-ange', 'poisson-chat',
  'perroquet', 'canari', 'poule', 'coq', 'canard', 'oie', 'dindon', 'perruche', 'pigeon', 'moineau',
  'tortue', 'lézard', 'gecko', 'serpent', 'axolotl', 'salamandre', 'iguane', 'caméléon', 'grenouille', 'triton'
];

function AjouterAnimalForm() {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation();
  const [fileUri, setFileUri] = useState(null);
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

      if (fileUri) {
        const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1);
        const fileRef = storage().ref(`animals/${fileName}`);
        await fileRef.putFile(fileUri);
        const photoURL = await fileRef.getDownloadURL();
        values.photoURL = photoURL;
      }

      axios.post("http://localhost:3001/animals/ajoutAnimal", values, {
        headers: {
          'Authorization': `Bearer ${authState.token}`
        }
      }).then((response) => {
        console.log('Animal ajouté:', response.data);
        navigation.navigate('ValidationAjout');
      }).catch((error) => {
        console.error("Erreur lors de l'ajout de l'animal:", error);
      });
    },
  });

  const handleFileChange = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
        setFileError('Erreur lors de la sélection de l\'image.');
      } else {
        const uri = response.assets[0].uri;
        setFileUri(uri);
        setFileError('');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter Animal</Text>
      <Button title="Choisir une photo" onPress={handleFileChange} />
      {fileError ? <Text style={styles.error}>{fileError}</Text> : null}
      {fileUri && <Image source={{ uri: fileUri }} style={styles.imagePreview} />}
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
        placeholder="YYYY-MM-DD"
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
        placeholder="YYYY-MM-DD"
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
      <View style={styles.radioGroup}>
        <TouchableOpacity onPress={() => formik.setFieldValue('Sexe', 'Mâle')}>
          <Text>Mâle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => formik.setFieldValue('Sexe', 'Femelle')}>
          <Text>Femelle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => formik.setFieldValue('Sexe', 'Inconnu')}>
          <Text>Inconnu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => formik.setFieldValue('Sexe', 'Hermaphrodite')}>
          <Text>Hermaphrodite</Text>
        </TouchableOpacity>
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
      />
      {formik.touched.Poids && formik.errors.Poids ? (
        <Text style={styles.error}>{formik.errors.Poids}</Text>
      ) : null}

      <Text>Habitat :</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity onPress={() => formik.setFieldValue('Habitat', 'Intérieur')}>
          <Text>Intérieur</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => formik.setFieldValue('Habitat', 'Extérieur')}>
          <Text>Extérieur</Text>
        </TouchableOpacity>
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
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default AjouterAnimalForm;
