import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import {useAppContext} from '../../store/context';

const GAME_DURATION = 90; // 90 seconds

const StackTimeChallengeScreen = ({navigation}) => {
  const {getRandomQuestion, updateHighScore, saveQuizResult} = useAppContext();
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(1));
  const timerRef = useRef(null);

  useEffect(() => {
    getNextQuestion();
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleGameOver = async () => {
    await saveQuizResult('timeChallenge', score, GAME_DURATION);
    await updateHighScore('timeChallenge', score);
    navigation.replace('StackQuizResults', {
      mode: 'timeChallenge',
      score: score,
      message: 'Time\'s up! Your score:',
    });
  };

  const getNextQuestion = () => {
    const question = getRandomQuestion(usedQuestionIds);
    
    // If we run out of questions, reset the used questions array
    if (!question) {
        setUsedQuestionIds([]);
        setCurrentQuestion(getRandomQuestion([]));
    } else {
        setCurrentQuestion(question);
        setUsedQuestionIds([...usedQuestionIds, question.id]);
    }
    
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

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
    getNextQuestion();
  };

  if (!currentQuestion) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timer}>Time: {timeLeft}s</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

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
    </SafeAreaView>
  );
};

export default StackTimeChallengeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4444',
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