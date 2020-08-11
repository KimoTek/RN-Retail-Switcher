import React, {useRef, useState, useLayoutEffect} from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';
Icon.loadFont();

import {Dimensions} from 'react-native';

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

const StyledText = styled.Text`
  text-align: center;
  line-height: 40px;
  color: #fff;
`;

const StyledButton = styled(Button)`
  border-radius: 2px;
  background-color: transparent;
  width: 100%;
  border: 1px solid white;
`;

const HeaderText = styled.Text`
  text-align: center;
  line-height: 40;
`;

const StyledAnimatableView = styled(Animatable.View)`
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

const StyledSafeArea = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

function SettingsTab({navigation}) {
  const [viewVisible, setStoreSwitcherVisibility] = useState(false);
  const [invertCaret, setInvertCaret] = useState(false);
  const [store, setStore] = useState('Kroger');
  const view = useRef(null);

  const bounce = async () => {
    if (viewVisible) {
      setInvertCaret(false);
      view?.current?.fadeOutUp(800).then(() => {
        setStoreSwitcherVisibility(false);
      });
    } else {
      await setStoreSwitcherVisibility(true);
      setInvertCaret(true);
      view?.current?.fadeInDown(800).then((/* endState */) => {});
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
      headerTitle: () => (
        <Button onPress={bounce}>
          <HeaderText>{`${store} ${!invertCaret ? '▼' : '▲'}`}</HeaderText>
        </Button>
      ),
    });
  }, [navigation, store, viewVisible, invertCaret]);

  const stores = [
    'Amazon Fresh',
    'Whole Foods',
    'Kroger',
    'Walmart..',
    'Instacart',
  ];

  return (
    <StyledSafeArea>
      <Container
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: 'white',
        }}>
        <Text>This is the shopping list content section....</Text>
        {viewVisible && (
          <StyledAnimatableView
            animation={viewVisible ? 'fadeInDown' : 'fadeOutUp'}
            easing="ease-out"
            ref={view}
            viewVisible={viewVisible}>
            {stores.map((store) => (
              <StyledButton
                key={store}
                onPress={() => {
                  setStore(store);
                  // setStoreSwitcherVisibility(false);
                  setInvertCaret(!invertCaret);
                  bounce();
                }}>
                <StyledText>{store}</StyledText>
              </StyledButton>
            ))}
          </StyledAnimatableView>
        )}
      </Container>
    </StyledSafeArea>
  );
}

const StackMenu = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Menu" component={SettingsTab} />
    </Stack.Navigator>
  );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Analytics"
          screenOptions={() => ({
            tabBarIcon: ({color, size}) => {
              // You can return any component that you like here!
              return (
                <Icon
                  name={'ios-information-circle'}
                  size={size}
                  color={color}
                />
              );
            },
          })}>
          <Tab.Screen name="One Tab" component={StackMenu} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
