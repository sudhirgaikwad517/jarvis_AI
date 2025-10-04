const connectButton = document.getElementById('connect-button');
const roomNameInput = document.getElementById('room-name');
const videoDisplay = document.getElementById('video-display');
const localVideo = document.getElementById('local-video');
const remoteVideoContainer = document.getElementById('remote-video-container');
const connectionForm = document.getElementById('connection-form');

const { Room, RoomEvent } = livekit;

// This URL is taken directly from your .env file
const livekitUrl = "wss://jarvis-f439vpiq.livekit.cloud"; /* [cite: 2] */

connectButton.onclick = async () => {
    connectionForm.style.display = 'none';
    videoDisplay.style.display = 'block';

    const roomName = roomNameInput.value;
    const userName = `user_${Math.floor(Math.random() * 1000)}`;

    // 1. Fetch token from our token server (running on port 8080)
    const response = await fetch(`http://localhost:8080/get-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName, identity: userName }),
    });
    const { token } = await response.json();

    // 2. Connect to the LiveKit room
    const room = new Room({
        adaptiveStream: true,
        dynacast: true,
    });

    await room.connect(livekitUrl, token);

    // 3. Publish user's camera and microphone
    await room.localParticipant.enableCameraAndMicrophone();
    room.localParticipant.videoTrackPublications.forEach(pub => {
        if (pub.track) {
            localVideo.srcObject = pub.track.mediaStream;
        }
    });

    // 4. Handle when the AI agent joins and publishes its tracks
    room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        const element = track.attach();
        remoteVideoContainer.appendChild(element);
    });
};