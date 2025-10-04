# 🎤 Voice Processing Flow - Complete Pipeline

## Step-by-Step Process

```
1. 🎤 MICROPHONE CAPTURE
   User speaks: "Send email to john@example.com..."
   ↓
   Browser captures audio via microphone
   ↓

2. 📡 AUDIO STREAMING  
   Audio streamed to LiveKit server
   ↓
   Noise cancellation applied (BVC)
   ↓

3. 🧠 SPEECH-TO-TEXT (Google RealtimeModel)
   Audio → Text conversion
   ↓
   "Send email to john@example.com with subject 'Meeting' and message 'Let's meet tomorrow'. Use my email myname@gmail.com with app password abcd efgh ijkl mnop"
   ↓

4. 🤖 AI PROCESSING (LLM)
   Text analyzed by AI assistant
   ↓
   Intent: "User wants to send email"
   ↓
   Function: "send_email"
   ↓

5. 📝 PARAMETER EXTRACTION
   AI extracts parameters from text:
   ↓
   to_email = "john@example.com"
   subject = "Meeting"
   message = "Let's meet tomorrow"
   from_email = "myname@gmail.com"
   from_password = "abcd efgh ijkl mnop"
   ↓

6. 🔧 FUNCTION CALL
   AI generates function call:
   ↓
   send_email(
       to_email="john@example.com",
       subject="Meeting", 
       message="Let's meet tomorrow",
       from_email="myname@gmail.com",
       from_password="abcd efgh ijkl mnop"
   )
   ↓

7. 📧 EMAIL SENDING
   Function executes with extracted parameters
   ↓
   Email sent successfully
```

## Key Technologies

### 1. **Google RealtimeModel**
- **Purpose**: Real-time speech-to-text conversion
- **Features**: Continuous listening, low latency
- **Voice**: "Aoede" (configurable voice)

### 2. **LiveKit Agents Framework**
- **Purpose**: Handles audio streaming and processing
- **Features**: Noise cancellation, real-time communication
- **Integration**: Seamless connection between frontend and backend

### 3. **Function Calling (LLM)**
- **Purpose**: Converts natural language to function parameters
- **Process**: Intent recognition → Parameter extraction → Function call
- **Tools**: Uses `@function_tool()` decorators

## Security Considerations

### ✅ **What's Secure:**
- **No Storage**: Credentials only exist during function execution
- **Memory Only**: Parameters stored in memory, not on disk
- **TLS Encryption**: All communication encrypted
- **App Passwords**: Uses Gmail App Passwords (safer than regular passwords)

### ⚠️ **What to Be Aware Of:**
- **Voice Logging**: Ensure voice data isn't logged
- **Network Security**: Use secure connections
- **Credential Handling**: Never log or store user credentials

## Example: Complete Voice-to-Variable Flow

### Input (Your Voice):
```
"Send email to alice@company.com with subject 'Project Update' and message 'The project is on track'. Use my email bob@gmail.com with app password xyz1 abc2 def3 ghi4"
```

### Processing:
1. **Speech-to-Text**: Audio converted to text string
2. **AI Analysis**: Intent and parameters identified
3. **Variable Assignment**:
   ```python
   to_email = "alice@company.com"
   subject = "Project Update"
   message = "The project is on track"
   from_email = "bob@gmail.com"
   from_password = "xyz1 abc2 def3 ghi4"
   ```

### Output:
- Email sent from bob@gmail.com to alice@company.com
- Credentials discarded from memory
- Success confirmation returned to user
