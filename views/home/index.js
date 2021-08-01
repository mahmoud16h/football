import {Text, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import PendingTeams from '../../components/pendingTeams';
import PendingMatches from '../../components/pendingMatches';
import { NodeCameraView } from "react-native-nodemediaclient";

import Refresh from '../../components/Refresh';
const { width, height } = Dimensions.get("window");

const Home = () => {
  const config = {
    cameraConfig: {
      cameraId: 1,
      cameraFrontMirror: false
    },
    videoConfig: {
      preset: 4,
      bitrate: 2000000,
      profile: 2,
      fps: 30,
      videoFrontMirror: true,
    },
    audioConfig: {
      bitrate: 128000,
      profile: 1,
      samplerate: 44100,
    }
  };
  const cameraViewRef = React.useRef(null);
  const streamKey = 'f28461dc-ba23-9af8-50c7-09cb34cfca96';
  const url = `rtmps://global-live.mux.com:443/app/${streamKey}`;

  return (
  <ScrollView style={{flex: 1}} refreshControl={<Refresh/>}>
    {/*<PendingTeams />*/}
    {/*<PendingMatches />*/}
    <NodeCameraView
      style={{width, height}}
      ref={cameraViewRef}
      outputUrl={url}
      camera={config.cameraConfig}
      audio={config.audioConfig}
      video={config.videoConfig}
      autopreview={true}
    />
  </ScrollView>
)};

export default Home