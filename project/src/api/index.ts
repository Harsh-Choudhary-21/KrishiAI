import axios from 'axios';

// Define the base URL for API calls
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API interfaces
export interface ChatRequest {
  message: string;
  language: string;
}

export interface ChatResponse {
  response: string;
  suggestions: string[];
}

export interface DiseaseDetectionResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
}

export interface PriceData {
  id: number;
  crop: string;
  variety: string;
  price: number;
  unit: string;
  market: string;
  state: string;
  trend: string;
  change: number;
  lastUpdated: string;
}

export interface WeatherData {
  location: string;
  current: {
    temperature: number;
    humidity: number;
    wind_speed: number;
    condition: string;
    updated: string;
  };
  forecast: Array<{
    date: string;
    max_temp: number;
    min_temp: number;
    humidity: number;
    condition: string;
    precipitation_chance: number;
  }>;
}

// API functions
export const sendChatMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await api.post<ChatResponse>('/chat', request);
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

export const detectDisease = async (imageFile: File): Promise<DiseaseDetectionResult> => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    
    const response = await api.post<DiseaseDetectionResult>('/detect-disease', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error detecting disease:', error);
    throw error;
  }
};

export const getPrices = async (
  filters?: { crop?: string; state?: string; market?: string }
): Promise<PriceData[]> => {
  try {
    const response = await api.get<PriceData[]>('/prices', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
};

export const getWeather = async (location: string): Promise<WeatherData> => {
  try {
    const response = await api.get<WeatherData>('/weather', { params: { location } });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};