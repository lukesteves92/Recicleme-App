import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  SafeAreaView,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function SchedulePickupScreen({ navigation }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const mockLocations = [
    'Ponto A - Rua Exemplo, 123',
    'Ponto B - Av. Modelo, 456',
    'Ponto C - Praça Central, 789',
  ];

  useEffect(() => {
    requestPermission();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setImage(photo.uri);
      setShowCamera(false);
    }
  };

  const handleCall = () => {
    Linking.openURL('tel:+5532984678637');
  };

  const selectLocation = (location) => {
    setSelectedLocation(location);
    setModalVisible(false);
  };

  if (!permission?.granted) {
    return <Text>Permissão da câmera negada.</Text>;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F26C28" />
        </TouchableOpacity>
        <Text style={styles.title}>Agendamento</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.deliveryTitle}>Realiza coletas a domicílio</Text>
        <Text style={styles.deliveryInfo}>
          Latas e garrafas de vidro <Text style={styles.underline}>a partir de 10kg</Text>
        </Text>

        {showCamera ? (
          <Camera style={styles.camera} ref={setCameraRef}>
            <View style={styles.cameraOverlay}>
              <TouchableOpacity style={styles.agendarBtn} onPress={takePhoto}>
                <Text style={styles.agendarText}>Capturar</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <>
            {image && (
              <View style={styles.previewCard}>
                <Image source={{ uri: image }} style={styles.preview} />
              </View>
            )}
            <TouchableOpacity style={[styles.agendarBtn, { marginBottom: 16 }]} onPress={() => setShowCamera(true)}>
              <Text style={styles.agendarText}>Tirar Foto do Lixo</Text>
            </TouchableOpacity>
          </>
        )}

        {/* SELETOR DE PONTO DE COLETA */}
        <TouchableOpacity style={styles.cardPicker} onPress={() => setModalVisible(true)}>
          <Text style={{ color: selectedLocation ? '#2d2d2d' : '#aaa' }}>
            {selectedLocation || 'Selecione o ponto de coleta'}
          </Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={mockLocations}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem} onPress={() => selectLocation(item)}>
                    <Text style={styles.modalText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
                <Text style={styles.modalCloseText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.agendarBtn}>
            <Text style={styles.agendarText}>Agendar coleta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ligarBtn} onPress={handleCall}>
            <Text style={styles.ligarText}>Ligar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 32 : 0,
  },
  content: {
    padding: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2d2d2d',
  },
  deliveryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },
  deliveryInfo: {
    fontSize: 14,
    marginBottom: 16,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  camera: {
    width: '100%',
    height: 350,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'transparent',
  },
  previewCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  preview: {
    width: '100%',
    height: 240,
  },
  cardPicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#F9F9F9',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  agendarBtn: {
    backgroundColor: '#F26C28',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  agendarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ligarBtn: {
    borderWidth: 1,
    borderColor: '#BDD63C',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  ligarText: {
    color: '#BDD63C',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalText: {
    fontSize: 16,
    color: '#2d2d2d',
  },
  modalClose: {
    marginTop: 16,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#F26C28',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
