import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error
import matplotlib.pyplot as plt
from sklearn.preprocessing import OneHotEncoder, LabelEncoder, StandardScaler
from sklearn.compose import make_column_transformer
import seaborn as sns
import os
import joblib
import pymongo

# Establish a connection to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["hack"]
collection = db["fakeEmployeesNew"]

# Load the dataset
employees = pd.DataFrame(list(collection.find()))

# Drop the unnecessary columns
employees.drop(columns=['_id', 'name', 'phoneNumber', 'role', 'managerId'], inplace=True)

# Define the input variable (X) and output variable (y)
X = employees.drop(columns='salary')
y = employees['salary']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a column transformer for one-hot encoding
preprocessor = make_column_transformer(
    (OneHotEncoder(handle_unknown='ignore'), ['jobRole', 'workLocation']),
    remainder='passthrough'
)

# Fit the transformer on the training set and transform the training and test sets
X_train = preprocessor.fit_transform(X_train)
X_test = preprocessor.transform(X_test)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the model and preprocessor
joblib.dump(model, 'model.pkl')
joblib.dump(preprocessor, 'preprocessor.pkl')

def prepare_input_data(jobRole, workLocation):
    # Initialize a dataframe in the same format as the original data
    input_data = pd.DataFrame(columns=['jobRole', 'workLocation'])
    input_data.loc[0, 'jobRole'] = jobRole
    input_data.loc[0, 'workLocation'] = workLocation

    # Transform the input data using the same transformer as the training data
    input_data = preprocessor.transform(input_data)

    return input_data

def predict_salary(jobRole, workLocation):
    # Prepare the input data
    input_data = prepare_input_data(jobRole, workLocation)

    # Use the model to make a prediction
    salary_prediction = model.predict(input_data)

    # Calculate the error metrics
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)

    # Create and save plot
    # plot_path = create_and_save_plot(y_test, y_pred)

    return {
        "predicted_salary": salary_prediction[0],
        "mae": mae,
        "mse": mse,
        "rmse": rmse,
        "y_test": y_test,
        "y_pred": y_pred,
    }

def create_and_save_plot(y_test, y_pred, plot_dir='plot'):
    # Scatter plot
    plt.scatter(y_test, y_pred)
    plt.xlabel('True Values')
    plt.ylabel('Predictions')

    # Ensure the plot directory exists
    os.makedirs(plot_dir, exist_ok=True)

    # Save the plot to a PNG file
    plot_path = os.path.join(plot_dir, 'scatter_plot.png')
    plt.savefig(plot_path)

    return plot_path
