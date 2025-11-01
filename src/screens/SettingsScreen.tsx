import React, { useState, useEffect } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { UserSettings } from '../types';
import { SubscriptionService } from '../services/SubscriptionService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [settings, setSettings] = useState<UserSettings>({
    preferredCurrency: 'USD',
    notificationDays: [1, 3, 7],
    theme: 'dark',
    soundEnabled: true,
  });

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];
  const notificationOptions = [
    { days: 1, label: '1 day before' },
    { days: 3, label: '3 days before' },
    { days: 7, label: '7 days before' },
    { days: 14, label: '14 days before' },
  ];

  const toggleNotificationDay = (days: number) => {
    setSettings(prev => ({
      ...prev,
      notificationDays: prev.notificationDays.includes(days)
        ? prev.notificationDays.filter(d => d !== days)
        : [...prev.notificationDays, days].sort((a, b) => a - b),
    }));
  };

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  const toggleSound = () => {
    setSettings(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  return (
    <ScrollView style={tw`bg-[#121212]`}>
      <View style={tw`p-4`}>
        <View style={tw`mb-6`}>
          <Text style={tw`text-white text-xl font-bold mb-2`}>Application Settings</Text>
          <Text style={tw`text-gray-400`}>Customize your app experience</Text>
        </View>

        {/* Currency Selection */}
        <View style={tw`bg-gray-900 rounded-xl p-4 mb-4`}>
          <View style={tw`flex-row items-center mb-4`}>
            <View style={tw`w-10 h-10 bg-[#2e95ff20] rounded-full items-center justify-center mr-3`}>
              <Ionicons name="cash-outline" size={20} color="#2e95ff" />
            </View>
            <Text style={tw`text-white text-lg font-medium`}>Preferred Currency</Text>
          </View>
          <View style={tw`flex-row flex-wrap`}>
            {currencies.map(currency => (
              <TouchableOpacity
                key={currency}
                onPress={() => setSettings(prev => ({ ...prev, preferredCurrency: currency }))}
                style={[
                  tw`rounded-lg px-4 py-2 m-1`,
                  currency === settings.preferredCurrency
                    ? tw`bg-[#2e95ff]`
                    : tw`bg-gray-800`
                ]}
              >
                <Text
                  style={[
                    tw`text-white`,
                    currency === settings.preferredCurrency && tw`font-bold`
                  ]}
                >
                  {currency}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notification Settings */}
        <View style={tw`bg-gray-900 rounded-xl p-4 mb-4`}>
          <View style={tw`flex-row items-center mb-4`}>
            <View style={tw`w-10 h-10 bg-[#10b98120] rounded-full items-center justify-center mr-3`}>
              <Ionicons name="notifications-outline" size={20} color="#10b981" />
            </View>
            <Text style={tw`text-white text-lg font-medium`}>Renewal Notifications</Text>
          </View>
          {notificationOptions.map(({ days, label }) => (
            <TouchableOpacity
              key={days}
              onPress={() => toggleNotificationDay(days)}
              style={tw`flex-row items-center justify-between py-3 border-b border-gray-800`}
            >
              <Text style={tw`text-white`}>{label}</Text>
              <View
                style={[
                  tw`w-6 h-6 rounded-full items-center justify-center`,
                  settings.notificationDays.includes(days) ? tw`bg-[#10b981]` : tw`border-2 border-gray-600`
                ]}
              >
                {settings.notificationDays.includes(days) && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Theme and Sound Settings */}
        <View style={tw`bg-gray-900 rounded-xl p-4 mb-4`}>
          <View style={tw`flex-row items-center mb-4`}>
            <View style={tw`w-10 h-10 bg-[#8b5cf620] rounded-full items-center justify-center mr-3`}>
              <Ionicons name="settings-outline" size={20} color="#8b5cf6" />
            </View>
            <Text style={tw`text-white text-lg font-medium`}>App Preferences</Text>
          </View>
          <View style={tw`flex-row items-center justify-between py-3 border-b border-gray-800`}>
            <View>
              <Text style={tw`text-white font-medium`}>Dark Theme</Text>
              <Text style={tw`text-gray-400 text-sm`}>Use dark color scheme</Text>
            </View>
            <Switch
              value={settings.theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#444', true: '#2e95ff' }}
              thumbColor={settings.theme === 'dark' ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={tw`flex-row items-center justify-between py-3`}>
            <View>
              <Text style={tw`text-white font-medium`}>Sound Effects</Text>
              <Text style={tw`text-gray-400 text-sm`}>Play sounds on actions</Text>
            </View>
            <Switch
              value={settings.soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: '#444', true: '#2e95ff' }}
              thumbColor={settings.soundEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Data Management */}
        <View style={tw`bg-gray-900 rounded-xl p-4 mb-4`}>
          <View style={tw`flex-row items-center mb-4`}>
            <View style={tw`w-10 h-10 bg-[#ef444420] rounded-full items-center justify-center mr-3`}>
              <Ionicons name="server-outline" size={20} color="#ef4444" />
            </View>
            <Text style={tw`text-white text-lg font-medium`}>Data Management</Text>
          </View>
          
          <TouchableOpacity
            style={tw`flex-row items-center py-3 border-b border-gray-800`}
            onPress={async () => {
              try {
                const subs = await SubscriptionService.getAllSubscriptions();
                Alert.alert(
                  'Stored Subscriptions',
                  JSON.stringify(subs, null, 2),
                  [{ text: 'OK' }]
                );
              } catch (error) {
                Alert.alert('Error', 'Failed to load subscriptions');
              }
            }}
          >
            <Ionicons name="document-text-outline" size={20} color="#2e95ff" style={tw`mr-3`} />
            <Text style={tw`text-white`}>View Stored Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center py-3 border-b border-gray-800`}
            onPress={async () => {
              try {
                const allKeys = await AsyncStorage.getAllKeys();
                const allData: Record<string, string | null> = {};
                for (const key of allKeys) {
                  const data = await AsyncStorage.getItem(key);
                  allData[key] = data;
                }
                await Share.share({
                  message: JSON.stringify(allData, null, 2),
                  title: 'Subscription Tracker Data'
                });
              } catch (error) {
                Alert.alert('Error', 'Failed to export data');
              }
            }}
          >
            <Ionicons name="share-outline" size={20} color="#10b981" style={tw`mr-3`} />
            <Text style={tw`text-white`}>Export All Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center py-3`}
            onPress={() => {
              Alert.alert(
                'Clear All Data',
                'Are you sure? This will delete all stored data.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                      try {
                        await AsyncStorage.clear();
                        Alert.alert('Success', 'All data has been cleared');
                      } catch (error) {
                        Alert.alert('Error', 'Failed to clear data');
                      }
                    },
                  },
                ]
              );
            }}
          >
            <Ionicons name="trash-outline" size={20} color="#ef4444" style={tw`mr-3`} />
            <Text style={tw`text-white`}>Clear All Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
