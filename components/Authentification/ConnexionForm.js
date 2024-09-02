import React, { useEffect, useContext, useState } from 'react';
import { Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DOMPurify from 'dompurify';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { checkAuthStatus, loginUser } from '../../services/Auth';
import { Connexion, Title, FormLink, FormContainer, FormBox, Label, StyledInput, ErrorText } from '../../styles/FormulairesStyle';

const ConnexionForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const { setAuthState } = useContext(AuthContext);

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

  const handleSubmit = async (values, { setSubmitting }) => {
    setErrorMessage("");

    try {
      const sanitizedData = {
        NomOrEmail: DOMPurify.sanitize(values.NomOrEmail),
        Mot_De_Passe: DOMPurify.sanitize(values.Mot_De_Passe),
      };

      const response = await loginUser(sanitizedData);

      if (response.error) {
        setErrorMessage(response.error);
      } else {
        setAuthState({
          isAuthenticated: true,
          user: response.user,
          token: response.token,
        });
        navigation.navigate('Accueil');
      }
    } catch (error) {
      if (error.response && error.response.status === 403 && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Erreur de connexion: Veuillez réessayer.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Connexion>
      <Title>Connexion</Title>
      <FormLink onPress={() => navigation.navigate('Inscription')}>
        Vous n'avez pas de compte ? cliquez ici.
      </FormLink>
      <Formik
        initialValues={{ NomOrEmail: '', Mot_De_Passe: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <FormContainer>
            <FormBox>
              {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
              <Label>Nom ou Email :</Label>
              <StyledInput
                onChangeText={handleChange('NomOrEmail')}
                onBlur={handleBlur('NomOrEmail')}
                value={values.NomOrEmail}
                placeholder="Votre nom ou email..."
              />
              {touched.NomOrEmail && errors.NomOrEmail && <ErrorText>{errors.NomOrEmail}</ErrorText>}

              <Label>Mot de passe :</Label>
              <StyledInput
                onChangeText={handleChange('Mot_De_Passe')}
                onBlur={handleBlur('Mot_De_Passe')}
                value={values.Mot_De_Passe}
                placeholder="Votre mot de passe..."
                secureTextEntry
              />
              {touched.Mot_De_Passe && errors.Mot_De_Passe && <ErrorText>{errors.Mot_De_Passe}</ErrorText>}

              <Button
                title="Connexion"
                onPress={handleSubmit}
                color="#193356"
                disabled={isSubmitting}
              />
            </FormBox>
          </FormContainer>
        )}
      </Formik>
    </Connexion>
  );
};

export default ConnexionForm;
