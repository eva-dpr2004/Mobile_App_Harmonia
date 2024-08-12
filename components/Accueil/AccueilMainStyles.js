import styled from 'styled-components/native';

export const AccueilContainer = styled.View`
  font-family: Arial, sans-serif;
  padding: 40px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`;

export const MainContent = styled.View`
  max-width: 910px;
  margin: 0 auto;
`;

export const MainTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 6%;
  color: #333;
`;

export const ImagesRow = styled.View`
  margin-top: 5%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
`;

export const ImageContainer = styled.View`
  flex: 0 1 calc(50% - 20px);
  box-sizing: border-box;
  position: absolute;
  width: 50%;
`;

export const ImageContainer1 = styled(ImageContainer)`
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  margin-left: 2%;
`;

export const ImageContainer2 = styled(ImageContainer)`
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  margin-left: 38%;
  margin-top: 10%;
`;

export const ImageContainer3 = styled(ImageContainer)`
  margin-right: 20%;
  top: 80vh;
  z-index: 2;
  margin-top: 10%;
`;

export const ImageContainer4 = styled(ImageContainer)`
  margin-left: 52%;
  top: 65vh;
  z-index: 1;
  margin-top: 10%;
`;

export const Image = styled.Image`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #171717;
  margin-bottom: 20px;
  clear: both;
  position: relative;
  top: 2%;
  z-index: 4;
  width: 78vh;
  left: 50%;
`;

export const Description2 = styled.Text`
  font-size: 16px;
  color: #171717;
  margin-bottom: 20px;
  clear: both;
  position: relative;
  top: 80vh;
  z-index: 4;
  width: 78vh;
  right: 8%;
`;

export const StartButton = styled.TouchableOpacity`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #bedeff;
  color: #193356;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 140vh;
  margin-left: 80vh;
`;

export const StartButtonText = styled.Text`
  color: #193356;
  font-size: 16px;
`;

export const Hidden = styled.View`
  visibility: hidden;
  height: 0;
  margin-top: 5px;
  padding: 0;
`;
