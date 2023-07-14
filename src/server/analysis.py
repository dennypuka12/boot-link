import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np
import os
import json
from pymongo import MongoClient
import matplotlib.pyplot as plt
import seaborn as sns


client = MongoClient('mongodb://localhost:27017/')
db = client['hack']
collection = db['fakeEmployeesNew']

data = [doc for doc in collection.find({})]

df = pd.DataFrame(data)

# Dropping irrelevant data
df_model = df.drop(columns=['_id', 'name', 'phoneNumber', 'role', 'managerId'])

# One hot encode the categorical columns
df_model = pd.get_dummies(df_model, columns=['jobRole', 'workLocation'])

# Splitting Data intro Training Set and Test Set
X = df_model.drop(columns='salary')
y = df_model['salary']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)

#Initialize model
model = LinearRegression()
model.fit(X_train, y_train)

#Use model to make predictions for y

y_pred = model.predict(X_test)

#Error metrics for averages
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)

mae, mse, rmse

#Plotting actual vs predicted
plt.figure(figsize=(10,6))
sns.scatterplot(x=y_test, y=y_pred, alpha=0.6)
plt.xlabel('Actual Salary')
plt.ylabel('Predicted Salary')
plt.title('Actual vs Predicted Salary')
plt.show()

residuals = y_test - y_pred
plt.figure(figsize=(10,6))
sns.histplot(residuals, bins=20, kde=True)
plt.title('Residuals')
plt.show()