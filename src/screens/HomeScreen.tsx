import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { RootStackParamList } from '../navigation';
import { Subscription } from '../types';
import { SubscriptionService } from '../services/SubscriptionService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  const loadSubscriptions = async () => {
    try {
      const subs = await SubscriptionService.getAllSubscriptions();
      setSubscriptions(subs);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Subscription',
      'Are you sure you want to delete this subscription?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await SubscriptionService.deleteSubscription(id);
              await loadSubscriptions();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete subscription');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Subscription }) => (
    <TouchableOpacity
      style={tw`bg-gray-900 p-4 rounded-lg mb-3 mx-4`}
      onPress={() => navigation.navigate('EditSubscription', { id: item.id })}
    >
      <View style={tw`flex-row justify-between items-start`}>
        <View style={tw`flex-1`}>
          <Text style={tw`text-white text-lg font-bold`}>{item.name}</Text>
          <Text style={tw`text-gray-400 mt-1`}>{item.category}</Text>
          <Text style={tw`text-white text-lg mt-2`}>
            {item.currency} {item.cost.toFixed(2)} / {item.billingCycle}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={24} color="#ff00ff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={tw`flex-1 bg-[#121212] justify-center items-center`}>
        <ActivityIndicator size="large" color="#2e95ff" />
      </View>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={tw`flex-1 bg-[#121212]`}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <View style={tw`flex-row justify-between items-center mb-6`}>
            <Text style={tw`text-white text-xl font-bold`}>Your Subscriptions</Text>
            <TouchableOpacity
              style={tw`bg-[#2e95ff] px-4 py-2 rounded-lg flex-row items-center`}
              onPress={() => navigation.navigate('AddSubscription')}
            >
              <Ionicons name="add" size={20} color="white" style={tw`mr-2`} />
              <Text style={tw`text-white font-medium`}>Add New</Text>
            </TouchableOpacity>
          </View>

          {subscriptions.length === 0 ? (
            <View style={tw`bg-gray-900 rounded-xl p-8 items-center justify-center`}>
              <View style={tw`w-16 h-16 bg-[#2e95ff20] rounded-full items-center justify-center mb-4`}>
                <Ionicons name="document-text-outline" size={32} color="#2e95ff" />
              </View>
              <Text style={tw`text-white text-lg font-bold mb-2`}>No Subscriptions Yet</Text>
              <Text style={tw`text-gray-400 text-center`}>
                Add your first subscription to start tracking your expenses!
              </Text>
            </View>
          ) : (
            subscriptions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={tw`bg-gray-900 rounded-xl p-4 mb-4`}
                onPress={() => navigation.navigate('EditSubscription', { id: item.id })}
              >
                <View style={tw`flex-row justify-between items-center`}>
                  <View style={tw`flex-row items-center flex-1`}>
                    <View style={tw`w-12 h-12 bg-[#2e95ff20] rounded-full items-center justify-center mr-4`}>
                      <Ionicons name="card" size={24} color="#2e95ff" />
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-white text-lg font-bold mb-1`}>{item.name}</Text>
                      <Text style={tw`text-gray-400 text-sm`}>{item.category}</Text>
                    </View>
                  </View>
                  <View style={tw`items-end`}>
                    <Text style={tw`text-[#2e95ff] text-lg font-bold`}>
                      {item.currency} {item.cost.toFixed(2)}
                    </Text>
                    <Text style={tw`text-gray-400 text-xs`}>per {item.billingCycle}</Text>
                    <Text style={tw`text-gray-400 text-xs mt-1`}>
                      Next: {formatDate(item.renewalDate)}
                    </Text>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      style={tw`mt-2`}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons name="trash-outline" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
