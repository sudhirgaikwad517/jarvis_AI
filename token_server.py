import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from livekit import api

# Load credentials from environment variables
LIVEKIT_URL = os.getenv("LIVEKIT_URL", "")
LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY", "")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET", "")

# The LiveKit Server SDK needs an HTTP URL, not a WSS URL
http_url = LIVEKIT_URL.replace("wss://", "https://").replace("ws://", "http://")

app = FastAPI()

# Allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TokenRequest(BaseModel):
    roomName: str
    identity: str

@app.post("/get-token")
async def get_token(request: TokenRequest):
    """Generates a LiveKit access token."""
    token = (
        api.AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET)
        .with_identity(request.identity)
        .with_name(request.identity)
        .with_grant(api.VideoGrant(room_join=True, room=request.roomName))
    )
    return {"token": token.to_jwt()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)