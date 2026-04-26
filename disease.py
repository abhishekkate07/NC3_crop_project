import io
import numpy as np
from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
# from tensorflow.keras.models import load_model # Uncomment in production
# from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image

router = APIRouter()

# Global model variable
# MODEL_PATH = "models/disease_detection_model.h5"
# model = load_model(MODEL_PATH)

# A sample mapping from integer classes to class names.
# Update this based on the specific dataset you use (e.g., PlantVillage).
CLASS_NAMES = ["Healthy", "Early Blight", "Late Blight", "Powdery Mildew", "Leaf Spot"]

class PredictionResponse(BaseModel):
    disease: str
    confidence: float
    description: str

@router.post("/predict-disease", response_model=PredictionResponse)
async def predict_disease(file: UploadFile = File(...)):
    """
    Accepts an image of a crop leaf and returns the predicted disease
    using a deep learning model (e.g., ResNet / MobileNet).
    """
    
    # Read the file
    content = await file.read()
    image = Image.open(io.BytesIO(content)).convert("RGB")
    
    # Preprocess the image block (uncomment in production)
    # image = image.resize((224, 224)) # Default for ResNet / MobileNet
    # img_tensor = img_to_array(image) / 255.0
    # img_tensor = np.expand_dims(img_tensor, axis=0)
    
    # Perform prediction
    # predictions = model.predict(img_tensor)
    # predicted_class_idx = np.argmax(predictions[0])
    # confidence = float(predictions[0][predicted_class_idx])
    # disease_name = CLASS_NAMES[predicted_class_idx]
    
    # TODO: Using a mock response for now so the app runs without a massive model.
    # Replace these mock return values with the lines above.
    disease_name = "Late Blight"
    confidence = 0.94
    
    # Get high-level description
    description = f"Detected {disease_name} with {(confidence * 100):.2f}% confidence."
    if disease_name == "Healthy":
         description = "The crop appears healthy. Keep up the good work!"
         
    return PredictionResponse(
        disease=disease_name,
        confidence=confidence,
        description=description
    )
