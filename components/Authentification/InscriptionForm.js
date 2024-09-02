import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createUser } from '../../services/Auth';
import { useNavigation } from '@react-navigation/native';
import { Inscription, FormContainer, FormBox, Label, StyledInput, Terms, TermsInput, TermsLabel, TermsLink, ErrorText, Title, FormLink,
} from '../../styles/FormulairesStyle';
import { Button } from 'react-native'; 

function InscriptionForm() {
  const navigation = useNavigation();

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

  const onSubmit = (userData, { setSubmitting, setFieldError }) => {
    createUser(userData)
      .then(() => {
        navigation.navigate('Profil');
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
    <Inscription>
      <Title>Inscription</Title>
      <FormLink onPress={() => navigation.navigate('Connexion')}>
        Vous avez déjà un compte ? cliquez ici.
      </FormLink>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => (
          <FormContainer>
            <FormBox>
              <Label>Nom:</Label>
              <StyledInput
                onChangeText={handleChange('Nom')}
                onBlur={handleBlur('Nom')}
                value={values.Nom}
                placeholder="Votre nom..."
              />
              {touched.Nom && errors.Nom && <ErrorText>{errors.Nom}</ErrorText>}

              <Label>Email:</Label>
              <StyledInput
                onChangeText={handleChange('Email')}
                onBlur={handleBlur('Email')}
                value={values.Email}
                placeholder="Votre email..."
                keyboardType="email-address"
              />
              {touched.Email && errors.Email && <ErrorText>{errors.Email}</ErrorText>}

              <Label>Mot de Passe:</Label>
              <StyledInput
                onChangeText={handleChange('Mot_De_Passe')}
                onBlur={handleBlur('Mot_De_Passe')}
                value={values.Mot_De_Passe}
                placeholder="Votre mot de passe..."
                secureTextEntry
              />
              {touched.Mot_De_Passe && errors.Mot_De_Passe && <ErrorText>{errors.Mot_De_Passe}</ErrorText>}

              <Label>Confirmer Mot de Passe:</Label>
              <StyledInput
                onChangeText={handleChange('Confirm_Mot_De_Passe')}
                onBlur={handleBlur('Confirm_Mot_De_Passe')}
                value={values.Confirm_Mot_De_Passe}
                placeholder="Confirmez votre mot de passe..."
                secureTextEntry
              />
              {touched.Confirm_Mot_De_Passe && errors.Confirm_Mot_De_Passe && <ErrorText>{errors.Confirm_Mot_De_Passe}</ErrorText>}

              <Terms>
              <TermsInput
                  value={values.acceptTerms}
                  onValueChange={() => setFieldValue('acceptTerms', !values.acceptTerms)}
                />
                <TermsLabel>
                  En continuant, vous acceptez nos{' '}
                  <TermsLink onPress={() => navigation.navigate('PolitiqueDeConfidentialite')}>
                    Politique de Confidentialité
                  </TermsLink>,{' '}
                  <TermsLink onPress={() => navigation.navigate('PolitiqueDeCookies')}>
                    Politique de Cookies
                  </TermsLink> et{' '}
                  <TermsLink onPress={() => navigation.navigate('MentionsLegales')}>
                    Mentions Légales
                  </TermsLink>.
                </TermsLabel>
              </Terms>
              {touched.acceptTerms && errors.acceptTerms && <ErrorText>{errors.acceptTerms}</ErrorText>}

              <Button
                title="Créer mon compte"
                onPress={handleSubmit}
                disabled={isSubmitting || !values.acceptTerms}
                color="#003366"
              />

              {errors.submit && <ErrorText>{errors.submit}</ErrorText>}
            </FormBox>
          </FormContainer>
        )}
      </Formik>
    </Inscription>
  );
}

export default InscriptionForm;
