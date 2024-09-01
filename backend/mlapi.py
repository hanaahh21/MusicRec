from fastapi import FastAPI, HTTPException, status, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import engine, get_db
from sklearn.preprocessing import StandardScaler
import pickle, keras
import pandas as pd
import numpy as np
import trackmodel as trackmodel
import track_playcount as track_playcount
import json

app = FastAPI()

class interactions(BaseModel):
    user_id : int
    track_id : int
    interaction_count : int
    
class track(BaseModel):
    track_id : str
    
# upload music_info

@app.post("/uploadtrack", status_code=200)
def uploadTrack():
    # Function to get similar tracks
    df = pd.read_csv("C:\\Users\\zayna\\Downloads\\Music Info.csv", encoding='utf-8')
    # Store the DataFrame in the PostgreSQL database
    df.to_sql('tracks', con=engine, if_exists='append', index=False)
    
    return {"message": "Data uploaded successfully"}




# get similar tracks
with open('A:\\OneDrive - University of Moratuwa\\Projects\\MusicRec1\\backend\\model_for_similar_songs.pkl', 'rb') as file:
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






# get popular tracks
@app.post("/playtrack/{track_id}")
def play_track(track_id: str, db: Session = Depends(get_db)):
    # Check if the track exists in the table
    track_record = db.query(track_playcount.trackcount).filter(track_playcount.trackcount.track_id == track_id).first()
    
    if track_record:
        # If the track exists, increment the playcount
        track_record.playcount += 1
    else:
        # If the track does not exist, add it with a playcount of 1
        new_track = track_playcount.trackcount(track_id=track_id, playcount=1)
        db.add(new_track)
    
    db.commit()
    
    return {"message": f"Track {track_id} playcount incremented."}


# with open('final_user_based.pkl', 'rb') as listening_file:
#     listening_model = pickle.load(listening_file)
    
# listening_df = pd.read_csv('User Listening History.csv')
    
# aggregated_df = listening_df.groupby(['track_id', 'user_id'])['playcount'].sum().reset_index()
# all_tracks = set(aggregated_df['track_id'].unique())

# @app.post("/recommend/{user_id}", status_code = status.HTTP_200_OK)
# def recommend_top_tracks(user_id : str, top_n : int=10):

#     predictions = []
#     for track_id in all_tracks:
#         prediction = listening_model.predict(user_id, track_id)
#         predictions.append((track_id, prediction.est))
    
    
#     predictions.sort(key=lambda x: x[1], reverse=True)
#     top_tracks = predictions[:top_n]
#     top_tracks_json = [{"track_id": track_id, "estimated_playcount": est} for track_id, est in top_tracks]
    
#     return {"recommended_tracks": top_tracks_json}

# print(recommend_top_tracks(1, 10))



# @app.post("/predict")
# async def predict(interaction: interactions):
#     data = pd.DataFrame([interaction.dict().values()], columns=interaction.dict().keys())
#     prediction = model.predict(data)
#     return {
#         'prediction': prediction
#     }
    
