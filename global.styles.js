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

export {Container, screenWidth, screenHeight};
