import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  usePeers,
  useJellyfishClient,
} from '@jellyfish-dev/react-native-client-sdk';
import { InCallButton, VideosGrid } from '@jellyfish-dev/react-native-jellyfish-components';

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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1FAFE',
    paddingVertical: 24,
  },
  videoContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  video: { width: 100, height: 100 },
});

export default RoomScreen;
