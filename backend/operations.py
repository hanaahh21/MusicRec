




def uploadTrack():
    # Function to get similar tracks
    df = pd.read_csv("C:\\Users\\zayna\\Downloads\\Music Info.csv", encoding='utf-8')
    # df1 = pd.read_csv("C:\\Users\\zayna\\Downloads\\User Listening History.csv", encoding='utf-8')
    
    # Store the DataFrame in the PostgreSQL database
    df.to_sql('tracks', con=engine, if_exists='append', index=False)
    # df1.to_sql('track_listening_history', con=engine, if_exists='append', index=False)
    
    return {"message": "Data uploaded successfully"}

# get similar tracks
with open('model_for_similar_songs.pkl', 'rb') as file:
    model = pickle.load(file)

X_test_scaled = np.load('X_train_scaled.npy')
music_info = pd.read_csv('Music Info.csv')
df = music_info.drop(["name", "artist", "spotify_preview_url", "spotify_id", "tags"], axis=1)

def get_similar_tracks_by_id(track_id : str, top_n: int = 10):
    filtered_df = df[df['track_id'] == track_id]
    
    if filtered_df.empty:
        raise HTTPException(status_code=404, detail="Track ID not found")
   
    track_index = filtered_df.index[0]
    track_features = X_test_scaled[track_index].reshape(1, -1)
    similarities = np.dot(X_test_scaled, track_features.T).flatten()
    similar_indices = np.argsort(similarities)[-top_n:]
    similar_track_ids = df.iloc[similar_indices]['track_id'].tolist()
    
    similar_tracks_list = []
    for similar_track_id in similar_track_ids:
        track = db.query(trackmodel.track).filter(trackmodel.track.track_id == similar_track_id).first()
        if track:
            similar_tracks_list.append({
                "track_id": track.track_id,
                "track_name": track.name,
                "artist": track.artist,
                "genre": track.genre
            })
    
    return {"similar_tracks": similar_tracks_list}




with open('final_user_based.pkl', 'rb') as listening_file:
    listening_model = pickle.load(listening_file)
    
listening_df = pd.read_csv('User Listening History.csv')
aggregated_df = listening_df.groupby(['track_id', 'user_id'])['playcount'].sum().reset_index()
all_tracks = set(aggregated_df['track_id'].unique())

def recommend_top_tracks(user_id: str, top_n: int = 10):
    predictions = []
    for track_id in all_tracks:
        prediction = listening_model.predict(user_id, track_id)
        predictions.append((track_id, prediction.est))
    
    # Sort the predictions by estimated playcount in descending order
    predictions.sort(key=lambda x: x[1], reverse=True)
    
    # Get the top N tracks
    top_tracks = predictions[:top_n]
    
    top_tracks_json = [{"track_id": track_id, "estimated_playcount": int(est)} for track_id, est in top_tracks]
    detailed_tracks = []
    
    for i in top_tracks_json:
        track = db.query(trackmodel.track).filter(trackmodel.track.track_id == i['track_id']).first()
        if track:
            detailed_tracks.append({
                "track_id": i['track_id'],
                "track_name": track.name,
                "artist": track.artist,
                "genre": track.genre,
                "estimated_playcount": i['estimated_playcount']
            })
    return {"recommended_tracks": detailed_tracks}

def get_most_popular_songs(n=10):
    """
    Returns the most popular 'n' songs from a given list of track_ids.
    
    Parameters:
    - df (pd.DataFrame): DataFrame containing the song data with columns ['track_id', 'playcount'].
    - track_ids (list): List of track_ids to consider.
    - n (int): Number of top songs to return.
    
    Returns:
    - pd.DataFrame: DataFrame containing the top 'n' most popular songs.
    """
    
    # Filter DataFrame to include only the specified track_ids
    filtered_df = listening_df[listening_df['track_id'].isin(all_tracks)]
    
    # Aggregate playcounts for each track_id
    aggregated_df = filtered_df.groupby('track_id')['playcount'].sum().reset_index()
    
    # Sort tracks by total playcount in descending order
    sorted_df = aggregated_df.sort_values(by='playcount', ascending=False)
    
    # Get the top 'n' songs
    top_songs = sorted_df["track_id"].head(n).tolist()
    
    return top_songs


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

def get_song_info_artist(artist_name):
    track = db.query(trackmodel.track).filter(trackmodel.track.artist == artist_name).first()
    detailed_tracks =[]
    if track:
        detailed_tracks.append({
            "track_id": track.track_id,
            "track_name": track.name,
            "artist": track.artist,
            "genre": track.genre,
        })
    else:
        raise HTTPException(status_code=404, detail="Artist not found")

    return {"track_info": detailed_tracks}

def get_song_info_tag(tag):
    track = db.query(trackmodel.track).filter(tag in trackmodel.track.tags).first()
    detailed_tracks =[]
    if track:
        detailed_tracks.append({
            "track_id": track.track_id,
            "track_name": track.name,
            "artist": track.artist,
            "genre": track.genre,
        })
    else:
        raise HTTPException(status_code=404, detail="Tag not found")

    return {"track_info": detailed_tracks}

def get_song_info_genre(genre_name):
    track = db.query(trackmodel.track).filter(trackmodel.track.genre == genre_name).first()
    detailed_tracks =[]
    if track:
        detailed_tracks.append({
            "track_id": track.track_id,
            "track_name": track.name,
            "artist": track.artist,
            "genre": track.genre,
        })
    else:
        raise HTTPException(status_code=404, detail="Genre not found")

    return {"track_info": detailed_tracks}

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

    
