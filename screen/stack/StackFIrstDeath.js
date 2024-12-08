import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ScrollView,
} from 'react-native';
import {useAppContext} from '../../store/context';

const StackFirstDeath = ({navigation}) => {
  const {getRandomQuestion, updateHighScore, saveQuizResult} = useAppContext();
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    getNextQuestion();
  }, []);

  const getNextQuestion = () => {
    const question = getRandomQuestion(usedQuestionIds);
    setCurrentQuestion(question);
    setUsedQuestionIds([...usedQuestionIds, question.id]);
    
    // Animate question transition
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAnswer = async (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.answer) {
      const newScore = score + 1;
      setScore(newScore);
      await updateHighScore('survival', newScore);
      getNextQuestion();
    } else {
      await saveQuizResult('survival', score, null);
      navigation.replace('StackQuizResults', {
        mode: 'survival',
        score: score,
        message: 'Game Over! You made it to:',
      });
    }
  };

  if (!currentQuestion) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

      <Animated.View style={[styles.questionContainer, {opacity: fadeAnim}]}>
        <Text style={styles.question}>{currentQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
          </ScrollView>
    </SafeAreaView>
  );
};

export default StackFirstDeath;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});