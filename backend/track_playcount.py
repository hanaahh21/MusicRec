from sqlalchemy import String, Column, Integer, Boolean, Enum, ARRAY, Float

from database import Base, engine

class trackcount(Base):
    __tablename__ = "track_playcount"
    track_id = Column(String, primary_key=True, index=True)
    playcount = Column(Integer, default=0)

def create_tables():
    Base.metadata.create_all(engine)
