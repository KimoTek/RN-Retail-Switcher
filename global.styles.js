import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const Container = styled.View`
  background-color: #d2d7d3;
  height: ${screenHeight}px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.TouchableOpacity`
  background-color: #d24d57;
  width: 200px;
  height: 40px;
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  line-height: 40px;
  width: 100%;
  text-align: center;
  color: white;
`;

export {Container, screenWidth, screenHeight, Button, ButtonText};
