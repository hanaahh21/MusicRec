from sqlalchemy import String, Column, Integer, Boolean, Enum
from passlib.context import CryptContext
from database import Base, engine

#password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")




class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    firstname = Column(String(40), nullable = False)
    lastname = Column(String(40), nullable = False)
    gender = Column(Enum('male', 'female', name='gender_enum'), nullable=False)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    
    # create password
    def set_password(self, password : str):
        self.password = pwd_context.hash(password)
    
    # Method to verify a password
    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.password)
    
def create_tables():
    Base.metadata.create_all(engine)