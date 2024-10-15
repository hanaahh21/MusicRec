import pytest
import requests
import time

ENDPOINT = "http://localhost:8000"

def test_getuserbyid_performance():
    
        user_id = 8
        start_time = time.time()  # Start timing
        response = requests.get(f"{ENDPOINT}/user/{user_id}")
        elapsed_time = time.time() - start_time  # Calculate elapsed time
        
        data = response.json()
        print(data)
        print(f"Getuser endpoint execution time: {elapsed_time:.4f} seconds")
        
        assert response.status_code == 200