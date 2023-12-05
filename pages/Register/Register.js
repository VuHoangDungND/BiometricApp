import {  Text, View, StyleSheet } from 'react-native';

function Register() {
    return (
        <View style={styles.container}>
          <Text>Register Screen</Text>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default Register;