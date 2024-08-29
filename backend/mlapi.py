from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from database import engine, get_db
from sklearn.preprocessing import StandardScaler
import pickle, keras
import pandas as pd
import numpy as np
import trackmodel as trackmodel
import json

app = FastAPI()

class interactions(BaseModel):
    user_id : int
    track_id : int
    interaction_count : int
    
class track(BaseModel):
    track_id : str
    

@app.post("/uploadtrack", status_code=200)
def uploadTrack():
    # Function to get similar tracks
    df = pd.read_csv("C:\\Users\\zayna\\Downloads\\Music Info.csv", encoding='utf-8')
    # Store the DataFrame in the PostgreSQL database
    df.to_sql('tracks', con=engine, if_exists='append', index=False)
    
    return {"message": "Data uploaded successfully"}





with open('model_for_similar_songs.pkl', 'rb') as file:
    model = pickle.load(file)

X_test_scaled = np.load('X_train_scaled.npy')

music_info = pd.read_csv('Music Info.csv')

df = music_info.drop(["name", "artist", "spotify_preview_url", "spotify_id", "tags"], axis=1)





@app.post("/getsimilartrack/{track_id}", status_code = status.HTTP_200_OK)

def get_similar_tracks_by_id(track_id : str, top_n: int = 10):
    filtered_df = df[df['track_id'] == track_id]
    
    if filtered_df.empty:
        raise HTTPException(status_code=404, detail="Track ID not found")
   
    track_index = filtered_df.index[0]
    track_features = X_test_scaled[track_index].reshape(1, -1)
    similarities = np.dot(X_test_scaled, track_features.T).flatten()
    similar_indices = np.argsort(similarities)[-top_n:]
    similar_track_ids = df.iloc[similar_indices]['track_id'].tolist()

    return {"similar_tracks": similar_track_ids}

    
# aggregated_df = df.groupby(['track_id', 'user_id'])['playcount'].sum().reset_index()

# @app.post("/recommend/{user_id}", status_code = status.HTTP_200_OK)

# def recommend_top_tracks(user_id : str, top_n : int=10):

#     predictions = []
#     for track_id in all_tracks:
#         prediction = model.predict(user_id, track_id)
#         predictions.append((track_id, prediction.est))
    
    
#     predictions.sort(key=lambda x: x[1], reverse=True)
#     top_tracks = predictions[:top_n]
#     top_tracks_json = [{"track_id": track_id, "estimated_playcount": est} for track_id, est in top_tracks]
    
#     return {"recommended_tracks": top_tracks_json}



# @app.post("/predict")
# async def predict(interaction: interactions):
#     data = pd.DataFrame([interaction.dict().values()], columns=interaction.dict().keys())
#     prediction = model.predict(data)
#     return {
#         'prediction': prediction
#     }
    

