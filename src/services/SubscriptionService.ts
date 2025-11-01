import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subscription } from '../types';

const SUBSCRIPTIONS_STORAGE_KEY = '@subscriptions';

export class SubscriptionService {
  static async getAllSubscriptions(): Promise<Subscription[]> {
    try {
      const data = await AsyncStorage.getItem(SUBSCRIPTIONS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting subscriptions:', error);
      return [];
    }
  }

  static async addSubscription(subscription: Omit<Subscription, 'id'>): Promise<Subscription> {
    try {
      const subscriptions = await this.getAllSubscriptions();
      const newSubscription = {
        ...subscription,
        id: Date.now().toString(), // Simple ID generation
      };
      
      await AsyncStorage.setItem(
        SUBSCRIPTIONS_STORAGE_KEY,
        JSON.stringify([...subscriptions, newSubscription])
      );
      
      return newSubscription;
    } catch (error) {
      console.error('Error adding subscription:', error);
      throw error;
    }
  }

  static async updateSubscription(subscription: Subscription): Promise<void> {
    try {
      const subscriptions = await this.getAllSubscriptions();
      const updatedSubscriptions = subscriptions.map(sub => 
        sub.id === subscription.id ? subscription : sub
      );
      
      await AsyncStorage.setItem(
        SUBSCRIPTIONS_STORAGE_KEY,
        JSON.stringify(updatedSubscriptions)
      );
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  }

  static async deleteSubscription(id: string): Promise<void> {
    try {
      const subscriptions = await this.getAllSubscriptions();
      const filteredSubscriptions = subscriptions.filter(sub => sub.id !== id);
      
      await AsyncStorage.setItem(
        SUBSCRIPTIONS_STORAGE_KEY,
        JSON.stringify(filteredSubscriptions)
      );
    } catch (error) {
      console.error('Error deleting subscription:', error);
      throw error;
    }
  }

  static async getSubscriptionById(id: string): Promise<Subscription | null> {
    try {
      const subscriptions = await this.getAllSubscriptions();
      return subscriptions.find(sub => sub.id === id) || null;
    } catch (error) {
      console.error('Error getting subscription:', error);
      return null;
    }
  }
}
