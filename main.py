from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import disease, treatment, soil, irrigation

app = FastAPI(
    title="Smart Crop Doctor API",
    description="API for detecting crop diseases, recommending treatments, monitoring soil health, and optimizing irrigation.",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(disease.router, prefix="/api/v1")
app.include_router(treatment.router, prefix="/api/v1")
app.include_router(soil.router, prefix="/api/v1")
app.include_router(irrigation.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to Smart Crop Doctor API"}
