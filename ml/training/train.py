import pandas as pd

df = pd.read_csv("ml/data/processed/training_data.csv")

print(df.head())
print(df.shape)
print(df.columns)
print(df.dtypes)


#selecting x and y for training the model
x=df.drop(columns=["congestion_score","timestamp","location_name"])

y=df["congestion_score"]


#train test split
from sklearn.model_selection import train_test_split

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

print(x.select_dtypes(include="object").columns)



#encoding via column transformer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

trans = ColumnTransformer(
    transformers=[
        (
            "tf1",
            OneHotEncoder(sparse_output=False, handle_unknown="ignore"),
            [
                "weather_condition",
                "signal_status",
                "time_of_day",
                "road_type",
                "zone",
            ],
        )
    ],
    remainder="passthrough",
)

x_train_transformed = trans.fit_transform(x_train)
x_test_transformed = trans.transform(x_test)


from xgboost import XGBRegressor

model = XGBRegressor(random_state=42)

model.fit(x_train_transformed, y_train)

predictions = model.predict(x_test_transformed)



from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)


mae = mean_absolute_error(y_test, predictions)
mse = mean_squared_error(y_test, predictions)
rmse = mse ** 0.5
r2 = r2_score(y_test, predictions)

print(f"MAE  : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"R²   : {r2:.4f}")
    

