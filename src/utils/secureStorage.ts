
import { AES, enc } from 'crypto-js';

// Secret key for encryption - in a real production app, this would come from environment variables
// or a secure secret management system
const ENCRYPTION_KEY = 'neuch-secure-storage-key-12345';

// Check if the storage API is available
const isStorageAvailable = (type: string): boolean => {
  try {
    const storage = window[type as 'localStorage' | 'sessionStorage'];
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Function to securely encrypt data before storing
const encryptData = (data: string): string => {
  try {
    return AES.encrypt(data, ENCRYPTION_KEY).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

// Function to decrypt stored data
const decryptData = (encryptedData: string): string => {
  try {
    const bytes = AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

// Function to securely store sensitive data
export const secureStore = async (key: string, value: string): Promise<void> => {
  if (!key || !value) {
    throw new Error('Key and value are required for secure storage');
  }

  try {
    if (!isStorageAvailable('localStorage')) {
      throw new Error('Local storage is not available');
    }

    // Encrypt the data before storing
    const encryptedValue = encryptData(value);
    localStorage.setItem(`secure_${key}`, encryptedValue);

    // Audit log - in a real app, this might go to a secure logging service
    console.info(`Data securely stored with key: secure_${key}`);
  } catch (error) {
    console.error('Error storing data securely:', error);
    throw new Error('Failed to store data securely');
  }
};

// Function to retrieve securely stored data
export const secureRetrieve = async (key: string): Promise<string | null> => {
  if (!key) {
    throw new Error('Key is required to retrieve data');
  }

  try {
    if (!isStorageAvailable('localStorage')) {
      throw new Error('Local storage is not available');
    }

    const encryptedValue = localStorage.getItem(`secure_${key}`);
    if (!encryptedValue) return null;

    // Decrypt the stored data
    return decryptData(encryptedValue);
  } catch (error) {
    console.error('Error retrieving data securely:', error);
    // Rather than exposing the error, return null for security
    return null;
  }
};

// Function to remove securely stored data
export const secureRemove = async (key: string): Promise<void> => {
  if (!key) {
    throw new Error('Key is required to remove data');
  }

  try {
    if (!isStorageAvailable('localStorage')) {
      throw new Error('Local storage is not available');
    }

    localStorage.removeItem(`secure_${key}`);
    
    // Audit log - in a real app, this might go to a secure logging service
    console.info(`Data securely removed with key: secure_${key}`);
  } catch (error) {
    console.error('Error removing secure data:', error);
    throw new Error('Failed to remove secure data');
  }
};

// Function to clear all securely stored data
export const secureClearAll = async (): Promise<void> => {
  try {
    if (!isStorageAvailable('localStorage')) {
      throw new Error('Local storage is not available');
    }

    // Only clear keys that start with "secure_"
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('secure_')) {
        localStorage.removeItem(key);
      }
    });
    
    // Audit log - in a real app, this might go to a secure logging service
    console.info('All secure data cleared');
  } catch (error) {
    console.error('Error clearing secure data:', error);
    throw new Error('Failed to clear secure data');
  }
};

// Add a function to validate session integrity
export const validateSessionIntegrity = async (): Promise<boolean> => {
  try {
    const sessionToken = await secureRetrieve('session_token');
    const userId = await secureRetrieve('user_id');
    const lastActivity = await secureRetrieve('last_activity');
    
    // Basic session validation
    if (!sessionToken || !userId || !lastActivity) {
      return false;
    }
    
    // Check for session timeout (30 minutes)
    const lastActivityTime = parseInt(lastActivity);
    const currentTime = Date.now();
    if (currentTime - lastActivityTime > 30 * 60 * 1000) {
      await secureClearAll(); // Clear expired session
      return false;
    }
    
    // Update last activity time
    await secureStore('last_activity', currentTime.toString());
    return true;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
};
