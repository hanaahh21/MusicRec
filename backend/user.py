import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.metrics.pairwise import cosine_similarity
import random

class UserBasedRec:
    def init(self):
        """Call this function to initialize the model, Note: U hv to train the model(fit) before using"""
        self.df=None
        self.user_similarity_df=None
        self.user_index_map=None

    # Function to get the last n_interactions
    def get_last_n_excluding_latest(self, group, n):
        if len(group) > n:
            # Get the last n interactions, excluding the latest
            return group.iloc[-n:]
        else:
            # Return all interactions if fewer than n interactions are available
            return group

    # Convert playcounts to ratings
    def convert_to_rating(self, playcount):
        """Convert the interactions into ratings, because we only have the playcount ;("""
        if playcount >= 10:
            return 5
        elif playcount >= 5:
            return 4
        elif playcount >= 2:
            return 3
        elif playcount >= 1:
            return 2
        else:
            return 0  # this won't be used

    def get_top_n_tracks(self, df, n):
        """
        Function to get the top n tracks with the highest playcounts.

        Parameters:
        df (pandas.DataFrame): The DataFrame containing the track data.
        n (int): The number of top tracks to return.

        Returns:
        pandas.DataFrame: A DataFrame containing the top n tracks and their total playcounts.
        """
        # Group by track_id and sum the playcounts
        track_playcounts = df.groupby('track_id')['playcount'].sum()

        # Sort by playcount in descending order and get the top n
        top_n_tracks = track_playcounts.sort_values(ascending=False).head(n)

        # Convert to DataFrame and reset index
        top_n_tracks_df = top_n_tracks.reset_index()

        # Rename columns for clarity
        top_n_tracks_df.columns = ['track_id', 'total_playcount']

        return top_n_tracks_df

    def create_the_sparse_mat(self, df):
        return csr_matrix(pd.pivot_table(df, index='user_id', columns='track_id', values='rating').fillna(0).values)

    def train(self, train_df, more_than=50, take=200):
        """"Train the model, attributes, listening_info_df and
        more than = which users to consider, user having more than (more_than) interactions
        take = which interactions to take from the, take latest (take) number of interactions from each user"""
        user_interaction_counts = train_df['user_id'].value_counts()
        filtered_df = train_df[train_df['user_id'].isin(user_interaction_counts[user_interaction_counts > more_than].index)]
        last_n_excluding_latest = filtered_df.groupby('user_id', group_keys=False).apply(lambda x: self.get_last_n_excluding_latest(x, take)).reset_index(drop=True)
        aggregated_data = last_n_excluding_latest.groupby(['user_id', 'track_id'], as_index=False).agg({'playcount': 'mean'})
        aggregated_data = aggregated_data.assign(rating=aggregated_data['playcount'].apply(self.convert_to_rating))

        user_item_matrix_sparse = self.create_the_sparse_mat(aggregated_data)
        self.df = aggregated_data
        # Compute cosine similarity between users using sparse matrix
        user_similarity = cosine_similarity(user_item_matrix_sparse)
        # Convert the similarity matrix to a DataFrame for easier manipulation
        self.user_similarity_df = pd.DataFrame(user_similarity)

        # Create an index map from the user_id to numerical indices
        self.user_index_map = {user_id: idx for idx, user_id in enumerate(aggregated_data['user_id'].unique())}

    def get_recommendations(self, user_id, n_recommendations=10):
        """Recommend 10 songs for a user based on collaborative filtering. Important: if there's not many similar users, 
        there is a possibility to return a few songs (less than 10), handle it"""

        # Map user_id to the corresponding index
        user_idx = self.user_index_map.get(user_id, None)

        if user_idx is None:
            print(f"User ID {user_id} not found.")
            return []

        similar_users = self.user_similarity_df.iloc[user_idx].sort_values(ascending=False)[1:]  # Exclude the user itself
        top_similar_users = similar_users.index[:n_recommendations - 2]

        len_sim = len(top_similar_users)

        if len_sim > 7:
            n = 1
        elif len_sim > 3:
            n = 2
        elif len_sim > 2:
            n = 3
        else:
            n = len_sim

        recommendations = set()
        listened_songs = self.df[self.df['user_id'] == user_id]  # get the already listened songs
        fav_songs = self.get_top_n_tracks(listened_songs, 2)
        recommendations.update(set(fav_songs['track_id'].tolist()))

        rec_set_len = len(recommendations)

        for similar_user in top_similar_users:
            similar_user_id = self.df['user_id'].unique()[similar_user]  # Get the actual user ID
            similar_user_songs = self.df[self.df['user_id'] == similar_user_id]  # get the songs of each user
            similar_user_song = self.get_top_n_tracks(similar_user_songs, n)
            recommended_songs = similar_user_song['track_id'].tolist()

            recommendations.update(set(recommended_songs))
            k = n
            while len(recommendations) < (rec_set_len + n):
                k += 1
                similar_user_song = self.get_top_n_tracks(similar_user_songs, k)
                recommended_songs = similar_user_song['track_id'].tolist()
                recommendations.update(set(recommended_songs))

                if len(recommendations) >= 10:  # infinite loop breaker
                    break

            rec_set_len = len(recommendations)

        if len(recommendations) > 10:
            return random.sample(list(recommendations), 10)

        return list(recommendations)

    # Define the custom aggregation function
    def custom_agg_function(self, row, df1_weight=3, df2_weight=1):
        """"Change the weights for respective df to adjust the up-to-date effect of the model
        to get increased effect of more recent interactions, increase the df2_weight"""
        # If playcount from df2 is NaN, keep the value from df1
        if pd.isna(row['playcount_df2']):
            return row['playcount_df1']
        # If playcount from df1 is NaN, keep the value from df2
        if pd.isna(row['playcount_df1']):
            return row['playcount_df2']
        # Otherwise, apply the custom formula
        return (row['playcount_df1'] * df1_weight + row['playcount_df2'] * df2_weight) / (df1_weight + df2_weight)

    def update(self, new_interactions):
        """Update the model with the latest interactions, note: there should not be duplicate values for
        (user_id, track_id) pair here. because in the procedure we have not done the aggregation"""
        # Merge df1 and df2 using a left join on 'track_id' and 'user_id'
        merged_df = pd.merge(self.df, new_interactions, on=['track_id', 'user_id'], how='left', suffixes=('_df1', '_df2'))

        # Apply the custom aggregation function row-wise
        merged_df['playcount'] = merged_df.apply(self.custom_agg_function, axis=1)

        # Create the final dataframe with track_id, user_id, and the new playcount
        final_df = merged_df[['track_id', 'user_id', 'playcount']]
        final_df = final_df.assign(rating=final_df['playcount'].apply(self.convert_to_rating))

        user_item_matrix_sparse_new = self.create_the_sparse_mat(final_df)

        # Compute cosine similarity between users using sparse matrix
        user_similarity_new = cosine_similarity(user_item_matrix_sparse_new)
        self.df = final_df
        # Convert the similarity matrix to a DataFrame for easier manipulation
        self.user_similarity_df = pd.DataFrame(user_similarity_new)
        # Create an index map from the user_id to numerical indices
        self.user_index_map = {user_id: idx for idx, user_id in enumerate(final_df['user_id'].unique())}