from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional, Union
import os
import json
from datetime import datetime
import numpy as np
import random

# Create FastAPI instance
app = FastAPI(
    title="KrishiMitra AI Backend",
    description="API for KrishiMitra AI agricultural assistant",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Data models
class ChatRequest(BaseModel):
    message: str
    language: str = "en"

class ChatResponse(BaseModel):
    response: str
    suggestions: List[str] = []

class DiseaseDetectionResult(BaseModel):
    disease: str
    confidence: float
    description: str
    treatment: str

class PriceData(BaseModel):
    id: int
    crop: str
    variety: str
    price: float
    unit: str
    market: str
    state: str
    trend: str
    change: float
    lastUpdated: str

class WeatherData(BaseModel):
    location: str
    current: Dict[str, Union[float, str]]
    forecast: List[Dict[str, Union[float, str]]]

# Predefined responses for chat
PREDEFINED_RESPONSES = {
    "Best fertilizer for wheat?": {
        "en": "For wheat cultivation, a balanced NPK fertilizer (like 20-20-20) is recommended during land preparation. Apply nitrogen-rich fertilizer like urea (46-0-0) during the tillering stage. For optimal results, incorporate organic matter and use soil testing to determine specific needs for your field.",
        "hi": "गेहूं की खेती के लिए, भूमि तैयारी के दौरान संतुलित NPK उर्वरक (जैसे 20-20-20) की सिफारिश की जाती है। टिलरिंग चरण के दौरान यूरिया (46-0-0) जैसे नाइट्रोजन युक्त उर्वरक का प्रयोग करें। सर्वोत्तम परिणामों के लिए, जैविक पदार्थ मिलाएं और अपने खेत की विशिष्ट आवश्यकताओं को निर्धारित करने के लिए मिट्टी परीक्षण का उपयोग करें।"
    },
    "How to treat stem borer?": {
        "en": "To control stem borers in crops: 1) Use pheromone traps to monitor pest populations. 2) Apply neem-based insecticides as they are eco-friendly. 3) For severe infestations, consider systemic insecticides like Chlorantraniliprole or Flubendiamide. 4) Practice crop rotation and maintain field hygiene by removing crop residues after harvesting.",
        "hi": "फसलों में तना छेदक को नियंत्रित करने के लिए: 1) कीट आबादी की निगरानी के लिए फेरोमोन ट्रैप का उपयोग करें। 2) नीम-आधारित कीटनाशकों का प्रयोग करें क्योंकि वे पर्यावरण के अनुकूल हैं। 3) गंभीर संक्रमण के लिए, क्लोरांट्रानिलिप्रोल या फ्लुबेंडिअमाइड जैसे प्रणालीगत कीटनाशकों पर विचार करें। 4) फसल चक्र का अभ्यास करें और फसल कटाई के बाद फसल अवशेषों को हटाकर खेत की स्वच्छता बनाए रखें।"
    },
    "Subsidy for polyhouse?": {
        "en": "The Government of India offers subsidies for polyhouse construction under the National Horticulture Mission. Small and marginal farmers can receive up to 50% subsidy, while other farmers get up to 40%. The maximum subsidy is capped at ₹32,000 per 500 sq.m. Apply through your district horticulture office with land documents, bank statements, and a detailed project report.",
        "hi": "भारत सरकार राष्ट्रीय बागवानी मिशन के तहत पॉलीहाउस निर्माण के लिए सब्सिडी प्रदान करती है। छोटे और सीमांत किसानों को 50% तक सब्सिडी मिल सकती है, जबकि अन्य किसानों को 40% तक मिलती है। अधिकतम सब्सिडी 500 वर्ग मीटर प्रति ₹32,000 तक सीमित है। भूमि दस्तावेजों, बैंक स्टेटमेंट और विस्तृत परियोजना रिपोर्ट के साथ अपने जिला बागवानी कार्यालय के माध्यम से आवेदन करें।"
    }
}

# Mock disease detection data
MOCK_DISEASE_DATA = {
    "default": {
        "disease": "Tomato Late Blight",
        "confidence": 92.7,
        "description": "Late blight is a disease caused by the fungus-like oomycete pathogen Phytophthora infestans. It can cause significant yield losses and primarily affects leaves, stems, and fruits.",
        "treatment": "Apply fungicide containing chlorothalonil or mancozeb every 7-10 days. Remove and destroy infected plant parts. Ensure proper spacing between plants for good air circulation."
    },
    "rice": {
        "disease": "Rice Blast",
        "confidence": 88.3,
        "description": "Rice blast is caused by the fungus Magnaporthe oryzae. It affects all above-ground parts of the rice plant and can cause lesions on leaves, stems, and panicles.",
        "treatment": "Use blast-resistant rice varieties. Apply fungicides like Trifloxystrobin or Azoxystrobin. Maintain proper water management in the field. Avoid excessive nitrogen fertilization."
    },
    "wheat": {
        "disease": "Wheat Rust",
        "confidence": 95.1,
        "description": "Wheat rust is a fungal disease that appears as rusty spots on leaves and stems. The three types are stem rust, leaf rust, and stripe rust, all caused by different Puccinia species.",
        "treatment": "Plant rust-resistant wheat varieties. Apply fungicides like propiconazole or tebuconazole at the early signs of infection. Practice crop rotation to break the disease cycle."
    },
    "potato": {
        "disease": "Potato Early Blight",
        "confidence": 86.5,
        "description": "Early blight is caused by the fungus Alternaria solani. It causes dark, concentric lesions on lower leaves first, then spreads upward on the plant as the disease progresses.",
        "treatment": "Apply fungicides containing chlorothalonil or copper-based products. Maintain adequate plant nutrition, especially potassium. Practice crop rotation with non-host plants."
    }
}

# Mock price data
MOCK_PRICE_DATA = [
    {
        "id": 1,
        "crop": "Tomato",
        "variety": "Local",
        "price": 1850,
        "unit": "quintal",
        "market": "Azadpur",
        "state": "Delhi",
        "trend": "up",
        "change": 5.2,
        "lastUpdated": "2023-12-01"
    },
    {
        "id": 2,
        "crop": "Tomato",
        "variety": "Hybrid",
        "price": 2450,
        "unit": "quintal",
        "market": "Bengaluru",
        "state": "Karnataka",
        "trend": "up",
        "change": 8.7,
        "lastUpdated": "2023-12-01"
    },
    {
        "id": 3,
        "crop": "Potato",
        "variety": "Kufri Jyoti",
        "price": 1250,
        "unit": "quintal",
        "market": "Agra",
        "state": "Uttar Pradesh",
        "trend": "down",
        "change": -3.1,
        "lastUpdated": "2023-12-01"
    },
    {
        "id": 4,
        "crop": "Potato",
        "variety": "Kufri Chandramukhi",
        "price": 1380,
        "unit": "quintal",
        "market": "Jalandhar",
        "state": "Punjab",
        "trend": "stable",
        "change": 0.8,
        "lastUpdated": "2023-12-01"
    },
    {
        "id": 5,
        "crop": "Wheat",
        "variety": "Sharbati",
        "price": 2250,
        "unit": "quintal",
        "market": "Indore",
        "state": "Madhya Pradesh",
        "trend": "up",
        "change": 3.5,
        "lastUpdated": "2023-12-01"
    },
    {
        "id": 6,
        "crop": "Wheat",
        "variety": "Lokwan",
        "price": 2180,
        "unit": "quintal",
        "market": "Karnal",
        "state": "Haryana",
        "trend": "up",
        "change": 2.1,
        "lastUpdated": "2023-12-01"
    },
    {
        "id": 7,
        "crop": "Rice",
        "variety": "Basmati",
        "price": 3800,
        "unit": "quintal",
        "market": "Karnal",
        "state": "Haryana",
        "trend": "up",
        "change": 4.5,
        "lastUpdated": "2023-12-01"
    },
    {
        "id": 8,
        "crop": "Onion",
        "variety": "Red",
        "price": 1650,
        "unit": "quintal",
        "market": "Lasalgaon",
        "state": "Maharashtra",
        "trend": "down",
        "change": -6.2,
        "lastUpdated": "2023-12-01"
    },
    {
        "id": 9,
        "crop": "Tomato",
        "variety": "Local",
        "price": 1780,
        "unit": "quintal",
        "market": "Kolkata",
        "state": "West Bengal",
        "trend": "down",
        "change": -2.8,
        "lastUpdated": "2023-12-01"
    },
    {
        "id": 10,
        "crop": "Potato",
        "variety": "Kufri Pukhraj",
        "price": 1320,
        "unit": "quintal",
        "market": "Patna",
        "state": "Bihar",
        "trend": "stable",
        "change": 0.2,
        "lastUpdated": "2023-12-01"
    }
]

# Mock weather data
def generate_mock_weather(location: str):
    current_temp = round(random.uniform(15, 35), 1)
    current_humidity = round(random.uniform(40, 90), 1)
    current_wind = round(random.uniform(2, 15), 1)
    
    weather_conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Rain", "Thunderstorm", "Clear"]
    current_condition = random.choice(weather_conditions)
    
    forecast = []
    for i in range(5):
        forecast.append({
            "date": (datetime.now().date().replace(day=datetime.now().day + i + 1)).isoformat(),
            "max_temp": round(current_temp + random.uniform(-3, 5), 1),
            "min_temp": round(current_temp - random.uniform(5, 10), 1),
            "humidity": round(random.uniform(40, 90), 1),
            "condition": random.choice(weather_conditions),
            "precipitation_chance": round(random.uniform(0, 100), 1)
        })
    
    return {
        "location": location,
        "current": {
            "temperature": current_temp,
            "humidity": current_humidity,
            "wind_speed": current_wind,
            "condition": current_condition,
            "updated": datetime.now().isoformat()
        },
        "forecast": forecast
    }

# API endpoints
@app.get("/")
async def root():
    return {"message": "Welcome to KrishiMitra AI API"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    message = request.message.lower()
    language = request.language
    
    # Check for predefined responses
    response = None
    for key, responses in PREDEFINED_RESPONSES.items():
        if key.lower() in message:
            response = responses.get(language, responses["en"])
            break
    
    # If no match, use a generic response
    if not response:
        if language == "en":
            response = "I don't have specific information about that query yet. Please ask about wheat fertilizers, stem borer treatment, or polyhouse subsidies for detailed answers."
        else:
            response = "मुझे अभी तक इस प्रश्न के बारे में विशिष्ट जानकारी नहीं है। कृपया विस्तृत उत्तरों के लिए गेहूं के उर्वरकों, तना छेदक उपचार, या पॉलीहाउस सब्सिडी के बारे में पूछें।"
    
    # Generate some follow-up suggestions
    suggestions = [
        "Best fertilizer for wheat?",
        "How to treat stem borer?",
        "Subsidy for polyhouse?"
    ]
    
    return ChatResponse(response=response, suggestions=suggestions)

@app.post("/detect-disease", response_model=DiseaseDetectionResult)
async def detect_disease(file: UploadFile = File(...)):
    # In a real implementation, this would:
    # 1. Save the uploaded image
    # 2. Preprocess it for the model
    # 3. Run inference with the CNN model
    # 4. Return the results
    
    try:
        # Check file extension
        filename = file.filename.lower()
        if not (filename.endswith('.jpg') or filename.endswith('.jpeg') or filename.endswith('.png')):
            raise HTTPException(status_code=400, detail="Invalid file format. Please upload a JPG or PNG image.")
        
        # Simulate model prediction
        # Here we're checking the filename to determine which mock result to return
        mock_result = MOCK_DISEASE_DATA["default"]
        if "rice" in filename:
            mock_result = MOCK_DISEASE_DATA["rice"]
        elif "wheat" in filename:
            mock_result = MOCK_DISEASE_DATA["wheat"]
        elif "potato" in filename:
            mock_result = MOCK_DISEASE_DATA["potato"]
        
        # Add a little random variation to confidence
        mock_result["confidence"] = round(mock_result["confidence"] + random.uniform(-2, 2), 1)
        if mock_result["confidence"] > 100:
            mock_result["confidence"] = 99.9
        
        return DiseaseDetectionResult(**mock_result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.get("/prices", response_model=List[PriceData])
async def get_prices(
    crop: Optional[str] = None,
    state: Optional[str] = None,
    market: Optional[str] = None
):
    filtered_data = MOCK_PRICE_DATA
    
    # Apply filters if provided
    if crop:
        filtered_data = [item for item in filtered_data if item["crop"].lower() == crop.lower()]
    
    if state:
        filtered_data = [item for item in filtered_data if item["state"].lower() == state.lower()]
    
    if market:
        filtered_data = [item for item in filtered_data if item["market"].lower() == market.lower()]
    
    return filtered_data

@app.get("/weather", response_model=WeatherData)
async def get_weather(location: str = "New Delhi"):
    # Generate mock weather data for the requested location
    weather_data = generate_mock_weather(location)
    return weather_data

# Run with: uvicorn app.main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)