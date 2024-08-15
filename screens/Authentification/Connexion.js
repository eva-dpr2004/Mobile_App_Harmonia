import React from 'react';
import { ConnexionContainer, ImgConnexion } from '../../styles/FormulairesStyle';
import ConnexionForm from '../../components/Authentification/ConnexionForm';

function Connexion({ navigation }) {
  return (
    <ConnexionContainer>
      <ImgConnexion source={require('../../assets/img/Vecteurs/connexion.png')} />
      <ConnexionForm navigation={navigation} />
    </ConnexionContainer>
  );
}

export default Connexion;
