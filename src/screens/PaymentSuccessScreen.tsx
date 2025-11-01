import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { RootStackParamList } from '../navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PaymentSuccessScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={tw`flex-1 bg-[#121212] justify-center items-center p-4`}>
      <View style={tw`w-20 h-20 bg-[#10b98120] rounded-full items-center justify-center mb-6`}>
        <Ionicons name="checkmark-circle" size={50} color="#10b981" />
      </View>
      <Text style={tw`text-white text-2xl font-bold mb-2 text-center`}>
        Payment Successful!
      </Text>
      <Text style={tw`text-gray-400 text-center mb-8`}>
        Thank you for upgrading to Premium. Your new features are now unlocked!
      </Text>
      <TouchableOpacity
        style={tw`bg-[#2e95ff] rounded-xl py-3 px-6`}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={tw`text-white font-bold text-lg`}>Continue to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSuccessScreen;
