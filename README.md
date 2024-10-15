# Music Recommender Application

This project was developed for our **Data Science and Engineering project** during the **fifth semester**. Our main focus was on building and implementing a effective music recommendation system, integrating both **collaborative filtering** and **content-based recommendations**, and deploying a chatbot for enhanced user interaction.

## Key Features

- **Collaborative Filtering**: Built a recommendation system based on user interaction data (playcounts), using **cosine similarity** to identify similar users and recommend songs accordingly.
  
- **Content-Based Filtering**: Used **K-Nearest Neighbors (KNN)** to recommend songs by clustering based on their attributes (e.g., genre, danceability, tempo), focusing on the similarity between tracks rather than users.

- **Chatbot Integration**: Implemented a chatbot using **Gemini Pro API** and **Langchain framework**, allowing users to interact with the system and receive music recommendations through a conversation.

## Technologies Used

- **Python**: For data preprocessing, model development, and evaluation.
- **Cosine Similarity & KNN**: Employed these algorithms to enhance recommendation accuracy.
- **Gemini Pro API**: Used for chatbot functionalities.
- **Langchain Framework**: Integrated for natural language processing (NLP) and chatbot development.
- **FastAPI**: Backend development for handling user data and serving recommendations.
- **React.js**: For the frontend of the application.
