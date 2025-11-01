import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export interface DashboardCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon, 
  color 
}) => (
  <View style={tw`bg-gray-900 rounded-xl p-4 mb-4`}>
    <View style={tw`flex-row justify-between items-start`}>
      <View>
        <Text style={tw`text-gray-400 text-sm mb-1`}>{title}</Text>
        <Text style={tw`text-white text-2xl font-bold`}>{value}</Text>
        {subtitle && (
          <Text style={tw`text-gray-400 text-xs mt-1`}>{subtitle}</Text>
        )}
        {trend !== undefined && (
          <View style={tw`flex-row items-center mt-2`}>
            <Ionicons
              name={trend >= 0 ? 'arrow-up' : 'arrow-down'}
              size={16}
              color={trend >= 0 ? '#10b981' : '#ef4444'}
            />
            <Text
              style={[
                tw`ml-1`,
                { color: trend >= 0 ? '#10b981' : '#ef4444' }
              ]}
            >
              {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </View>
      <View
        style={[
          tw`rounded-full p-3`,
          { backgroundColor: color + '20' } // Add transparency
        ]}
      >
        <Ionicons name={icon} size={24} color={color} />
      </View>
    </View>
  </View>
);
