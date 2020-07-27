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
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {Container, Button, ButtonText} from './global.styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ContentLoader, {
  Rect,
  Circle,
  Code,
  Facebook,
} from 'react-content-loader/native';

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
        <Button onPress={() => navigation.navigate('WithTabs')}>
          <ButtonText>Next Screen</ButtonText>
        </Button>
      </Container>
    </SafeAreaView>
  );
}

const MyLoader = (props) => (
  <Code
    speed={2}
    height={100}
    // viewBox="0 0 100% 100"
    style={{borderRightWidth: 10, borderRightColor: 'black'}}
    backgroundColor="#000"
    foregroundColor="#ecebeb"
    {...props}>
    <Rect x="0" y="0" rx="3" ry="3" width="100%" height="6" />
    <Rect x="0" y="10" rx="3" ry="3" width="200" height="6" />
    <Rect x="-1" y="20" rx="3" ry="3" width="178" height="6" />
  </Code>
);

const MyLoaderV2 = () => (
  <Code backgroundColor="#000">
    {/* <Circle cx="30" cy="30" r="30" /> */}
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </Code>
);

const MyCodeLoader = () => (
  <ContentLoader
    backgroundColor="#000"
    width={100}
    height={100}
    viewBox="0 0 10 100"
    style={{width: '100%'}}>
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);

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

function SettingsTab() {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <SkeletonPlaceholder speed={2000}>
        <Container
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          {maps.map((item) => {
            return (
              <View
                style={{flexDirection: 'row', paddingVertical: 10}}
                key={item}>
                <View style={{width: 60, height: 60, borderRadius: 50}} />
                <View style={{marginLeft: 20}}>
                  <View style={{width: 250, height: 20, borderRadius: 4}} />
                  <View
                    style={{
                      marginTop: 6,
                      width: 250,
                      height: 20,
                      borderRadius: 4,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </Container>
      </SkeletonPlaceholder>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator /*headerMode="none"*/>
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
            {() => (
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
                <Tab.Screen name="Analytics" component={AnalyticsTab} />
                <Tab.Screen name="Settings" component={SettingsTab} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
