import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { publicRoutes } from './routes/routes';

const Stack = createNativeStackNavigator();

function App() {

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