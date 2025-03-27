
import { Capacitor } from '@capacitor/core';

// Function to securely store sensitive data
export const secureStore = async (key: string, value: string): Promise<void> => {
  try {
    // For native mobile apps
    if (Capacitor.isNativePlatform()) {
      // Using localStorage temporarily - in a real app, you should use
      // a secure storage plugin like @capacitor/secure-storage-plugin
      localStorage.setItem(`secure_${key}`, value);
    } else {
      // For web, encrypt before storing
      // This is a simple example; in production use a proper encryption library
      const encodedValue = btoa(value);
      localStorage.setItem(`secure_${key}`, encodedValue);
    }
  } catch (error) {
    console.error('Error storing data securely:', error);
    throw new Error('Failed to store data securely');
  }
};

// Function to retrieve securely stored data
export const secureRetrieve = async (key: string): Promise<string | null> => {
  try {
    // For native mobile apps
    if (Capacitor.isNativePlatform()) {
      return localStorage.getItem(`secure_${key}`);
    } else {
      // For web, decrypt after retrieving
      const value = localStorage.getItem(`secure_${key}`);
      if (!value) return null;
      return atob(value);
    }
  } catch (error) {
    console.error('Error retrieving data securely:', error);
    return null;
  }
};

// Function to remove securely stored data
export const secureRemove = async (key: string): Promise<void> => {
  try {
    localStorage.removeItem(`secure_${key}`);
  } catch (error) {
    console.error('Error removing secure data:', error);
    throw new Error('Failed to remove secure data');
  }
};

// Function to clear all securely stored data
export const secureClearAll = async (): Promise<void> => {
  try {
    // Only clear keys that start with "secure_"
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('secure_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing secure data:', error);
    throw new Error('Failed to clear secure data');
  }
};
