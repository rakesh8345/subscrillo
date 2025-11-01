import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import { Subscription } from '../types';
import { SubscriptionService } from '../services/SubscriptionService';
import moment from 'moment';

type SubscriptionFormProps = {
  subscription?: Subscription;
  onSave: () => void;
  onCancel: () => void;
};

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  subscription,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(subscription?.name || '');
  const [cost, setCost] = useState(subscription?.cost.toString() || '');
  const [currency, setCurrency] = useState(subscription?.currency || 'USD');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    subscription?.billingCycle || 'monthly'
  );
  const [category, setCategory] = useState(subscription?.category || '');
  const [startDate, setStartDate] = useState(subscription?.startDate || moment().format('YYYY-MM-DD'));
  const [notes, setNotes] = useState(subscription?.notes || '');

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return false;
    }
    if (!cost.trim() || isNaN(Number(cost))) {
      Alert.alert('Error', 'Valid cost is required');
      return false;
    }
    if (!category.trim()) {
      Alert.alert('Error', 'Category is required');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const subscriptionData = {
      id: subscription?.id || '',
      name: name.trim(),
      cost: Number(cost),
      currency,
      billingCycle,
      category: category.trim(),
      startDate,
      renewalDate: moment(startDate)
        .add(billingCycle === 'monthly' ? 1 : 12, billingCycle === 'monthly' ? 'months' : 'years')
        .format('YYYY-MM-DD'),
      notes: notes.trim(),
    };

    try {
      if (subscription) {
        await SubscriptionService.updateSubscription(subscriptionData);
      } else {
        await SubscriptionService.addSubscription(subscriptionData);
      }
      onSave();
    } catch (error) {
      Alert.alert('Error', 'Failed to save subscription');
    }
  };

  return (
    <ScrollView style={tw`bg-black p-4`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-pink-500 text-lg mb-2`}>Name</Text>
        <TextInput
          style={tw`bg-gray-900 text-white p-3 rounded-lg`}
          value={name}
          onChangeText={setName}
          placeholder="Subscription name"
          placeholderTextColor="#666"
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-pink-500 text-lg mb-2`}>Cost</Text>
        <TextInput
          style={tw`bg-gray-900 text-white p-3 rounded-lg`}
          value={cost}
          onChangeText={setCost}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor="#666"
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-pink-500 text-lg mb-2`}>Currency</Text>
        <View style={tw`flex-row flex-wrap`}>
          {['USD', 'EUR', 'GBP'].map((curr) => (
            <TouchableOpacity
              key={curr}
              onPress={() => setCurrency(curr)}
              style={[
                tw`rounded-full px-4 py-2 m-1`,
                currency === curr ? tw`bg-pink-500` : tw`bg-gray-800`,
              ]}
            >
              <Text style={tw`text-white`}>{curr}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-pink-500 text-lg mb-2`}>Billing Cycle</Text>
        <View style={tw`flex-row`}>
          <TouchableOpacity
            onPress={() => setBillingCycle('monthly')}
            style={[
              tw`rounded-full px-4 py-2 m-1`,
              billingCycle === 'monthly' ? tw`bg-pink-500` : tw`bg-gray-800`,
            ]}
          >
            <Text style={tw`text-white`}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setBillingCycle('yearly')}
            style={[
              tw`rounded-full px-4 py-2 m-1`,
              billingCycle === 'yearly' ? tw`bg-pink-500` : tw`bg-gray-800`,
            ]}
          >
            <Text style={tw`text-white`}>Yearly</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-pink-500 text-lg mb-2`}>Category</Text>
        <TextInput
          style={tw`bg-gray-900 text-white p-3 rounded-lg`}
          value={category}
          onChangeText={setCategory}
          placeholder="Category"
          placeholderTextColor="#666"
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-pink-500 text-lg mb-2`}>Start Date</Text>
        <TextInput
          style={tw`bg-gray-900 text-white p-3 rounded-lg`}
          value={startDate}
          onChangeText={setStartDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#666"
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-pink-500 text-lg mb-2`}>Notes</Text>
        <TextInput
          style={tw`bg-gray-900 text-white p-3 rounded-lg h-24`}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add notes..."
          placeholderTextColor="#666"
          multiline
        />
      </View>

      <View style={tw`flex-row justify-between mt-4`}>
        <TouchableOpacity
          onPress={onCancel}
          style={tw`bg-gray-800 px-6 py-3 rounded-lg flex-1 mr-2`}
        >
          <Text style={tw`text-white text-center`}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          style={tw`bg-pink-500 px-6 py-3 rounded-lg flex-1 ml-2`}
        >
          <Text style={tw`text-white text-center font-bold`}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SubscriptionForm;
