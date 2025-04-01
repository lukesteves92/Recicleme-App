import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen({ navigation }) {
  const mockLocations = [
    {
      id: '1',
      title: 'Ponto A',
      description: 'Rua Exemplo, 123',
      coordinate: { latitude: -23.55052, longitude: -46.633308 },
    },
    {
      id: '2',
      title: 'Ponto B',
      description: 'Av. Modelo, 456',
      coordinate: { latitude: -23.552, longitude: -46.630 },
    },
    {
      id: '3',
      title: 'Ponto C',
      description: 'Praça Central, 789',
      coordinate: { latitude: -23.548, longitude: -46.634 },
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F26C28" />
        </TouchableOpacity>
        <Text style={styles.title}>Ponto de Coleta</Text>
        <View style={{ width: 24 }} />
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {mockLocations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={loc.coordinate}
            title={loc.title}
            description={loc.description}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 32 : 0,
    backgroundColor: '#fff',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },
  map: {
    flex: 1,
  },
});
