from fastapi import FastAPI, status, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from enum import Enum
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
import usermodel as usermodel
import chatbot as chatbot

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

class OurBaseModel(BaseModel):
    id : int
    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username : str
    password : str
        
        
class User(BaseModel):
    firstname : str
    lastname : str
    gender : str
    username : str
    email : EmailStr
    password : str
    
    
class UserUpdate(BaseModel):
    id : int
    firstname : str
    lastname : str
    gender : str
    username : str
    email : EmailStr
    password : str
    
class Chatbot(BaseModel):
    response : str
    
class ChatbotRequest(BaseModel):
    user_question: str


@app.post("/chatbot", response_model=Chatbot, status_code=status.HTTP_200_OK)
def chatbot_request(request: ChatbotRequest):
    try:
        # Use the user_input function from the chatbot module
        response = chatbot.user_input(request.user_question)  # Access the user_question attribute
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
    
    

@app.get("/", response_model=list[User], status_code=status.HTTP_200_OK)
def getAll_Users():
    return db.query(usermodel.User).all()





@app.get("/user/{ID}", response_model=User, status_code=status.HTTP_200_OK)
def get_user_by_username(ID: int, db: Session = Depends(get_db)):
    find_user = db.query(usermodel.User).filter(usermodel.User.id == ID).first()
    if find_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return find_user





# email error should be done
@app.post("/register", response_model=UserUpdate, status_code=status.HTTP_201_CREATED)
def Register(user: User):
    newUser = usermodel.User(
                          firstname=user.firstname,
                          lastname = user.lastname, 
                          gender = user.gender,
                          email = user.email,
                          username = user.username)
    
    newUser.set_password(user.password)
    
    
    find_user = db.query(usermodel.User).filter(usermodel.User.username == newUser.username).first()
    find_email = db.query(usermodel.User).filter(usermodel.User.email == newUser.email).first()
    
    if newUser.firstname == None or newUser.lastname == None or newUser.gender == None or newUser.email == None or newUser.username == None or newUser.password == None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="All fields are required")
    
    if (newUser.gender not in ['male','female'] ):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail ="Gender must be male or female")
    
    if find_email is not None:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="User with this email already exists")
    
    if find_user is not None:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Username already exists. Try a new one")
    db.add(newUser)
    db.commit()

    
    return newUser






    
@app.post("/login", response_model=OurBaseModel, status_code=status.HTTP_200_OK)
def login(user : UserLogin, db: Session = Depends(get_db)):
    # Find the user by username
    find_user = db.query(usermodel.User).filter(usermodel.User.username == user.username).first()

    # Check if user exists
    if find_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Verify the password
    if not find_user.verify_password(user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    return find_user






@app.delete("/delete/{id}", status_code=200)
def deleteUser(id:int):
    find_user = db.query(usermodel.User).filter(usermodel.User.id == id).first()
    if find_user is not None:
        db.delete(find_user)
        db.commit()
        return {"message" : "User deleted successfully"}
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    



