/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import {Container, ButtonText, Button} from './global.styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import Swipeable from 'react-native-swipeable';
import styled from 'styled-components/native';
// import Header from './src/components/HeaderDropdown';
import AppleStyleSwipeableRow from './src/components/Swipeable/swipeable';
Icon.loadFont();

function Home({navigation}) {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#6a51ae'}]}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Text style={{color: '#fff'}}>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Details')}>
        <ButtonText>Next Screen</ButtonText>
      </Button>
    </SafeAreaView>
  );
}

function Details({navigation}) {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#ecf0f1'}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Container>
        <Text>Details Screen</Text>
        {/* <Button onPress={() => navigation.navigate('WithTabs')}>
          <ButtonText>Next Screen</ButtonText>
        </Button> */}
      </Container>
    </SafeAreaView>
  );
}

const MyLoaderV3 = (props) => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={70}
    viewBox="0 0 400 70"
    backgroundColor="#999999"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
    {...props}>
    <Rect x="3%" y="16" rx="6" ry="6" width="70%" height="15" />
    <Rect x="3%" y="36" rx="6" ry="6" width="70%" height="15" />
    <Rect x="3%" y="55" rx="6" ry="6" width="70%" height="15" />
    <Circle cx="83%" cy="42" r="27" />
  </ContentLoader>
);

let maps = [1, 2, 3, 4, 5];

function AnalyticsTab() {
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <Text>Analytics Tab</Text>
      {maps.map((item) => (
        <MyLoaderV3 key={item} />
      ))}
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
}

const leftContent = <Text>Pull to activate</Text>;

const rightButtons = [
  <TouchableHighlight>
    <Text>Button 1</Text>
  </TouchableHighlight>,
  <TouchableHighlight>
    <Text>Button 2</Text>
  </TouchableHighlight>,
];

function MyListItem() {
  return (
    <Swipeable leftContent={leftContent} rightButtons={rightButtons}>
      <Text>My swipeable content</Text>
    </Swipeable>
  );
}

import * as Animatable from 'react-native-animatable';

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
      view?.current?.fadeInDown(800).then((endState) => {});
    }
  };

  /* React.useEffect(() => {
    console.log('Calling here...', viewVisible);
    if (view?.current) {
      if (viewVisible) {
        view.current.fadeOutUp(800).then(() => {
          // setStoreSwitcherVisibility(false);
          console.log('Visibility viewVisible>>', viewVisible);
        });
      } else {
        // setStoreSwitcherVisibility(true);
        view.current.fadeInDown(800).then((endState) => {
          console.log('Visibility viewVisible', viewVisible);
        });
      }
    }
  }, [viewVisible]); */

  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
      headerTitle: () => (
        <Button onPress={bounce}>
          <Text style={{textAlign: 'center', lineHeight: 40}}>{`${store} ${
            !invertCaret ? '▼' : '▲'
          }`}</Text>
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
    <SafeAreaView
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <Container
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: 'white',
        }}>
        <Text>This is the shopping list section....</Text>
        <AppleStyleSwipeableRow />
        {viewVisible && (
          <Animatable.View
            animation={viewVisible ? 'fadeInDown' : 'fadeOutUp'}
            easing="ease-out"
            ref={view}
            style={{
              position: 'absolute',
              top: 0,
              height: viewVisible ? '100%' : 0,
              width: viewVisible ? '100%' : 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderBottomColor: 'red',
              borderBottomWidth: 1,
              borderTopColor: 'red',
              borderTopWidth: 1,
              backgroundColor: '#6C7A89',
              opacity: 1,
            }}>
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
          </Animatable.View>
        )}
      </Container>
    </SafeAreaView>
  );
}

const StackMenu = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={SettingsTab}
        /* options={({route}) => ({
          headerTitle: () => {
            console.log('StackMenu -> route', route);
            return (
              <StyledButton
                onPress={() => {
                  route.params?.toggleStores();
                  // route.params.toggleStores();
                }}>
                <StyledText>Title</StyledText>
              </StyledButton>
            );
          },
        })} */
      />
    </Stack.Navigator>
  );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StyledView = styled(Animatable.View)`
  width: 100%;
  position: absolute;
  top: 0;
  height: 50%;
  border: 1px solid black;
  background-color: white;
`;

function HomeTabs({navigation, route}) {
  console.log('HomeTabs -> route', route);
  console.log('HomeTabs -> navigation', navigation);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'KROGER',
    });
  }, [navigation, route]);

  return (
    <Tab.Navigator
      initialRouteName="Analytics" /*tabBar={() => null}*/
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Analytics') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'list-outline' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        pNav: navigation,
      })}>
      <Tab.Screen name="Analytics" component={StackMenu} />
      <Tab.Screen name="Settings" component={StackMenu} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'My home',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Details"
            options={{
              headerTitle: () => <Text>Details</Text>,
              headerBackTitleVisible: false,
              headerRight: () => <Text>Right</Text>,
            }}
            component={Details}
          />
          <Stack.Screen name="WithTabs">
            {(props) => (
              <HomeTabs navigation={props.navigation} route={props.route} />
            )}
          </Stack.Screen>
        </Stack.Navigator> */}

        <Tab.Navigator
          initialRouteName="Analytics" /*tabBar={() => null}*/
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Analytics') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'list-outline' : 'ios-list';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}>
          <Tab.Screen name="Analytics" component={StackMenu} />
          <Tab.Screen name="Settings" component={Home} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
