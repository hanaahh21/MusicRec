import pytest
import requests
import time

ENDPOINT = "http://localhost:8000"

def test_login_performance():
    
        login_data = {
            "username": "alice123",
            "password": "password123"
        }
        start_time = time.time()  # Start timing
        response = requests.post(ENDPOINT + "/login", json=login_data)
        elapsed_time = time.time() - start_time  # Calculate elapsed time
        
        data = response.json()
        print(data)
        print(f"Register endpoint execution time: {elapsed_time:.4f} seconds")
        
        assert response.status_code == 200