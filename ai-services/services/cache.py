import redis
import hashlib
import json

# Redis connection
redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

TTL_SECONDS = 900  # 15 minutes

def generate_key(prompt: str):
    return hashlib.sha256(prompt.encode()).hexdigest()

def get_cached(prompt: str):
    try:
        key = generate_key(prompt)
        data = redis_client.get(key)
        if data:
            return json.loads(data)
    except:
        return None
    return None

def set_cache(prompt: str, response: dict):
    try:
        key = generate_key(prompt)
        redis_client.setex(key, TTL_SECONDS, json.dumps(response))
    except:
        pass