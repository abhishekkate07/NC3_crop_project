from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class TreatmentScheduleItem(BaseModel):
    day: int
    action: str
    description: str

class TreatmentResponse(BaseModel):
    disease: str
    treatments: List[str]
    fertilizers: List[str]
    dosage: str
    application_method: str
    schedule: List[TreatmentScheduleItem]

# A mock database mapping disease to scientific treatments.
# In a real app, you would fetch this from MongoDB or PostgreSQL.
TREATMENT_DB = {
    "Late Blight": {
        "treatments": ["Apply fungicides containing chlorothalonil or copper fungicide.", "Remove and destroy infected plant parts."],
        "fertilizers": ["Potassium-rich fertilizers to build resistance."],
        "dosage": "2 grams per liter of water.",
        "application_method": "Foliar spray during early morning or late evening.",
        "schedule": [
            {"day": 0, "action": "Immediate Action", "description": "Remove infected leaves and apply 1st protective fungicide coating."},
            {"day": 3, "action": "Monitoring", "description": "Check for spread of necrotic spots."},
            {"day": 7, "action": "Follow-up Treatment", "description": "Apply 2nd protective fungicide coating."},
            {"day": 14, "action": "Final Check", "description": "Ensure disease is contained and no new sports are forming."}
        ]
    },
    "Healthy": dict(
        treatments=["No treatment needed. Keep maintaining current practices."],
        fertilizers=["Standard NPK balanced fertilizer."],
        dosage="Standard application",
        application_method="Base soil application",
        schedule=[
            {"day": 0, "action": "Routine Maintenance", "description": "Water as usual and maintain soil health."}
        ]
    )
}

@router.get("/get-treatment", response_model=TreatmentResponse)
def get_treatment(disease: str):
    """
    Looks up scientific treatments, fertilizers, and recommended application method
    based on the predicted disease.
    """
    record = TREATMENT_DB.get(disease)
    if not record:
        # Provide a fallback
        record = {
            "treatments": ["Consult a local agricultural expert."],
            "fertilizers": ["Organic compost."],
            "dosage": "As recommended by local authorities.",
            "application_method": "General soil application.",
            "schedule": [{"day": 0, "action": "Consultation", "description": "Consult expert."}]
        }
    
    return TreatmentResponse(
        disease=disease,
        treatments=record["treatments"],
        fertilizers=record["fertilizers"],
        dosage=record["dosage"],
        application_method=record["application_method"],
        schedule=record["schedule"]
    )

@router.get("/schedule")
def get_schedule(disease: str):
    """
    Returns only the temporal schedule for the treatment plan.
    It can be integrated into calendar or timeline UI.
    """
    record = TREATMENT_DB.get(disease)
    if not record:
        return {"schedule": []}
    return {"schedule": record["schedule"]}
