import React from "react";
import { View, StyleSheet } from "react-native";
import {
  usePeers,
  VideoRendererView,
  useJellyfishClient,
} from "@jellyfish-dev/react-native-client-sdk";
import { VideosGrid } from "@jellyfish-dev/react-native-jellyfish-components";
import { InCallButton } from "@jellyfish-dev/react-native-jellyfish-components";

function RoomScreen({ navigation }): JSX.Element {
  const peers = usePeers();
  const { cleanUp } = useJellyfishClient();

  const onDisconnectPress = () => {
    cleanUp();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <VideosGrid
        tracks={peers.map((peer) => peer.tracks[0]?.id).filter((t) => t)}
      />
       <InCallButton
        type="disconnect"
        iconName="phone-hangup"
        onPress={onDisconnectPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F1FAFE",
    padding: 24,
  },
  videoContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  video: { width: 200, height: 200 },
});

export default RoomScreen;