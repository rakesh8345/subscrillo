import React, { useMemo, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subscription } from '../types';
import { DashboardCard } from '../components/DashboardCard';
import { SubscriptionService } from '../services/SubscriptionService';

// Mock data - later we'll replace with real data
type TimeRange = 'weekly' | 'monthly' | 'yearly';

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    cost: 15.99,
    currency: 'USD',
    billingCycle: 'monthly',
    category: 'Streaming',
    startDate: '2025-01-01',
    renewalDate: '2025-08-01',
  },
  {
    id: '2',
    name: 'Spotify',
    cost: 9.99,
    currency: 'USD',
    billingCycle: 'monthly',
    category: 'Music',
    startDate: '2025-02-01',
    renewalDate: '2025-08-01',
  },
];

const DashboardScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  React.useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    setLoading(true);
    try {
      const subs = await SubscriptionService.getAllSubscriptions();
      setSubscriptions(subs);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
      // If there's an error, use mock data for now
      setSubscriptions(mockSubscriptions);
    } finally {
      setLoading(false);
    }
  };

  const { monthlyTotal, categoryData, chartData } = useMemo(() => {
    const total = subscriptions.reduce((acc, sub) => acc + sub.cost, 0);
    
    // Calculate category data
    const categoryMap = new Map<string, number>();
    subscriptions.forEach(sub => {
      const current = categoryMap.get(sub.category) || 0;
      categoryMap.set(sub.category, current + sub.cost);
    });

    const colors = ['#2e95ff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    let colorIndex = 0;

    const pieData = Array.from(categoryMap.entries()).map(([name, cost]) => ({
      name,
      cost,
      color: colors[colorIndex++ % colors.length],
      legendFontColor: '#fff',
      legendFontSize: 12,
    }));

    // Calculate chart data (using mock historical data for now)
    const barData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        data: [
          total * 0.9,
          total * 1.1,
          total * 0.95,
          total,
          total * 1.05,
          total * 1.15,
        ]
      }]
    };

    return {
      monthlyTotal: total,
      categoryData: pieData,
      chartData: barData,
    };
  }, [subscriptions]);

  const chartConfig = {
    backgroundGradientFrom: '#1a1a1a',
    backgroundGradientTo: '#1a1a1a',
    color: (opacity = 1) => `rgba(46, 149, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
  };

  if (loading) {
    return (
      <View style={tw`flex-1 bg-black justify-center items-center`}>
        <ActivityIndicator size="large" color="#2e95ff" />
      </View>
    );
  }

  return (
    <ScrollView style={tw`bg-[#121212] flex-1`}>
      <View style={tw`p-4`}>
        {/* Time Range Selector */}
        <View style={tw`flex-row justify-between mb-6 bg-gray-900 rounded-xl p-1`}>
          {(['weekly', 'monthly', 'yearly'] as const).map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                tw`flex-1 py-2 px-4 rounded-lg`,
                timeRange === range && tw`bg-[#2e95ff]`,
              ]}
              onPress={() => setTimeRange(range)}
            >
              <Text
                style={[
                  tw`text-center text-white text-sm`,
                  timeRange === range && tw`font-bold`,
                ]}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Overview Cards */}
        <View style={tw`flex-row flex-wrap justify-between`}>
          <View style={tw`w-full`}>
            <DashboardCard
              title="Total Subscriptions"
              value={`$${monthlyTotal.toFixed(2)}`}
              subtitle="This month"
              trend={5.2}
              icon="card"
              color="#2e95ff"
            />
          </View>
          <View style={tw`w-full`}>
            <DashboardCard
              title="Active Subscriptions"
              value={subscriptions.length.toString()}
              trend={2.1}
              icon="apps"
              color="#10b981"
            />
          </View>
        </View>

        {/* Main Chart */}
        <View style={tw`bg-gray-900 rounded-xl p-4 mb-4`}>
          <Text style={tw`text-white text-lg font-bold mb-4`}>Spending Overview</Text>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                data: [
                  monthlyTotal * 0.9,
                  monthlyTotal * 1.1,
                  monthlyTotal * 0.95,
                  monthlyTotal,
                  monthlyTotal * 1.05,
                  monthlyTotal * 1.15,
                ],
              }],
            }}
            width={screenWidth - 48}
            height={220}
            chartConfig={{
              ...chartConfig,
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#2e95ff',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Category Distribution */}
        <View style={tw`bg-gray-900 rounded-xl p-4 mb-4`}>
          <Text style={tw`text-white text-lg font-bold mb-4`}>Category Distribution</Text>
          <PieChart
            data={categoryData.map(item => ({
              ...item,
              color: item.color,
            }))}
            width={screenWidth - 48}
            height={200}
            chartConfig={chartConfig}
            accessor="cost"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {/* Recent Activity */}
        <View style={tw`bg-gray-900 rounded-xl p-4 mb-4`}>
          <Text style={tw`text-white text-lg font-bold mb-4`}>Recent Activity</Text>
          {subscriptions.slice(0, 3).map((sub) => (
            <View
              key={sub.id}
              style={tw`flex-row justify-between items-center py-3 border-b border-gray-800`}
            >
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-10 h-10 bg-[#2e95ff20] rounded-full items-center justify-center mr-3`}>
                  <Ionicons name="card" size={20} color="#2e95ff" />
                </View>
                <View>
                  <Text style={tw`text-white font-medium`}>{sub.name}</Text>
                  <Text style={tw`text-gray-400 text-sm`}>{sub.category}</Text>
                </View>
              </View>
              <Text style={tw`text-white font-bold`}>
                ${sub.cost.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
