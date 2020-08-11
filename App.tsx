import React, {useRef, useState, useLayoutEffect} from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

import {
  Container,
  Button,
  StyledText,
  StyledButton,
  HeaderText,
  StyledAnimatableView,
  StyledSafeArea,
} from './styles';

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
