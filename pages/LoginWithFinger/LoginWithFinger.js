import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

function LoginWithFinger() {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  const checkBiometricAvailability = async () => {
    const hasBiometric = await LocalAuthentication.hasHardwareAsync();
    const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

    setIsBiometricAvailable(hasBiometric && biometricTypes.length > 0);
  };

  const authenticateWithBiometrics = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with Biometrics',
      });

      if (result.success) {
        console.log('Biometric authentication successful');
        // Handle successful authentication
      } else {
        console.log('Biometric authentication failed');
        // Handle authentication failure
      }
    } catch (error) {
      console.error('LocalAuthentication error:', error);
      // Handle error (e.g., user cancels)
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isBiometricAvailable ? (
        <TouchableOpacity onPress={authenticateWithBiometrics}>
          <Text>Touch to Authenticate with Biometrics</Text>
        </TouchableOpacity>
      ) : (
        <Text>Biometric authentication not available on this device</Text>
      )}
    </View>
  );
}

export default LoginWithFinger;