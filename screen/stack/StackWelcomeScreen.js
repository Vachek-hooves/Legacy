import {StyleSheet, Text, View, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const StackWelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>StackWelcomeScreen</Text>

      <LottieView
        // source={require('../../assets/animation/TigerHello.json')}
        source={require('../../assets/animation/TigerJungle.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

export default StackWelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'flex-end',
  },

  lottie: {
    width: '100%',
    height: height * 0.65,
    bottom: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
