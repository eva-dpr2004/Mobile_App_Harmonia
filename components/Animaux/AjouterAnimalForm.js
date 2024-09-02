import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { addAnimal } from '../../services/Animaux';

const typesAnimauxDisponibles = [
  'chat', 'chien', 'lapin', 'hamster', 'cochon d\'inde', 'furet', 'chinchilla', 'souris', 'singe', 'hérisson',
  'poissons rouges', 'carpes koï', 'poisson-clown', 'poisson-ange', 'poisson-chat',
  'perroquet', 'canari', 'poule', 'coq', 'canard', 'oie', 'dindon', 'perruche', 'pigeon', 'moineau',
  'tortue', 'lézard', 'gecko', 'serpent', 'axolotl', 'salamandre', 'iguane', 'caméléon', 'grenouille', 'triton'
];

const AjouterAnimalForm = () => {
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
        .max(100, 'Le nom ne peut pas dépasser 100 caractères')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ _-]*$/, 'Le nom ne doit contenir que des lettres, des espaces, des tirets ou des underscores')
        .test('contains-two-letters', 'Le nom doit contenir au moins 2 lettres', value => 
          (value.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g) || []).length >= 2)
        .test('no-sql-words', 'Le nom contient des mots réservés SQL non autorisés', value => 
          !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value))
        .test('no-consecutive-uppercase', 'Le nom ne doit pas contenir deux majuscules consécutives', value => 
          !/(?:[A-Z]{2,})/.test(value))
        .test('min-length-no-spaces', 'Le nom doit contenir au minimum 3 caractères (sans les espaces)', value => 
          value.replace(/\s/g, '').length >= 3)
        .matches(/^[^!@#$%^&*(),.?":{}|<>]*$/, 'Le nom ne doit pas contenir de caractères spéciaux'),
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
      Race: Yup.string()
        .required('Race est requise')
        .max(100, 'La race ne peut pas dépasser 100 caractères')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ -]*$/, 'La race ne doit contenir que des lettres, des espaces ou des tirets')
        .test('no-sql-words', 'La race contient des mots réservés SQL non autorisés', value => 
          !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value))
        .test('no-consecutive-uppercase', 'La race ne doit pas contenir deux majuscules consécutives', value => 
          !/(?:[A-Z]{2,})/.test(value))
        .test('min-length-no-spaces', 'La race doit contenir au minimum 3 caractères (sans les espaces)', value => 
          value.replace(/\s/g, '').length >= 3)
        .matches(/^[^!@#$%^&*(),.?":{}|<>]*$/, 'La race ne doit pas contenir de caractères spéciaux'),
      Sexe: Yup.string().required('Sexe est requis'),
      Poids: Yup.number()
        .required('Poids est requis')
        .min(0.1, 'Le poids doit être au minimum de 0.1 kg')
        .max(4000, 'Le poids ne peut pas dépasser 4000kg')
        .test('no-special-characters', 'Le poids ne doit pas contenir de caractères spéciaux', value => 
          /^[0-9]*\.?[0-9]*$/.test(value)),
      Habitat: Yup.string().required('Habitat est requis'),
    }),
    onSubmit: async values => {
      values.Espece = values.Espece.toLowerCase();

      if (file) {
        try {
          const fileRef = ref(storage, `animals/${file.uri.split('/').pop()}`);
          const img = await fetch(file.uri);
          const bytes = await img.blob();
          await uploadBytes(fileRef, bytes);
          const photoURL = await getDownloadURL(fileRef);
          values.photoURL = photoURL;
        } catch (error) {
          console.error('Erreur lors du téléchargement de l\'image:', error);
          return; // Arrête l'exécution en cas d'erreur
        }
      }

      try {
        const responseData = await addAnimal(values, authState.token);
        console.log('Animal ajouté:', responseData);
        navigation.navigate('ValidationAjout');
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'animal:", error);
      }
    },
  });

  const handleFileChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission refusée", "Vous devez autoriser l'accès à la galerie pour sélectionner une image.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const fileUri = result.assets[0].uri;

      try {
        // On peut copier l'image dans un répertoire temporaire si nécessaire
        const tempFileUri = `${FileSystem.documentDirectory}${fileUri.split('/').pop()}`;
        await FileSystem.copyAsync({
          from: fileUri,
          to: tempFileUri,
        });

        setFile({ uri: tempFileUri });
        setPreview(tempFileUri);
        setFileError('');
      } catch (error) {
        console.error('Erreur lors de la manipulation du fichier:', error);
        setFileError('Erreur lors de la manipulation du fichier');
        setFile(null);
        setPreview(null);
      }
    } else {
      setFileError('Veuillez sélectionner un fichier image valide.');
      setFile(null);
      setPreview(null);
    }
  };

  const navigateToList = () => {
    navigation.navigate('TypesAnimaux');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'←'}</Text>
        </TouchableOpacity>
        Ajouter Animal
      </Text>
      <View style={styles.form}>
        <TouchableOpacity onPress={handleFileChange} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Choisir une photo (optionnel)</Text>
        </TouchableOpacity>
        {fileError && <Text style={styles.error}>{fileError}</Text>}
        {preview && <Image source={{ uri: preview }} style={styles.imagePreview} />}
        <View style={styles.inputGroup}>
          <Text>Nom :</Text>
          <TextInput
            style={styles.input}
            value={formik.values.Nom}
            onChangeText={formik.handleChange('Nom')}
            onBlur={formik.handleBlur('Nom')}
            placeholder="Nom de l'animal"
          />
          {formik.touched.Nom && formik.errors.Nom ? (
            <Text style={styles.error}>{formik.errors.Nom}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text>Date de naissance :</Text>
          <TextInput
            style={styles.input}
            value={formik.values.Date_De_Naissance}
            onChangeText={formik.handleChange('Date_De_Naissance')}
            onBlur={formik.handleBlur('Date_De_Naissance')}
            placeholder="AAAA-MM-JJ"
            maxLength={10}
          />
          {formik.touched.Date_De_Naissance && formik.errors.Date_De_Naissance ? (
            <Text style={styles.error}>{formik.errors.Date_De_Naissance}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text>Date d'adoption :</Text>
          <TextInput
            style={styles.input}
            value={formik.values.Date_Adoption}
            onChangeText={formik.handleChange('Date_Adoption')}
            onBlur={formik.handleBlur('Date_Adoption')}
            placeholder="AAAA-MM-JJ"
            maxLength={10}
          />
          {formik.touched.Date_Adoption && formik.errors.Date_Adoption ? (
            <Text style={styles.error}>{formik.errors.Date_Adoption}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text>Type d'animal :</Text>
          <TextInput
            style={styles.input}
            value={formik.values.Espece}
            onChangeText={formik.handleChange('Espece')}
            onBlur={formik.handleBlur('Espece')}
            placeholder="Espèce de l'animal"
          />
          {formik.touched.Espece && formik.errors.Espece ? (
            <Text style={styles.error}>{formik.errors.Espece}</Text>
          ) : null}
          <Text style={styles.link} onPress={navigateToList}>Voir la liste des types d'animaux disponibles</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text>Race :</Text>
          <TextInput
            style={styles.input}
            value={formik.values.Race}
            onChangeText={formik.handleChange('Race')}
            onBlur={formik.handleBlur('Race')}
            placeholder="Race de l'animal"
          />
          {formik.touched.Race && formik.errors.Race ? (
            <Text style={styles.error}>{formik.errors.Race}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text>Sexe :</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity onPress={() => formik.setFieldValue('Sexe', 'Mâle')}>
              <Text style={[styles.radio, formik.values.Sexe === 'Mâle' && styles.selectedRadio]}>Mâle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => formik.setFieldValue('Sexe', 'Femelle')}>
              <Text style={[styles.radio, formik.values.Sexe === 'Femelle' && styles.selectedRadio]}>Femelle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => formik.setFieldValue('Sexe', 'Inconnu')}>
              <Text style={[styles.radio, formik.values.Sexe === 'Inconnu' && styles.selectedRadio]}>Inconnu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => formik.setFieldValue('Sexe', 'Hermaphrodite')}>
              <Text style={[styles.radio, formik.values.Sexe === 'Hermaphrodite' && styles.selectedRadio]}>Hermaphrodite</Text>
            </TouchableOpacity>
          </View>
          {formik.touched.Sexe && formik.errors.Sexe ? (
            <Text style={styles.error}>{formik.errors.Sexe}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text>Poids (en kg) :</Text>
          <TextInput
            style={styles.input}
            value={formik.values.Poids}
            onChangeText={formik.handleChange('Poids')}
            onBlur={formik.handleBlur('Poids')}
            placeholder="Entrez le poids en kg"
            keyboardType="numeric"
          />
          {formik.touched.Poids && formik.errors.Poids ? (
            <Text style={styles.error}>{formik.errors.Poids}</Text>
          ) : null}
        </View>
        <View style={styles.inputGroup}>
          <Text>Habitat :</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity onPress={() => formik.setFieldValue('Habitat', 'Intérieur')}>
              <Text style={[styles.radio, formik.values.Habitat === 'Intérieur' && styles.selectedRadio]}>Intérieur</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => formik.setFieldValue('Habitat', 'Extérieur')}>
              <Text style={[styles.radio, formik.values.Habitat === 'Extérieur' && styles.selectedRadio]}>Extérieur</Text>
            </TouchableOpacity>
          </View>
          {formik.touched.Habitat && formik.errors.Habitat ? (
            <Text style={styles.error}>{formik.errors.Habitat}</Text>
          ) : null}
        </View>
        <Button title="Ajouter" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
};

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
  backButton: {
    fontSize: 24,
    color: '#183255',
    marginRight: 10,
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
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  radio: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedRadio: {
    backgroundColor: '#1a3558',
    color: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  link: {
    color: '#007BFF',
    marginTop: 10,
  },
  uploadButton: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#1a3558',
    borderRadius: 5,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 16,
  },
});

export default AjouterAnimalForm;
