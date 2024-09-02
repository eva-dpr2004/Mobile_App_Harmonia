import styled from 'styled-components/native';
import { Animated } from 'react-native';

// Composants pour le formulaire d'inscription
export const Connexion = styled.View`
  margin-bottom: 2%;
`;

export const Inscription = styled.View`
  margin-bottom: 2%;
`;

export const ModificationAnimal = styled.View`
  margin-bottom: 2%;
`;

export const FormContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const FormBox = styled.View`
  background-color: rgba(224, 235, 248, 0.62);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const FormLink = styled.Text`
  text-align:center;
  margin-bottom: 2%;
  color: #0066cc;
  text-decoration: underline;
`;

export const Title = styled.Text`
  margin-top: 5%;
  margin-bottom: 12px;
  color: #193356;
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
  text-align: center;
`;

export const InscriptionTitle = styled(Title)`
  margin-top: 3%;
  margin-bottom: 15px;
`;

export const StyledForm = styled.View`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.TextInput`
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
`;

export const Label = styled.Text`
  color: #193356;
  margin-top: 8px;
  font-size: 14px;
  text-align: left;
`;

export const Terms = styled.View`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const TermsInput = styled.Switch``;

export const TermsLabel = styled(Label)`
  font-size: 12px;
`;

export const TermsLink = styled.Text`
  color: #0066cc;
  text-decoration: none;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 30px;
  text-align: center;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 9px;
  text-align: left;
  margin-bottom: 8px;
`;

// Images styles (adaptés à React Native)
export const ImgConnexion = styled.Image`
  width: 15%;
  height: 50px;
  position: absolute;
  left: 15%;
  top: 20%;
`;

export const ImgModifierProfil = styled(ImgConnexion)`
  width: 14%;
  right: 20%;
  top: 18%;
`;

export const ImgSupprimerProfil = styled(ImgConnexion)`
  width: 20%;
  left: 15%;
  top: 20%;
`;

export const ImgAvisGlobal = styled(ImgConnexion)`
  transform: scaleX(-1);
  width: 25%;
  left: 3%;
  top: 25%;
`;

export const ImgImprevu = styled(ImgConnexion)`
  width: 20%;
  right: 12%;
  top: 25%;
`;

// Besoin d'aide styles
export const BesoinAideForm = styled.View`
  background-color: white;
  margin-top: 3%;
  margin-bottom: 3%;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 30%;
`;

export const BesoinAideContainer = styled.View`
  p {
    margin-top: 2%;
    margin-bottom: 2%;
    color: #183255;
  }
`;

export const AvisGlobalForm = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
  margin: 40px auto;

  h1,
  p {
    text-align: center;
    color: #183255;
  }

  details {
    width: 85%;
    background-color: white;
    margin-top: 2%;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  summary {
    font-size: 16px;
    color: #183255;
    cursor: pointer;
    outline: none;

    &::marker {
      display: none;
    }
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
  }

  button {
    width: 35%;
    padding: 6px 10px;
    background-color: #183255;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 4%;

    &:hover {
      background-color: #0f1c2d;
    }
  }

  span {
    display: flex;
    justify-content: center;
    font-size: 12px;
  }
`;

export const IconLabel = styled.View`
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #183255;

  .icon {
    margin-bottom: 2%;
    color: #183255;
  }
`;

export const SweepAnimation = styled(Animated.View)`
  opacity: 0;
  transform: translateY(-10px);
  animation: sweep 0.5s ease-in-out forwards;

  @keyframes sweep {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;