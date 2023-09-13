import React from "react";
import { View, StyleSheet, Permission, PermissionsAndroid } from "react-native";
import {
  Button,
  TextInput,
  QRCodeScanner,
} from "@jellyfish-dev/react-native-jellyfish-components";
import { useJellyfishClient, useCamera } from "@jellyfish-dev/react-native-client-sdk";

// This is the address of the Jellyfish backend. Change the local IP to yours. We
// strongly recommend setting this as an environment variable, we hardcoded it here
// for simplicity.
const JELLYFISH_URL = "ws://192.168.81.152:4000/socket/peer/websocket";

const { startCamera } = useCamera();

function ConnectScreen({ navigation }): JSX.Element {
    console.log("Additional line")
//   const [peerToken, setPeerToken] = useState<string>("");
  const peerToken = ""

  const { connect, join } = useJellyfishClient();

  const grantedCameraPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA as Permission
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.error("Camera permission denied");
      return false;
    }
    return true;
  };


  const connectToRoom = async () => {
    try {
      await connect(JELLYFISH_URL, peerToken.trim());

      if (!(await grantedCameraPermissions())) {
        return;
      }
      await startCamera();

      await join({ name: "Mobile RN Client" });
      navigation.navigate("Room");
    } catch (e) {
      console.log("Error while connecting", e);
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter peer token"
        value={peerToken}
        onChangeText={() => {}}
      />
      <Button onPress={connectToRoom} title="Connect" disabled={!peerToken} />

      <QRCodeScanner onCodeScanned={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#BFE7F8",
    padding: 24,
    rowGap: 24,
  },
});

export default ConnectScreen;