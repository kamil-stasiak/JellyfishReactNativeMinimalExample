import React from "react";
import { JellyfishContextProvider } from "@jellyfish-dev/react-native-client-sdk";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConnectScreen from "./screens/Connect";
import RoomScreen from "./screens/Room";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <JellyfishContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Connect" component={ConnectScreen} />
          <Stack.Screen name="Room" component={RoomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </JellyfishContextProvider>
  );
}

export default App;