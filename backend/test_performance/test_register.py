import pytest
import requests
import time

ENDPOINT = "http://localhost:8000"

def test_register_performance():
    
        user_data = {
            "firstname": "Alice",
            "lastname": "Smith",
            "gender": "female",
            "username": "alice12345",
            "email": "alice123@example.com",
            "password": "password12345"
        }
        start_time = time.time()  # Start timing
        response = requests.post(ENDPOINT + "/register", json=user_data)
        elapsed_time = time.time() - start_time  # Calculate elapsed time
        
        data = response.json()
        print(data)
        print(f"Register endpoint execution time: {elapsed_time:.4f} seconds")
        
        assert response.status_code == 201