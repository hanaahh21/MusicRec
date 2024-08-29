from sqlalchemy.orm import declarative_base, sessionmaker

from sqlalchemy import create_engine

engine = create_engine("postgresql+psycopg2://postgres:20Han!01@localhost/musichub_db", echo=True)

Base = declarative_base()

SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()