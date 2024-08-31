import React from 'react';
import { ConnexionContainer} from '../../styles/FormulairesStyle';
import ConnexionForm from '../../components/Authentification/ConnexionForm';
import TabNavigator from '../../components/Basics/TabNavigator';

function Connexion({ navigation }) {
  return (
    <ConnexionContainer>
      <ConnexionForm navigation={navigation} />
      <TabNavigator/>
    </ConnexionContainer>
  );
}

export default Connexion;
