import React, { useCallback, useRef, useState } from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
function App(): JSX.Element {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);

  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);

  async function Takephoto() {
    await camera.current.takePhoto();
  }

  if (hasPermission) {
    return (
      <>
        <Camera
          ref={camera}
          photo={true}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          onInitialized={onInitialized}
        />
        <View>
          <Button title="captura" onPress={() => Takephoto()} />
        </View>
      </>
    );
  }

  return (
    <View>
      <Text>No tiene permisos</Text>
    </View>
  );
}

export default App;
