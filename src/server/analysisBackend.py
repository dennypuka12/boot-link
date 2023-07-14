from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import analysis

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # React app
    "http://localhost:8000",  # FastAPI server (itself)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/predict/salary")
def predict_salary_endpoint(jobRole: str, workLocation: str):
    # Use the predict_salary function from analysis.py to make a prediction
    prediction_results = analysis.predict_salary(jobRole, workLocation)
    #Plot
    plot_path = analysis.create_and_save_plot(prediction_results["y_test"], prediction_results["y_pred"])

    # Return the prediction and the error metrics
    return {
        "predicted_salary": prediction_results["predicted_salary"],
        "mae": prediction_results["mae"],
        "mse": prediction_results["mse"],
        "plot_path": plot_path,
    }

@app.get("/api/get_plot")
def get_plot():
    plot_path = os.path.abspath("plot")
    # Serve the plot as a static file
    return FileResponse('plot/scatter_plot.png', media_type='image/png')
