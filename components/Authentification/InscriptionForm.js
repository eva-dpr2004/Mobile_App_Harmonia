import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  InscriptionContainer,
  FormContainer,
  FormBox,
  FormTitle,
  FormLink,
  Label,
  Input,
  Button,
  ButtonText,
  ErrorText,
  TermsContainer,
  TermsLabel,
  TermsLink,
  ImgInscription,
} from '../../styles/FormulairesStyle';

function InscriptionForm() {
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
        message:
          "Le nom doit contenir uniquement des lettres, des chiffres ou les caractères -_' et doit avoir entre 3 et 15 caractères.",
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

  const navigation = useNavigation();

  const onSubmit = (userData, { setSubmitting, setFieldError }) => {
    axios.post('http://localhost:3001/auth/signup', userData)
      .then(() => {
        navigation.navigate('Connexion');
        setSubmitting(false);
      })
      .catch(error => {
        console.error("Erreur lors de l'inscription: ", error);
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
    <InscriptionContainer>
      <ImgInscription source={require('../../assets/img/Vecteurs/inscription.png')} />
      <FormContainer>
        <FormBox>
          <FormTitle>Inscription</FormTitle>
          <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
            <FormLink>
              Vous avez déjà un compte ? cliquez ici.
            </FormLink>
          </TouchableOpacity>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => (
              <>
                <Label>Nom:</Label>
                <Input
                  onChangeText={handleChange('Nom')}
                  onBlur={handleBlur('Nom')}
                  value={values.Nom}
                  placeholder="Votre nom..."
                />
                {touched.Nom && errors.Nom && <ErrorText>{errors.Nom}</ErrorText>}

                <Label>Email:</Label>
                <Input
                  onChangeText={handleChange('Email')}
                  onBlur={handleBlur('Email')}
                  value={values.Email}
                  placeholder="Votre email..."
                  keyboardType="email-address"
                />
                {touched.Email && errors.Email && <ErrorText>{errors.Email}</ErrorText>}

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

                <Label>Confirmer Mot de Passe:</Label>
                <Input
                  onChangeText={handleChange('Confirm_Mot_De_Passe')}
                  onBlur={handleBlur('Confirm_Mot_De_Passe')}
                  value={values.Confirm_Mot_De_Passe}
                  placeholder="Confirmez votre mot de passe..."
                  secureTextEntry
                />
                {touched.Confirm_Mot_De_Passe && errors.Confirm_Mot_De_Passe && (
                  <ErrorText>{errors.Confirm_Mot_De_Passe}</ErrorText>
                )}

                <TermsContainer>
                  <TouchableOpacity onPress={() => setFieldValue('acceptTerms', !values.acceptTerms)}>
                    <TermsLabel>
                      En continuant, vous acceptez nos <TermsLink>Politique de Confidentialité</TermsLink>, <TermsLink>Politique de Cookies</TermsLink> et <TermsLink>Mentions Légales</TermsLink>.
                    </TermsLabel>
                  </TouchableOpacity>
                  {touched.acceptTerms && errors.acceptTerms && (
                    <ErrorText>{errors.acceptTerms}</ErrorText>
                  )}
                </TermsContainer>

                <Button
                  onPress={handleSubmit}
                  disabled={isSubmitting || !values.acceptTerms}
                >
                  <ButtonText>Créer mon compte</ButtonText>
                </Button>

                {errors.submit && <ErrorText>{errors.submit}</ErrorText>}
              </>
            )}
          </Formik>
        </FormBox>
      </FormContainer>
    </InscriptionContainer>
  );
}

export default InscriptionForm;
