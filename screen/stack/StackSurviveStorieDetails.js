import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TigerSurvive } from '../../data/survive';

const StackSurviveStorieDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { storyId } = route.params;

  const story = TigerSurvive.find(s=>s.id===storyId);


  if (!story) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Story not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.focus}>Focus: {story.focus}</Text>
        <Text style={styles.location}>Location: {story.location}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Challenges</Text>
          {story.challenges.map((challenge, index) => (
            <Text key={index} style={styles.listItem}>- {challenge}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conservation Efforts</Text>
          {story.conservationEfforts.map((effort, index) => (
            <Text key={index} style={styles.listItem}>- {effort}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Outcomes</Text>
          <Text style={styles.outcomes}>{story.outcomes}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Story</Text>
          <Text style={styles.content}>{story.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  focus: {
    fontSize: 18,
    color: '#FF8C00',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#FF8C00',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4444',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  outcomes: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#FF4444',
    textAlign: 'center',
    marginTop: 50,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#FF4444',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default StackSurviveStorieDetails;