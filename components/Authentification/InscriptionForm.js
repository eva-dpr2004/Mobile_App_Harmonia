import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { createUser } from '../../services/Auth';

function InscriptionForm({ navigation }) {
  const initialValues = {
    Nom: '',
    Email: '',
    Mot_De_Passe: '',
    Confirm_Mot_De_Passe: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    Nom: Yup.string()
      .matches(/^[\p{L}0-9-_' ]{3,15}$/u, {
        message: "Le nom doit contenir uniquement des lettres, des chiffres ou les caractères -_' et doit avoir entre 3 et 15 caractères.",
      })
      .required('Le nom est requis'),
    Email: Yup.string()
      .email("L'email doit être une adresse email valide")
      .required("L'email est requis"),
    Mot_De_Passe: Yup.string()
      .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`])\S{12,}$/,
        'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial.'
      )
      .required('Le mot de passe est requis'),
    Confirm_Mot_De_Passe: Yup.string()
      .oneOf([Yup.ref('Mot_De_Passe'), null], 'Les mots de passe doivent correspondre')
      .required('La confirmation du mot de passe est requise'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'Vous devez accepter les termes et conditions pour continuer.')
      .required("L'acceptation des termes et conditions est obligatoire"),
  });

  const onSubmit = (userData, { setSubmitting, setFieldError }) => {
    createUser(userData)
      .then(() => {
        navigation.navigate('Connexion');
        setSubmitting(false);
      })
      .catch(error => {
        console.error('Erreur lors de l\'inscription: ', error);
        if (error.response && error.response.data) {
          if (error.response.data.error === 'Nom déjà pris') {
            setFieldError('Nom', 'Nom déjà pris');
          } else if (error.response.data.error === 'Email déjà pris') {
            setFieldError('Email', 'Email déjà pris');
          } else {
            setFieldError('submit', "Erreur lors de l'inscription");
          }
        } else {
          setFieldError('submit', "Erreur lors de l'inscription");
        }
        setSubmitting(false);
      });
  };

  return (
    <View style={styles.inscription}>
      <Text style={styles.title}>Inscription</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
        <Text style={styles.formLink}>Vous avez déjà un compte ? cliquez ici.</Text>
      </TouchableOpacity>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Nom:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Nom')}
              onBlur={handleBlur('Nom')}
              value={values.Nom}
              placeholder="Votre nom..."
            />
            {touched.Nom && errors.Nom && <Text style={styles.error}>{errors.Nom}</Text>}

            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Email')}
              onBlur={handleBlur('Email')}
              value={values.Email}
              placeholder="Votre email..."
              keyboardType="email-address"
            />
            {touched.Email && errors.Email && <Text style={styles.error}>{errors.Email}</Text>}

            <Text style={styles.label}>Mot de Passe:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Mot_De_Passe')}
              onBlur={handleBlur('Mot_De_Passe')}
              value={values.Mot_De_Passe}
              placeholder="Votre mot de passe..."
              secureTextEntry
            />
            {touched.Mot_De_Passe && errors.Mot_De_Passe && (
              <Text style={styles.error}>{errors.Mot_De_Passe}</Text>
            )}

            <Text style={styles.label}>Confirmer Mot de Passe:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Confirm_Mot_De_Passe')}
              onBlur={handleBlur('Confirm_Mot_De_Passe')}
              value={values.Confirm_Mot_De_Passe}
              placeholder="Confirmez votre mot de passe..."
              secureTextEntry
            />
            {touched.Confirm_Mot_De_Passe && errors.Confirm_Mot_De_Passe && (
              <Text style={styles.error}>{errors.Confirm_Mot_De_Passe}</Text>
            )}

            <View style={styles.termsContainer}>
              <TouchableOpacity onPress={() => setFieldValue('acceptTerms', !values.acceptTerms)}>
                <Text style={styles.termsText}>
                  En continuant, vous acceptez nos <Text style={styles.linkText}>Politique de Confidentialité</Text>, <Text style={styles.linkText}>Politique de Cookies</Text> et <Text style={styles.linkText}>Mentions Légales</Text>.
                </Text>
              </TouchableOpacity>
              {touched.acceptTerms && errors.acceptTerms && (
                <Text style={styles.error}>{errors.acceptTerms}</Text>
              )}
            </View>

            <Button
              onPress={handleSubmit}
              title="Créer mon compte"
              disabled={isSubmitting || !values.acceptTerms}
            />

            {errors.submit && <Text style={styles.error}>{errors.submit}</Text>}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  inscription: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formLink: {
    color: '#0066cc',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  termsContainer: {
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
  },
  linkText: {
    color: '#0066cc',
  },
});

export default InscriptionForm;
