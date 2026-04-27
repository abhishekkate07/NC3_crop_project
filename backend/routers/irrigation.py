from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

class IrrigationRequest(BaseModel):
    crop_type: str
    soil_moisture: float # Percentage 0-100
    temperature: float # Celsius

class IrrigationResponse(BaseModel):
    action: str
    water_needed: str
    rationale: str

@router.post("/irrigation", response_model=IrrigationResponse)
def predict_irrigation(request: IrrigationRequest):
    """
    Predicts optimal irrigation needs based on soil moisture and weather.
    """
    
    # Simple ML substitute / rule-engine prediction:
    if request.soil_moisture < 30.0:
        action = "IRRIGATE IMMEDIATELY"
        water_needed = f"Apply ~2 liters per square meter for {request.crop_type}."
        rationale = f"Soil moisture is critically low ({request.soil_moisture}%). Temperature is {request.temperature}°C causing faster evaporation."
    elif 30.0 <= request.soil_moisture <= 60.0:
        if request.temperature > 30.0:
            action = "SCHEDULE IRRIGATION"
            water_needed = "1 liter per square meter later in the evening."
            rationale = "Moisture is moderate, but high temps will dry out the soil quickly."
        else:
            action = "NO ACTION NEEDED"
            water_needed = "0 liters"
            rationale = "Moisture and temperature are optimal."
    else:
        action = "DO NOT IRRIGATE"
        water_needed = "0 liters"
        rationale = f"Soil is sufficiently wet ({request.soil_moisture}% moisture)."
        
    return IrrigationResponse(
        action=action,
        water_needed=water_needed,
        rationale=rationale
    )
