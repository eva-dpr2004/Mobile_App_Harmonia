import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import * as Yup from 'yup';
import DOMPurify from 'dompurify'; 
import { useNavigation } from '@react-navigation/native';
import { checkAuthStatus, loginUser } from '../../services/Auth'; 

const ConnexionForm = () => {
  const [NomOrEmail, setNomOrEmail] = useState("");
  const [Mot_De_Passe, setMot_De_Passe] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    NomOrEmail: Yup.string()
      .required("Le nom ou l'email est requis")
      .test(
        'is-valid',
        "Le nom ou l'email doit être valide",
        value => value && (Yup.string().email().isValidSync(value) || /^[\p{L}0-9-_' ]{3,15}$/u.test(value.replace(/\s/g, '')))
      )
      .test('no-sql-keywords', 'Le nom ou l\'email ne doit pas contenir des mots réservés SQL', value =>
        !/(DROP\s+TABLE|SELECT|DELETE|INSERT|UPDATE|CREATE|ALTER|EXEC)/i.test(value.replace(/\s/g, ''))),
    Mot_De_Passe: Yup.string()
      .min(12, "Le mot de passe doit contenir au moins 12 caractères")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`])\S{12,}$/,
        "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial."
      )
      .required("Le mot de passe est requis"),
  });

  useEffect(() => {
    checkAuthStatus()
      .then((response) => {
        if (!response.error) {
          navigation.navigate('Accueil'); 
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification de l'authentification:", error);
      });
  }, [navigation]);

  const login = async () => {
    try {
      await validationSchema.validate({ NomOrEmail, Mot_De_Passe });

      const sanitizedData = {
        NomOrEmail: DOMPurify.sanitize(NomOrEmail),
        Mot_De_Passe: DOMPurify.sanitize(Mot_De_Passe)
      };

      const response = await loginUser(sanitizedData);

      if (response.error) {
        setErrorMessage(response.error);
      } else {
        navigation.navigate('Accueil');  
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.message);
      } else if (error.response && error.response.status === 403 && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Erreur de connexion: Veuillez réessayer.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img/Vecteurs/connexion.png')} style={styles.image} />
      <View style={styles.connexion}>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.link} onPress={() => navigation.navigate('Inscription')}>
          Vous n'avez pas de compte ? cliquez ici.
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.formBox}>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <Text style={styles.label}>Nom ou Email :</Text>
            <TextInput
              style={styles.input}
              value={NomOrEmail}
              onChangeText={setNomOrEmail}
              placeholder="Votre nom ou email..."
            />
            <Text style={styles.label}>Mot de passe :</Text>
            <TextInput
              style={styles.input}
              value={Mot_De_Passe}
              onChangeText={setMot_De_Passe}
              placeholder="Votre mot de passe..."
              secureTextEntry
            />
            <Button title="Connexion" onPress={login} />
          </View>
        </View>
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  connexion: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    color: '#007BFF',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  formBox: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default ConnexionForm;
