import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';

const screenHeight = Math.round(Dimensions.get('window').height);

export const Container = styled.View`
  background-color: #d2d7d3;
  height: ${screenHeight}px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: #d24d57;
  width: 200px;
  height: 40px;
  border-radius: 30px;
`;

export const StyledText = styled.Text`
  text-align: center;
  line-height: 40px;
  color: #fff;
`;

export const StyledButton = styled(Button)`
  border-radius: 2px;
  background-color: transparent;
  width: 100%;
  border: 1px solid white;
`;

export const HeaderText = styled.Text`
  text-align: center;
  line-height: 40;
`;

export const StyledAnimatableView = styled(Animatable.View)`
  position: absolute;
  top: 0;
  height: ${(props) => (props.viewVisible ? '100%' : 0)};
  width: ${(props) => (props.viewVisible ? '100%' : 0)};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom-color: red;
  border-bottom-width: 1;
  border-top-color: red;
  border-top-width: 1px;
  background-color: #6c7a89;
  opacity: 1;
`;

export const StyledSafeArea = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;
