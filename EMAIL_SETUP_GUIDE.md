# Email Setup Guide for Multi-User Support

## How to Use Your Own Gmail Account

Your AI assistant now supports multiple users sending emails through their own Gmail accounts. Here's how to set it up:

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate an App Password
1. In Google Account settings, go to Security
2. Under "2-Step Verification", click "App passwords"
3. Select "Mail" as the app
4. Select "Other" as the device and name it "AI Assistant"
5. Copy the generated 16-character password

### Step 3: Use Your Credentials
When asking the AI to send an email, provide:
- Your Gmail address (e.g., `yourname@gmail.com`)
- Your App Password (the 16-character code from Step 2)

### Example Usage:
```
"Send an email to john@example.com with subject 'Meeting Tomorrow' and message 'Let's meet at 2 PM'. Use my email yourname@gmail.com with app password abcd efgh ijkl mnop"
```

### Security Notes:
- Never share your regular Gmail password
- Only use App Passwords for this service
- App Passwords are safer than regular passwords
- You can revoke App Passwords anytime from your Google Account

### System Default (Optional):
If you want to set up a system default email account, create a `.env` file with:
```
GMAIL_USER=your-default-email@gmail.com
GMAIL_APP_PASSWORD=your-default-app-password
```

This way, users who don't provide their own credentials will use the system default.
