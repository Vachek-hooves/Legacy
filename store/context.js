import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TigerQuiz} from '../data/quiz';

export const AppContext = createContext({});

export const AppContextProvider = ({children}) => {
  const [highScores, setHighScores] = useState({
    timeChallenge: 0,
    survival: 0,
  });
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);

  // Load saved data on app start
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedHighScores = await AsyncStorage.getItem('highScores');
      const savedHistory = await AsyncStorage.getItem('quizHistory');
      
      if (savedHighScores) setHighScores(JSON.parse(savedHighScores));
      if (savedHistory) setQuizHistory(JSON.parse(savedHistory));
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const getRandomQuestion = (excludeIds = []) => {
    const availableQuestions = TigerQuiz.filter(q => !excludeIds.includes(q.id));
    if (availableQuestions.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  };

  const updateHighScore = async (mode, score) => {
    try {
      const newHighScores = {
        ...highScores,
        [mode]: Math.max(highScores[mode], score)
      };
      setHighScores(newHighScores);
      await AsyncStorage.setItem('highScores', JSON.stringify(newHighScores));
    } catch (error) {
      console.error('Error saving high score:', error);
    }
  };

  const saveQuizResult = async (mode, score, duration) => {
    try {
      const newResult = {
        mode,
        score,
        duration,
        date: new Date().toISOString(),
      };
      const updatedHistory = [newResult, ...quizHistory].slice(0, 10); // Keep last 10 results
      setQuizHistory(updatedHistory);
      await AsyncStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  const value = {
    highScores,
    quizHistory,
    getRandomQuestion,
    updateHighScore,
    saveQuizResult,
    currentQuiz,
    setCurrentQuiz,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
