import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { MaterialIcons } from '@expo/vector-icons';

function LoginWithFinger({navigation}) {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      const hasBiometric = await LocalAuthentication.hasHardwareAsync();
      const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      setIsBiometricAvailable(hasBiometric && biometricTypes.length > 0);
    })();
 
  },[]); 

  const authenticateWithBiometrics = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Xác thực vân tay',
      });

      if (result.success) {
        // trường hợp thành công
        alert('Xác thực vân tay thành công');
      } else {
        // trường hợp thất bại
        alert('Xác thực vân tay thất bại');
      }
    } catch (error) {
      // trường hợp lỗi : người dùng hủy bỏ
      alert('Lỗi xác thực:', error);
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isBiometricAvailable ? (
        <TouchableOpacity onPress={authenticateWithBiometrics}>
          <MaterialIcons
            name='fingerprint'
            size={200}
          />
          <Text>Chạm để xác thực vân tay</Text>
        </TouchableOpacity>
      ) : (
        <Text>Thiết bị không hỗ trợ vân tay</Text>
      )}
    </View>
  );
}

export default LoginWithFinger;