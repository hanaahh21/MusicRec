from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel , Field
from database import engine, get_db, SessionLocal
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from typing import List
from similarity import SimilarItemRec
import pickle, keras
import pandas as pd
import numpy as np
import trackmodel as trackmodel
import track_playcount as track_playcount
import json

import cloudpickle



app = FastAPI()
db = SessionLocal()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace "*" with the actual URL of your frontend, e.g., ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


    
class TrackInfo(BaseModel):
    artist_name: List[str] = Field(..., min_items=1, max_items=3)
    genre_name: List[str] = Field(..., min_items=1, max_items=3)
    
class track(BaseModel):
    track_id : str
    
# Pydantic model for creating a track
class TrackCreate(BaseModel):
    track_id: str
    name: str
    artist: str
    spotify_preview_url: str
    spotify_id: str
    tags: list[str]
    genre: str
    year: int
    duration_ms: int
    danceability: float
    energy: float
    key: int
    loudness: float
    mode: int
    speechiness: float
    acousticness: float
    instrumentalness: float
    liveness: float
    valence: float
    tempo: float
    time_signature: int





# upload music_info

@app.post("/uploadtrack", status_code=200)
def uploadTrack():
    # Function to get similar tracks
    df = pd.read_csv("C:\\Users\\zayna\\Downloads\\Music Info.csv", encoding='utf-8')
    # df1 = pd.read_csv("C:\\Users\\zayna\\Downloads\\User Listening History.csv", encoding='utf-8')
    
    # Store the DataFrame in the PostgreSQL database
    df.to_sql('tracks', con=engine, if_exists='append', index=False)
    # df1.to_sql('track_listening_history', con=engine, if_exists='append', index=False)
    
    return {"message": "Data uploaded successfully"}





## similarsongs


with open('models\\new.pkl ', 'rb') as f:
    new_model = cloudpickle.load(f)
    
@app.post("/getsimilartrack/{track_id}", status_code = status.HTTP_200_OK)
def recommend_similar_tracks(track_id:str, n_neighbors:int =10):
    similar_tracks = new_model.get_recommendations(track_id,n_neighbors)[0]
    
    similar_tracks_list = []
    for similar_track_id in similar_tracks:
        track = db.query(trackmodel.track).filter(trackmodel.track.track_id == similar_track_id).first()
        if track:
            similar_tracks_list.append({
                "track_id": track.track_id,
                "track_name": track.name,
                "artist": track.artist,
                "genre": track.genre
            })
    
    return {"similar_tracks": similar_tracks_list}
    
    
       





# Load your model and data
# with open('models\\final_user_based.pkl', 'rb') as listening_file:
#     listening_model = pickle.load(listening_file)
    
listening_df = pd.read_csv('models\\User Listening History.csv')
aggregated_df = listening_df.groupby(['track_id', 'user_id'])['playcount'].sum().reset_index()
all_tracks = set(aggregated_df['track_id'].unique())



with open ('A:\\OneDrive - University of Moratuwa\\Projects\\MusicRec\\backend\\models\\userRec_model.pkl', 'rb') as file:
    userRec_model = pickle.load(file)
    
@app.post("/recommend/{user_id}", status_code=status.HTTP_200_OK)
def recommend_top_tracks(user_id: str, top_n: int = 10):
    rec_tracks = userRec_model.get_recommendations(user_id)
    
    recommended_tracks = []
    for track_id in rec_tracks:
        track = db.query(trackmodel.track).filter(trackmodel.track.track_id == track_id).first()
        if track:
            recommended_tracks.append({
                "track_id": track.track_id,
                "track_name": track.name,
                "artist": track.artist,
                "genre": track.genre
            })
    
    return {"recommended_tracks": recommended_tracks}






@app.post('/add_track', response_model=dict, status_code=status.HTTP_201_CREATED)
def add_track(track: TrackCreate, db: Session = Depends(get_db)):
    new_track = trackmodel.track(
        track_id=track.track_id,
        name=track.name,
        artist=track.artist,
        spotify_preview_url=track.spotify_preview_url,
        spotify_id=track.spotify_id,
        tags=track.tags,
        genre=track.genre,
        year=track.year,
        duration_ms=track.duration_ms,
        danceability=track.danceability,
        energy=track.energy,
        key=track.key,
        loudness=track.loudness,
        mode=track.mode,
        speechiness=track.speechiness,
        acousticness=track.acousticness,
        instrumentalness=track.instrumentalness,
        liveness=track.liveness,
        valence=track.valence,
        tempo=track.tempo,
        time_signature=track.time_signature
    )
    
    db.add(new_track)
    db.commit()
    db.refresh(new_track)

    return {"message": "Track added successfully", "track_id": new_track.track_id}









@app.get('/populartracks/',status_code=status.HTTP_200_OK)
def get_most_popular_songs(n=10):
    # Filter DataFrame to include only the specified track_ids
    filtered_df = listening_df[listening_df['track_id'].isin(all_tracks)]
    
    # Aggregate playcounts for each track_id
    aggregated_df = filtered_df.groupby('track_id')['playcount'].sum().reset_index()
    
    # Sort tracks by total playcount in descending order
    sorted_df = aggregated_df.sort_values(by='playcount', ascending=False)
    
    # Get the top 'n' songs
    top_songs = sorted_df["track_id"].head(n).tolist()
    top_songs_list = []
    for id in top_songs:
        track = db.query(trackmodel.track).filter(trackmodel.track.track_id == id).first()
        if track:
            top_songs_list.append({
                "track_id": track.track_id,
                "track_name": track.name,
                "artist": track.artist,
                "genre": track.genre})
    
    return top_songs_list








@app.post('/trackinfo_name/{trackname}', status_code=status.HTTP_200_OK)
def get_song_info_track(trackname):
    track = db.query(trackmodel.track).filter(trackmodel.track.name == trackname).first()
    detailed_tracks =[]
    if track:
        detailed_tracks.append({
            "track_id": track.track_id,
            "track_name": track.name,
            "artist": track.artist,
            "genre": track.genre,
        })
    else:
        raise HTTPException(status_code=404, detail="Track not found")

    return {"track_info": detailed_tracks}






@app.post('/trackinfo_id/{id}', status_code=status.HTTP_200_OK)
def get_song_info_track(id):
    track = db.query(trackmodel.track).filter(trackmodel.track.track_id == id).first()
    detailed_tracks =[]
    if track:
        detailed_tracks.append({
            "track_id": track.track_id,
            "track_name": track.name,
            "artist": track.artist,
            "genre": track.genre,
            "year": track.year,
            "link": track.spotify_preview_url,
            "tags" : track.tags,
        })
    else:
        raise HTTPException(status_code=404, detail="Track not found")

    return {"track_info": detailed_tracks}






@app.post('/trackinfo_artist/{artist_name}', status_code=status.HTTP_200_OK)
def get_song_info_artist(artist_name):
    tracks = db.query(trackmodel.track).filter(trackmodel.track.artist == artist_name).limit(12).all()
    detailed_tracks =[]
    if tracks:
        for track in tracks:
            detailed_tracks.append({
                "track_id": track.track_id,
                "track_name": track.name,
                "artist": track.artist,
                "genre": track.genre,
            })
    else:
        raise HTTPException(status_code=404, detail="Artist not found")

    return {"track_info": detailed_tracks}







@app.post('/trackinfo_tag/{tag}', status_code=status.HTTP_200_OK)
def get_song_info_tag(tag):
    tracks = db.query(trackmodel.track).filter(tag in trackmodel.track.tags).limit(12).all()
    detailed_tracks =[]
    if tracks:
        for track in tracks:
            detailed_tracks.append({
                "track_id": track.track_id,
                "track_name": track.name,
                "artist": track.artist,
                "genre": track.genre,
            })
    else:
        raise HTTPException(status_code=404, detail="Tag not found")

    return {"track_info": detailed_tracks}






@app.post('/trackinfo_genre/{genre_name}', status_code=status.HTTP_200_OK)
def get_song_info_genre(genre_name):
    tracks = db.query(trackmodel.track).filter(trackmodel.track.genre == genre_name).limit(12).all()
    detailed_tracks =[]
    if tracks:
        for track in tracks:
            detailed_tracks.append({
                "track_id": track.track_id,
                "track_name": track.name,
                "artist": track.artist,
                "genre": track.genre,
            })
    else:
        raise HTTPException(status_code=404, detail="Genre not found")

    return {"track_info": detailed_tracks}








@app.post('/trackinfo/', status_code=status.HTTP_200_OK)
def get_song_info(track_info: TrackInfo):
    detailed_tracks = []

    # Determine the number of tracks to select based on the number of artists
    artist_track_counts = []
    if len(track_info.artist_name) == 1:
        artist_track_counts = [5]
    elif len(track_info.artist_name) == 2:
        artist_track_counts = [3, 2]
    elif len(track_info.artist_name) == 3:
        artist_track_counts = [2, 2, 1]

    # Iterate over each artist in the list and select the specified number of tracks
    for i, artist_nm in enumerate(track_info.artist_name):
        if i < len(artist_track_counts):
            track_count = artist_track_counts[i]
            tracks = db.query(trackmodel.track).filter(trackmodel.track.artist == artist_nm).limit(track_count).all()
            if tracks:
                for track in tracks:
                    detailed_tracks.append({
                        "track_id": track.track_id,
                        "track_name": track.name,
                        "artist": track.artist,
                        "genre": track.genre,
                    })
            else:
                raise HTTPException(status_code=404, detail=f"Artist '{artist_nm}' not found")

    # Determine the number of tracks to select based on the number of genres
    genre_track_counts = []
    if len(track_info.genre_name) == 1:
        genre_track_counts = [5]
    elif len(track_info.genre_name) == 2:
        genre_track_counts = [3, 2]
    elif len(track_info.genre_name) == 3:
        genre_track_counts = [2, 2, 1]

    # Iterate over each genre in the list and select the specified number of tracks
    for i, tag in enumerate(track_info.genre_name):
        if i < len(genre_track_counts):
            track_count = genre_track_counts[i]
            tracks = db.query(trackmodel.track).filter(trackmodel.track.genre==tag).limit(track_count).all()
            if tracks:
                for track in tracks:
                    detailed_tracks.append({
                        "track_id": track.track_id,
                        "track_name": track.name,
                        "artist": track.artist,
                        "genre": track.genre,
                    })
            else:
                raise HTTPException(status_code=404, detail=f"Genre '{tag}' not found")

    return {"track_info": detailed_tracks}

    
