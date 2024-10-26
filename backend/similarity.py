import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import LabelEncoder, MinMaxScaler

class SimilarItemRec:
    def __init__(self):
        """Initialize the model. Note: Train the model (fit) before using."""
        self.model = None
        self.raw_df = None
        self.encoded_df = None
        self.label_encoder = None
        self.artist_weight = None
        self.year_weight = None

    def fit(self):
        """Fit the model using the encoded DataFrame."""
        features = self.encoded_df.drop(columns=['track_id'])
        knn = NearestNeighbors(n_neighbors=10, metric='euclidean')
        knn.fit(features)
        self.model = knn

    def train(self, train_df, artist_weight=500, year_weight=50):
        """Train the model with the given DataFrame.

        Args:
            train_df (pd.DataFrame): The DataFrame containing the training data.
            artist_weight (float): Weight for the artist attribute. Default is 500.
            year_weight (float): Weight for the year attribute. Default is 50.
        """
        self.raw_df = train_df
        df = train_df.drop(["name", "spotify_preview_url", "spotify_id", "tags"], axis=1)
        df['genre'] = df['genre'].fillna(0)
        df_encoded = pd.get_dummies(df, columns=['genre'], prefix=['genre'])
        self.label_encoder = LabelEncoder()
        df_encoded['artist'] = self.label_encoder.fit_transform(df_encoded['artist'])
        pd.set_option('future.no_silent_downcasting', True)
        df_encoded.replace({True: 1, False: 0}, inplace=True)
        df_encoded.drop(["genre_0"], axis=1, inplace=True)
        
        columns_to_standardize = [
            'duration_ms', 'danceability', 'energy', 'key',
            'loudness', 'mode', 'speechiness', 'acousticness', 
            'instrumentalness', 'liveness', 'valence', 
            'tempo', 'time_signature'
        ]
        
        scaler = MinMaxScaler()
        df_encoded[columns_to_standardize] = scaler.fit_transform(df_encoded[columns_to_standardize])
        
        scaled_artist = scaler.fit_transform(df_encoded[['artist']])
        scaled_year = scaler.fit_transform(df_encoded[['year']])

        df_encoded[['artist']] = scaled_artist * artist_weight
        df_encoded[['year']] = scaled_year * year_weight
        self.artist_weight = artist_weight
        self.year_weight = year_weight
        self.encoded_df = df_encoded
        self.fit()

    def get_recommendations(self, track_id, n_recommendations=5):
        """Recommend n songs based on the KNN algorithm.

        Args:
            track_id (str): The track_id of the song to find recommendations for.
            n_recommendations (int): Number of recommendations to return. Default is 5.

        Returns:
            tuple: A list of similar track IDs and their distances.
        """
        try:
            track_index = self.encoded_df[self.encoded_df['track_id'] == track_id].index[0]
        except IndexError:
            print(f"Track ID {track_id} not found in the dataset.")
            return [], []

        feature_vector = self.encoded_df.drop(columns=['track_id']).iloc[track_index]
        feature_vector_df = feature_vector.to_frame().transpose()
        distances, indices = self.model.kneighbors(feature_vector_df)

        # Exclude the input track itself from the results
        similar_indices = indices[0][1:n_recommendations + 1]
        similar_tracks = self.encoded_df.iloc[similar_indices]['track_id']
        
        return similar_tracks.tolist(), distances

    def visualize(self, track_id):
        """Visualize the similarity of the model for a given track.

        Args:
            track_id (str): The track_id to visualize.
        """
        similar_tracks, distances = self.get_recommendations(track_id, n_recommendations=5)
        print("Similar tracks for", track_id, ":", similar_tracks)
        print("Calculated distances for", track_id, ":", distances)

        specific_rows_df = self.raw_df[self.raw_df['track_id'].isin(similar_tracks)]
        print(specific_rows_df.T.head(100))

    def update(self, new_music_df):
        """Update the model with the latest music information.

        Args:
            new_music_df (pd.DataFrame): New DataFrame containing music information.
        """
        new_raw_df = pd.concat([self.raw_df, new_music_df], ignore_index=True)
        self.raw_df = new_raw_df
        df = new_music_df.drop(["name", "spotify_preview_url", "spotify_id", "tags"], axis=1)
        df['genre'] = df['genre'].fillna(0)
        df = pd.get_dummies(df, columns=['genre'], prefix=['genre'])
        df['artist'] = self.label_encoder.transform(df['artist'])  # Use transform instead of fit_transform
        df.replace({True: 1, False: 0}, inplace=True)

        # Ensure required columns exist
        required_columns = [f'genre_{genre}' for genre in ['Blues', 'Country', 'Electronic', 'Folk', 'Jazz', 
                                                           'Latin', 'Metal', 'New Age', 'Pop', 'Punk', 
                                                           'Rap', 'Reggae', 'RnB', 'Rock', 'World']]
        for column in required_columns:
            if column not in df.columns:
                df[column] = 0

        df.drop(["genre_0"], axis=1, inplace=True)
        columns_to_standardize = [
            'duration_ms', 'danceability', 'energy', 'key', 'loudness', 
            'mode', 'speechiness', 'acousticness', 'instrumentalness', 
            'liveness', 'valence', 'tempo', 'time_signature'
        ]
        
        scaler = MinMaxScaler()
        df[columns_to_standardize] = scaler.fit_transform(df[columns_to_standardize])
        
        scaled_artist = scaler.fit_transform(df[['artist']])
        scaled_year = scaler.fit_transform(df[['year']])
        
        df[['artist']] = scaled_artist * self.artist_weight
        df[['year']] = scaled_year * self.year_weight
        
        self.encoded_df = pd.concat([self.encoded_df, df], ignore_index=True)
        self.fit()

    def get_track_details(self, track_id):
        """Get the details of a track given its track_id.

        Args:
            track_id (str): The track_id for which details are to be retrieved.

        Returns:
            dict: A dictionary containing 'name', 'artist', and 'year' of the track, or None if not found.
        """
        track_row = self.raw_df[self.raw_df['track_id'] == track_id]

        if not track_row.empty:
            track_details = {
                'name': track_row['name'].values[0],
                'artist': track_row['artist'].values[0],
                'year': track_row['year'].values[0]
            }
            return track_details
        else:
            print(f"Track ID {track_id} not found in the music_info DataFrame.")
            return None

    def get_full_recommendations(self, track_id):
        """Get full recommendations with attributes.

        Args:
            track_id (str): The track_id to get recommendations for.
        """
        recommended_list = self.get_recommendations(track_id)
        print("Recommended songs for track_id:", track_id)
        for track in recommended_list[0]:
            print(self.get_track_details(track))
