import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { RootStackParamList } from '../navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PaymentCancelScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={tw`flex-1 bg-[#121212] justify-center items-center p-4`}>
      <View style={tw`w-20 h-20 bg-[#ef444420] rounded-full items-center justify-center mb-6`}>
        <Ionicons name="close-circle" size={50} color="#ef4444" />
      </View>
      <Text style={tw`text-white text-2xl font-bold mb-2 text-center`}>
        Payment Cancelled
      </Text>
      <Text style={tw`text-gray-400 text-center mb-8`}>
        No charges were made. You can try again anytime when you're ready.
      </Text>
      <TouchableOpacity
        style={tw`bg-[#2e95ff] rounded-xl py-3 px-6`}
        onPress={() => navigation.navigate('Premium')}
      >
        <Text style={tw`text-white font-bold text-lg`}>Try Again</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`mt-4`}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={tw`text-gray-400`}>Return to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentCancelScreen;
