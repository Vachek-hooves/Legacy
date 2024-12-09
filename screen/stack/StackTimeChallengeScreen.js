import React, {useState, useEffect, useRef} from 'react';
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
import QuizLayout from '../../components/layout/QuizLayout';

const GAME_DURATION = 30; 

const StackTimeChallengeScreen = ({navigation}) => {
  const {getRandomQuestion, updateHighScore, saveQuizResult} = useAppContext();
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [isGameOver, setIsGameOver] = useState(false);
  const timerRef = useRef(null);
  const scoreRef = useRef(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    const initGame = () => {
      const question = getRandomQuestion([]);
      setCurrentQuestion(question);
      setUsedQuestionIds([question.id]);
      setScore(0);
      setTimeLeft(GAME_DURATION);
      setIsGameOver(false);
    };

    initGame();
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
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
    if (isGameOver) return;
    setIsGameOver(true);

    try {
      const finalScore = scoreRef.current;
      console.log('Final Score:', finalScore);

      await saveQuizResult('timeChallenge', finalScore, GAME_DURATION);
      await updateHighScore('timeChallenge', finalScore);

      navigation.replace('StackQuizResults', {
        mode: 'timeChallenge',
        score: finalScore,
        message: "Time's up! Your score:",
      });
    } catch (error) {
      console.error('Error in handleGameOver:', error);
    }
  };

  const handleAnswer = async selectedAnswer => {
    if (isGameOver) return;

    if (selectedAnswer === currentQuestion.answer) {
      setScore(prevScore => {
        const newScore = prevScore + 1;
        scoreRef.current = newScore;
        return newScore;
      });
    }
    getNextQuestion();
  };

  const getNextQuestion = () => {
    const question = getRandomQuestion(usedQuestionIds);

    if (!question) {
      const newQuestion = getRandomQuestion([]);
      setUsedQuestionIds([newQuestion.id]);
      setCurrentQuestion(newQuestion);
    } else {
      setCurrentQuestion(question);
      setUsedQuestionIds(prev => [...prev, question.id]);
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

  if (!currentQuestion) return null;

  return (
    <QuizLayout>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.timer}>Time: {timeLeft}s</Text>
          <Text style={styles.score}>Score: {score}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View
            style={[styles.questionContainer, {opacity: fadeAnim}]}>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleAnswer(option)}>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </QuizLayout>
  );
};

export default StackTimeChallengeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: '#1A1A1A',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginHorizontal: 20,
    marginTop: 50,
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
    marginHorizontal: 20,
    marginTop: 50,
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    color:'black'
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
