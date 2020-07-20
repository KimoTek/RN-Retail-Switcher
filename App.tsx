/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {Container} from './global.styles';

const StyledScrollView = styled.ScrollView`
  background-color: white;
`;

import {NavigationContainer} from '@react-navigation/native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <StyledScrollView contentInsetAdjustmentBehavior="automatic">
          <Container>
            <Text>React Navigation</Text>
          </Container>
        </StyledScrollView>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
