import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
// icons from https://icons.expo.fyi/

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Training from "../screens/Training";
import About from "../screens/About";
import ResearchArticles from "../screens/ResearchArticles"
import FAQs from "../screens/FAQs";
import UserRatingScreen from "../screens/UserRatingScreen";
import ExerciseRatingScreen from "../screens/ExerciseRatingScreen";
import WebViewScreen from "../screens/WebViewScreen";
import nonExerciseWebviewScreen from "../screens/nonExerciseWebviewScreen";
import TrainingCompleted from "../screens/TrainingCompleted";
import TrainingRelective from "../screens/TrainingReflective";
import TrainingToDo from "../screens/TrainingToDo";
import DownloadableGuides from "../screens/DownloadableGuides";

// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Elements}

        options={{
          gestureEnabled: false,
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function TrainingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Training"
        component={Training}
        options={{
          gestureEnabled: false,
          header: ({ navigation, scene }) => (
            <Header title="Training" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen name="tabStack" component={bottomNavitgationStack}></Stack.Screen>
    </Stack.Navigator>
  );
}
function TrainingCompletedStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="TrainingCompleted"
        component={TrainingCompleted}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Completed Modules " navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen name="tabStack" component={bottomNavitgationStack}></Stack.Screen>
    </Stack.Navigator>
  );
}
function TrainingToDoStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="TrainingToDo"
        component={TrainingToDo}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Modules To Do" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen name="tabStack" component={bottomNavitgationStack}></Stack.Screen>
    </Stack.Navigator>
  );
}
function TrainingReflectiveStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="TrainingReflective"
        component={TrainingReflective}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Reflective Training" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen name="tabStack" component={bottomNavitgationStack}></Stack.Screen>
    </Stack.Navigator>
  );
}

function ResearchArticleStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="ResearchArticles"
        component={ResearchArticles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Research Articles" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen name="tabStack" component={bottomNavitgationStack}></Stack.Screen>
    </Stack.Navigator>
  );
}

function FAQStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="FAQs"
        component={FAQs}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="FAQs" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function StarRatingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="StarRating"
        component={UserRatingScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Star Rating" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function ExerciseRatingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Exercise Rating"
        component={ExerciseRatingScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Exercise Rating" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function DownloadableGuidesStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="DownloadableGuides"
        component={DownloadableGuides}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Downloadable Guides" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}


function AboutStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="About"
        component={About}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="About" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen name="tabStack" component={bottomNavitgationStack}></Stack.Screen>
    </Stack.Navigator>
  );
}

// create a stack screen for web browers
function WebViewScreenStack(props) {
  return <Stack.Navigator headerMode="screen">
    <Stack.Screen
      //the id of the web browers screen
      name="WebViewScreen"
      //webViewScreen js file
      component={WebViewScreen}
      options={{
        header: ({ navigation, scene }) => (<Header title="Web" navigation={navigation} scene={scene} />),

      }} />
    <Stack.Screen name="tabStack" component={bottomNavitgationStack}></Stack.Screen>
  </Stack.Navigator>
}

function nonExerciseWebViewScreenStack(props) {
  return <Stack.Navigator headerMode="screen">
    <Stack.Screen
      //the id of the web browers screen
      name="nonExerciseWebviewScreen"
      //webViewScreen js file
      component={nonExerciseWebviewScreen}
      options={{
        header: ({ navigation, scene }) => (<Header title="Article PDF" navigation={navigation} scene={scene} />),

      }} />
    <Stack.Screen name="tabStack" component={bottomNavitgationStack}></Stack.Screen>
  </Stack.Navigator>
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

// create stack screen for the bottom navigation tab 
const bottomNavitgationStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#32325D',
      }}>
      {/*maintain bottom tab nav on all screens*/}


      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          gestureEnabled: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      {/*link to the Articles screen*/}
      <Tab.Screen
        name="TrainingStack"
        component={TrainingStack}
        options={{
          gestureEnabled: false,
          tabBarLabel: 'Exercises',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="weight-lifter"
              color={color}
              size={size}
            />
          ),
        }}
      />
      {/*link to the Articles screen*/}
      <Tab.Screen
        name="AboutStack"
        component={AboutStack}
        options={{
          gestureEnabled: false,
          tabBarLabel: 'About',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="information"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        // link to the profile screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          gestureEnabled: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />

    </Tab.Navigator>

  );
}

export default function OnboardingStack() {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          gestureEnabled: false,
          headerTransparent: true
        }}
      />
      {/*add the webViewScreen and other screen to stack navigator*/}
      <Stack.Screen name="WebViewScreen" component={WebViewScreenStack}></Stack.Screen>
      <Stack.Screen name="ResearchArticles" component={ResearchArticleStack}></Stack.Screen>
      <Stack.Screen name="Account" component={Register} />
      <Stack.Screen name="App" options={{ gestureEnabled: false }} component={DrawerStack}></Stack.Screen>
    </Stack.Navigator>
  );
}

const DrawerStack = () => {
  return (
    <Drawer.Navigator

      edgeWidth={0}
      options={{ gestureEnabled: false }}
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      {/*link to all the screen*/}
      <Drawer.Screen name="tabStack" options={{ gestureEnabled: false }} component={bottomNavitgationStack} />
      <Drawer.Screen name="Profile" options={{ gestureEnabled: false }} component={ProfileStack} />
      <Drawer.Screen name="Elements" options={{ gestureEnabled: false }} component={ElementsStack} />
      <Drawer.Screen name="Training" options={{ gestureEnabled: false }} component={TrainingStack} />
      <Drawer.Screen name="TrainingToDo" options={{ gestureEnabled: false }} component={TrainingToDoStack} />
      <Drawer.Screen name="TrainingCompleted" options={{ gestureEnabled: false }} component={TrainingCompletedStack} />
      <Drawer.Screen name="TrainingReflective" options={{ gestureEnabled: false }} component={TrainingReflectiveStack} />
      <Drawer.Screen name="About" options={{ gestureEnabled: false }} component={AboutStack} />
      <Drawer.Screen name="ResearchArticles" options={{ gestureEnabled: false }} component={ResearchArticleStack} />
      <Drawer.Screen name="StarRating" options={{ gestureEnabled: false }} component={StarRatingStack} />
      <Drawer.Screen name="ExerciseRating" options={{ gestureEnabled: false }} component={ExerciseRatingStack} />
      <Drawer.Screen name="FAQs" options={{ gestureEnabled: false }} component={FAQStack} />
      <Drawer.Screen name="DownloadableGuides" options={{ gestureEnabled: false }} component={DownloadableGuidesStack} />
      <Drawer.Screen name="NonExerciseWebViewScreen" options={{ gestureEnabled: false }} component={nonExerciseWebViewScreenStack} />
      <Drawer.Screen name="WebViewScreen" options={{ gestureEnabled: false }} component={WebViewScreenStack} />
    </Drawer.Navigator>
  );
}

