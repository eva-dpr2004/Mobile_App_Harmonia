import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  FormContainer,
  FormBox,
  FormTitle,
  FormLink,
  Label,
  Input,
  Button,
  ButtonText,
  ErrorText,
} from '../../styles/FormulairesStyle';

function ConnexionForm({ navigation }) {
  const [initialValues] = useState({ NomOrEmail: '', Mot_De_Passe: '' });

  const validationSchema = Yup.object().shape({
    NomOrEmail: Yup.string()
      .required("Le nom ou l'email est requis")
      .test(
        'is-valid',
        "Le nom ou l'email doit être valide",
        value =>
          value &&
          (Yup.string().email().isValidSync(value) ||
            /^[\p{L}0-9-_' ]{3,15}$/u.test(value))
      ),
    Mot_De_Passe: Yup.string()
      .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`])\S{12,}$/,
        'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial.'
      )
      .required('Le mot de passe est requis'),
  });

  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await validationSchema.validate(values);

      const data = { NomOrEmail: values.NomOrEmail, Mot_De_Passe: values.Mot_De_Passe };
      axios
        .post('http://localhost:3001/auth/login', data, { withCredentials: true })
        .then(response => {
          if (response.data.error) {
            Alert.alert('Erreur', response.data.error);
          } else {
            navigation.navigate('Profil');
          }
        })
        .catch(error => {
          Alert.alert('Erreur de connexion', error.message);
        });
    } catch (validationError) {
      Alert.alert('Erreur de validation', validationError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormBox>
        <FormTitle>Connexion</FormTitle>
        <FormLink onPress={() => navigation.navigate('Inscription')}>
          Vous n'avez pas de compte ? cliquez ici.
        </FormLink>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Label>Nom ou Email:</Label>
              <Input
                onChangeText={handleChange('NomOrEmail')}
                onBlur={handleBlur('NomOrEmail')}
                value={values.NomOrEmail}
                placeholder="Votre nom ou email..."
              />
              {touched.NomOrEmail && errors.NomOrEmail && (
                <ErrorText>{errors.NomOrEmail}</ErrorText>
              )}

              <Label>Mot de Passe:</Label>
              <Input
                onChangeText={handleChange('Mot_De_Passe')}
                onBlur={handleBlur('Mot_De_Passe')}
                value={values.Mot_De_Passe}
                placeholder="Votre mot de passe..."
                secureTextEntry
              />
              {touched.Mot_De_Passe && errors.Mot_De_Passe && (
                <ErrorText>{errors.Mot_De_Passe}</ErrorText>
              )}

              <Button onPress={handleSubmit}>
                <ButtonText>Login</ButtonText>
              </Button>
              {errors.submit && <ErrorText>{errors.submit}</ErrorText>}
            </>
          )}
        </Formik>
      </FormBox>
    </FormContainer>
  );
}

export default ConnexionForm;
