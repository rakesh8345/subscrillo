import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import SubscriptionForm from '../components/SubscriptionForm';
import { SubscriptionService } from '../services/SubscriptionService';
import { Subscription } from '../types';
import tw from 'twrnc';

type EditSubscriptionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditSubscription'>;
type EditSubscriptionRouteProp = RouteProp<RootStackParamList, 'EditSubscription'>;

const EditSubscriptionScreen = ({ 
  route,
  navigation 
}: { 
  route: EditSubscriptionRouteProp;
  navigation: EditSubscriptionNavigationProp;
}) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const sub = await SubscriptionService.getSubscriptionById(route.params.id);
      setSubscription(sub);
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 bg-black justify-center items-center`}>
        <ActivityIndicator size="large" color="#ff00ff" />
      </View>
    );
  }

  if (!subscription) {
    navigation.goBack();
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <SubscriptionForm
        subscription={subscription}
        onSave={() => {
          navigation.goBack();
        }}
        onCancel={() => navigation.goBack()}
      />
    </View>
  );
};

export default EditSubscriptionScreen;
