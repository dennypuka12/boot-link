from fastapi import FastAPI, File
from fastapi.responses import FileResponse
import analysis

app = FastAPI()

@app.get("/api/predict/salary")
def predict_salary_endpoint(jobRole: str, workLocation: str):
    # Use the predict_salary function from analysis.py to make a prediction
    prediction_results = analysis.predict_salary(jobRole, workLocation)

    # Return the prediction and the error metrics
    return {
        "predicted_salary": prediction_results["predicted_salary"],
        "mae": prediction_results["mae"],
        "mse": prediction_results["mse"]
    }

@app.get("/api/plot/{filename}")
def get_plot(filename: str):
    # Serve the plot as a static file
    return FileResponse(filename)
