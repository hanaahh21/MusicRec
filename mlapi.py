from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas 

app = FastAPI()

class interactions(BaseModel):
    user_id : int
    track_id : int
    interaction_count : int
    
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)
    
@app.post("/predict")
async def predict(interaction: interactions):
    data = pandas.DataFrame([interaction.dict().values()], columns=interaction.dict().keys())
    prediction = model.predict(data)
    return {
        'prediction': prediction
    }
    

