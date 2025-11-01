import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import SubscriptionForm from '../components/SubscriptionForm';

type AddSubscriptionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddSubscription'>;

const AddSubscriptionScreen = ({ navigation }: { navigation: AddSubscriptionNavigationProp }) => {
  return (
    <View style={{ flex: 1 }}>
      <SubscriptionForm
        onSave={() => {
          navigation.goBack();
        }}
        onCancel={() => navigation.goBack()}
      />
    </View>
  );
};

export default AddSubscriptionScreen;
