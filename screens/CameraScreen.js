import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraComponent() {
    const [hasPermission, setHasPermission] = useState(null);
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        const getPermission = async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getPermission();
    }, []);

    if (hasPermission === null) {
        return <Text>Solicitando permissão...</Text>;
    }

    if (hasPermission === false) {
        return <Text>Sem permissão para acessar a câmera</Text>;
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photoData = await cameraRef.current.takePictureAsync();
            setPhoto(photoData.uri);
        }
    };

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <Button title="Capturar Foto" onPress={takePicture} color="#fff" />
                </View>
            </Camera>
            {photo && <Image source={{ uri: photo }} style={styles.photo} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        width: '100%',
        height: '60%',
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
    },
    photo: {
        width: 200,
        height: 200,
        marginTop: 10,
    },
});
