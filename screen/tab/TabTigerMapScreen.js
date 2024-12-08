import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { TigerMap } from '../../data/tigerMap';

const TabTigerMapScreen = () => {
  const [selectedSubspecies, setSelectedSubspecies] = useState(null);
  
  const initialRegion = {
    latitude: 23.5937,
    longitude: 102.9629,
    latitudeDelta: 50,
    longitudeDelta: 50,
  };

  const getMarkerColor = (subspecies) => {
    const colors = {
      'Bengal Tiger': '#FF8C00',
      'Siberian Tiger': '#4A90E2',
      'Sumatran Tiger': '#FF6B6B',
      'Indochinese Tiger': '#50C878',
      'Malayan Tiger': '#FFD700',
      'South China Tiger': '#FF4444',
    };
    return colors[subspecies] || '#FF8C00';
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tiger Habitats</Text>
      
      <ScrollView horizontal style={styles.subspeciesScroll}>
        <TouchableOpacity 
          style={[
            styles.filterButton,
            !selectedSubspecies && styles.filterButtonActive
          ]}
          onPress={() => setSelectedSubspecies(null)}
        >
          <Text style={styles.filterText}>All Tigers</Text>
        </TouchableOpacity>
        {TigerMap.map((tiger) => (
          <TouchableOpacity
            key={tiger.subspecies}
            style={[
              styles.filterButton,
              selectedSubspecies === tiger.subspecies && styles.filterButtonActive
            ]}
            onPress={() => setSelectedSubspecies(tiger.subspecies)}
          >
            <Text style={styles.filterText}>{tiger.subspecies}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          {TigerMap.map((tiger) => {
            if (selectedSubspecies && selectedSubspecies !== tiger.subspecies) {
              return null;
            }
            
            return tiger.regions.map((region) => {
              const markers = [];
              
              // Add country marker
              markers.push(
                <Marker
                  key={`${tiger.subspecies}-${region.country}`}
                  coordinate={region.coordinates}
                  pinColor={getMarkerColor(tiger.subspecies)}
                >
                  <Callout>
                    <View style={styles.callout}>
                      <Text style={styles.calloutTitle}>{tiger.subspecies}</Text>
                      <Text style={styles.calloutSubtitle}>{region.country}</Text>
                      <Text style={styles.calloutText}>
                        {tiger.scientificName}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              );

              // Add major sites markers
              if (region.majorSites) {
                region.majorSites.forEach((site) => {
                  markers.push(
                    <Marker
                      key={`${tiger.subspecies}-${site.name}`}
                      coordinate={site.coordinates}
                      pinColor={getMarkerColor(tiger.subspecies)}
                    >
                      <Callout>
                        <View style={styles.callout}>
                          <Text style={styles.calloutTitle}>{site.name}</Text>
                          <Text style={styles.calloutSubtitle}>
                            {tiger.subspecies} habitat
                          </Text>
                        </View>
                      </Callout>
                    </Marker>
                  );
                });
              }

              return markers;
            });
          })}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default TabTigerMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00',
    textAlign: 'center',
    marginVertical: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  subspeciesScroll: {
    maxHeight: 50,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  filterButtonActive: {
    backgroundColor: '#FF8C00',
  },
  filterText: {
    color: '#FFA500',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  map: {
    flex: 1,
  },
  callout: {
    padding: 10,
    minWidth: 150,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  calloutText: {
    fontSize: 12,
    color: '#888',
  },
});