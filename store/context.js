import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TigerQuiz} from '../data/quiz';

export const AppContext = createContext({});

export const AppContextProvider = ({children}) => {
  const [highScores, setHighScores] = useState({
    timeChallenge: 0,
    survival: 0,
    total: 0,
    unlockedStories: [],
  });
  const [gamesPlayed, setGamesPlayed] = useState({
    timeChallenge: 0,
    survival: 0,
  });
  const [quizHistory, setQuizHistory] = useState([]);

  // Load saved data on app start
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedHighScores = await AsyncStorage.getItem('highScores');
      const savedHistory = await AsyncStorage.getItem('quizHistory');
      const savedGamesPlayed = await AsyncStorage.getItem('gamesPlayed');
      
      if (savedHighScores) setHighScores(JSON.parse(savedHighScores));
      if (savedHistory) setQuizHistory(JSON.parse(savedHistory));
      if (savedGamesPlayed) setGamesPlayed(JSON.parse(savedGamesPlayed));
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

  const incrementGamesPlayed = async (mode) => {
    try {
      const newGamesPlayed = {
        ...gamesPlayed,
        [mode]: gamesPlayed[mode] + 1
      };
      setGamesPlayed(newGamesPlayed);
      await AsyncStorage.setItem('gamesPlayed', JSON.stringify(newGamesPlayed));
    } catch (error) {
      console.error('Error updating games played:', error);
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
      const updatedHistory = [newResult, ...quizHistory].slice(0, 10);
      setQuizHistory(updatedHistory);
      await AsyncStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
      await incrementGamesPlayed(mode);
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  const unlockStory = async (storyId, cost) => {
    try {
      const currentUnlocked = highScores.unlockedStories || [];
      
      if (currentUnlocked.includes(storyId)) {
        return true;
      }

      if (highScores.survival >= cost) {
        const newHighScores = {
          ...highScores,
          survival: highScores.survival - cost,
          unlockedStories: [...currentUnlocked, storyId]
        };
        
        setHighScores(newHighScores);
        await AsyncStorage.setItem('highScores', JSON.stringify(newHighScores));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error unlocking story:', error);
      return false;
    }
  };

  const value = {
    highScores,
    setHighScores,
    quizHistory,
    gamesPlayed,
    unlockStory,
    getRandomQuestion,
    updateHighScore,
    saveQuizResult,
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
