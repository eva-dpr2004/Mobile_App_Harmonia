import styled from 'styled-components/native';

export const ConnexionContainer = styled.View`
  margin-bottom: 6%;
`;

export const InscriptionContainer = styled.View`
  margin-bottom: 2%;
`;

export const FormContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const FormBox = styled.View`
  margin-top: 2%;
  background: rgba(224, 235, 248, 0.61);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.Text`
  margin-top: 5%;
  margin-bottom: 1.2rem;
  color: #193356;
  text-decoration: underline;
  font-size: 24px;
  font-weight: bold;
`;

export const FormLink = styled.Text`
  margin-top: 5%;
  margin-bottom: 1.2rem;
  color: #193356;
  text-decoration: underline;
  font-size: 16px;
`;

export const Label = styled.Text`
  color: #193356;
  margin-top: 2%;
  font-size: 14px;
  text-align: left;
`;

export const Input = styled.TextInput`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
`;

export const TermsContainer = styled.View`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  flex-direction: row;
`;

export const TermsLabel = styled.Text`
  font-size: 12px;
`;

export const TermsLink = styled.Text`
  color: #0066cc;
  text-decoration: none;
`;

export const Button = styled.TouchableOpacity`
  padding: 12px;
  background: #003366;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;

export const DisabledButton = styled(Button)`
  background: #819db8;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 9px;
  text-align: left;
  margin-bottom: 2%;
`;

export const ImgConnexion = styled.Image`
  width: 22%;
  position: absolute;
  left: 17%;
  top: 25%;
`;

export const ImgInscription = styled.Image`
  transform: scaleX(-1);
  width: 23%;
  position: absolute;
  right: 15%;
  top: 35%;
`;

export const ImgModifierProfil = styled.Image`
  width: 14%;
  position: absolute;
  right: 20%;
  top: 18%;
`;

export const ImgSupprimerProfil = styled.Image`
  width: 20%;
  position: absolute;
  left: 15%;
  top: 20%;
`;

export const ImgAvisGlobal = styled.Image`
  transform: scaleX(-1);
  width: 25%;
  position: absolute;
  left: 5%;
  top: 25%;
`;

export const ImgImprevu = styled.Image`
  width: 20%;
  position: absolute;
  right: 12%;
  top: 25%;
`;