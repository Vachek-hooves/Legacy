import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView} from 'react-native';

const TabQuizScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.mainTitle}>Tiger Quiz Challenge</Text>
        <Text style={styles.subtitle}>Test your knowledge about tigers</Text>

        <TouchableOpacity 
          style={styles.challengeCard}
          onPress={() => navigation.navigate('StackTimeChallengeScreen')}
        >
          <View style={[styles.cardOverlay, styles.timeOverlay]}>
            <Text style={styles.cardTitle}>Time Challenge</Text>
            <Text style={styles.timerText}>30</Text>
            <Text style={styles.cardDescription}>
              Race against time! Answer as many questions as you can in 30 seconds
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.challengeCard, styles.deathCard]}
          onPress={() => navigation.navigate('StackFirstDeath')}
        >
          <View style={[styles.cardOverlay, styles.deathOverlay]}>
            <Text style={styles.cardTitle}>Survival Mode</Text>
            <Text style={styles.heartText}>❤️</Text>
            <Text style={styles.cardDescription}>
              One life, one chance! How far can you go without making a mistake?
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TabQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF8C00',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#FFA500',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.8
  },
  challengeCard: {
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FF6B6B',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deathCard: {
    backgroundColor: '#4A90E2',
  },
  cardOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  timeOverlay: {
    backgroundColor: 'rgba(255, 107, 107, 0.85)',
  },
  deathOverlay: {
    backgroundColor: 'rgba(74, 144, 226, 0.85)',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  heartText: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: 20,
  }
});