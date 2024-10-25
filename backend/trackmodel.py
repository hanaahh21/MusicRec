from sqlalchemy import String, Column, Integer, Boolean, Enum, ARRAY, Float

from database import Base, engine

class track(Base):
    __tablename__ = "tracks"
    track_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable = False)
    artist = Column(String, nullable = False)
    spotify_preview_url = Column(String, nullable = False)
    spotify_id = Column(String, unique=True, index=True)
    tags = Column(ARRAY(String), nullable = False)
    genre = Column(String, nullable = False)     
    year = Column(String, nullable = False)
    duration_ms = Column(Integer, nullable = False)
    danceability = Column(Float, nullable = False)
    energy = Column(Float, nullable = False)
    key = Column(Integer, nullable = False)
    loudness = Column(Float, nullable = False)
    mode = Column(Integer, nullable = False)
    speechiness =Column(Float, nullable = False)
    acousticness = Column(Float, nullable = False)
    instrumentalness = Column(Float, nullable = False)
    liveness =Column(Float, nullable = False)
    valence = Column(Float, nullable = False)
    tempo = Column(Float, nullable = False)
    time_signature = Column(Integer, nullable = False)

def create_tables():
    Base.metadata.create_all(engine)
