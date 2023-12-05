import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { publicRoutes } from './routes/routes';
import * as faceapi from 'face-api.js';

const Stack = createNativeStackNavigator();

function App() {

  const loadModels = async() => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  }

  loadModels();

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          { publicRoutes.map((route,index) => {
            return (
              <Stack.Screen 
                        key={index}
                        name = {route.name}
                        component={route.component} />
            )
          })}
        </Stack.Navigator>
      </NavigationContainer>
  );
}


export default App;