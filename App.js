import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StatusBar, View, Dimensions, SafeAreaView } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import 'react-native-gesture-handler';
import AppBottomTabCustomer from './src/components/AppBottomTabCustomer';
import AppBottomTabTradesmen from './src/components/AppBottomTabTradesmen';
import Loader from './src/components/Loader';
import Chat from './src/screens/Chat';
import ChooseSignUpType from './src/screens/ChooseSignUpType';
import Job from './src/screens/Job';
import JobListing from './src/screens/JobListing';
import Login from './src/screens/Login';
import Main from './src/screens/Main';
import Messages from './src/screens/Messages';
import MessagesUser from './src/screens/MessagesUser';
import MyJobs from './src/screens/MyJobs';
import MyProfile from './src/screens/MyProfile';
import MyProfileUser from './src/screens/MyProfileUser';
import PostJob from './src/screens/PostJob';
import Search from './src/screens/Search';
import SearchCategory from './src/screens/SearchCategory';
import SearchUser from './src/screens/SearchUser';
import SignUp from './src/screens/SignUp';
import TradesMenSignUp from './src/screens/TradesMenSignUp';
import Workers from './src/screens/Workers';
import ProfileTradesman from './src/screens/ProfileTradesman';
import Settings from './src/screens/Settings';
import Feedback from './src/screens/Feedback';
import WorkersMapView from './src/screens/WorkersMapView';
import SendJob from './src/screens/SendJob';
import colors from './src/components/colors';
import AsyncStorage from '@react-native-community/async-storage';
import PostedJobs from './src/screens/PostedJobs';
import EditProfile from './src/screens/EditProfile';
import ManageBank from './src/screens/ManageBank';
import ManageCard from './src/screens/ManageCard';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [loading, setLoading] = useState(false)
  
  // AsyncStorage.clear()

  EventRegister.addEventListener('rootLoader', (value) => {
    setLoading(value)
  })
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.default }}>

      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#00b5bf" />
        <Stack.Navigator headerMode="none" initialRouteName="Main">

          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ChooseSignUpType" component={ChooseSignUpType} />
          <Stack.Screen name="TradesMenSignUp" component={TradesMenSignUp} />
          <Stack.Screen name="AppBottomNavTradesmen" component={AppBottomNavTradesmen} />
          <Stack.Screen name="AppBottomNavCustomer" component={AppBottomNavCustomer} />
          <Stack.Screen name="JobListing" component={JobListing} />
          <Stack.Screen name="Job" component={Job} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="ProfileTradesman" component={ProfileTradesman} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="MapView" component={WorkersMapView} />
          <Stack.Screen name="SendJob" component={SendJob} />
          <Stack.Screen name="PostedJobs" component={PostedJobs} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ManageBank" component={ManageBank} />
          <Stack.Screen name="ManageCard" component={ManageCard} />

        </Stack.Navigator>
      </NavigationContainer>
      <Loader visible={loading} />
    </SafeAreaView>
  );


  function AppBottomNavTradesmen() {

    const [loading, setLoading] = useState(false)

    EventRegister.addEventListener('loader', (value) => {
      setLoading(value)
    })

    return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          backBehavior='initialRoute'
          initialRouteName={"Search"}
          tabBar={props => <AppBottomTabTradesmen {...props} />}>

          <Tab.Screen name="Search" component={SearchNavigatorTradesmen} />
          <Tab.Screen name="MyJobs" component={MyJobs} options={{ title: 'My Jobs' }} />
          <Tab.Screen name="Messages" component={Messages} />
          <Tab.Screen name="MyProfile" component={MyProfile} options={{ title: 'My Profile' }} />

        </Tab.Navigator>
        <Loader visible={loading} />

      </View>
    )
  }

  function SearchNavigatorTradesmen() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="SearchCategory" component={SearchCategory} />
        <Stack.Screen name="Workers" component={Workers} />
      </Stack.Navigator>
    )
  }

  function AppBottomNavCustomer() {

    const [loading, setLoading] = useState(false)

    EventRegister.addEventListener('loader', (value) => {
      setLoading(value)
    })

    return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          backBehavior='initialRoute'
          initialRouteName={"Search"}
          tabBar={props => <AppBottomTabCustomer {...props} />}>

          <Tab.Screen name="Search" component={SearchNavigatorUser} />
          <Tab.Screen name="PostJob" component={PostJob} options={{ title: 'Post a job' }} />
          <Tab.Screen name="Messages" component={MessagesUser} />
          <Tab.Screen name="MyProfile" component={MyProfileUser} options={{ title: 'My Profile' }} />

        </Tab.Navigator>
        <Loader visible={loading} />
      </View>
    )
  }

  function SearchNavigatorUser() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Search" component={SearchUser} />
        <Stack.Screen name="SearchCategory" component={SearchCategory} />
        <Stack.Screen name="Workers" component={Workers} />
      </Stack.Navigator>
    )
  }

}