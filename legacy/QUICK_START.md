# Quick Start Guide - Contact Form Email Setup

## ⚡ Quick Setup

### 1. Get Your Gmail Refresh Token

Visit the OAuth2 Playground: https://developers.google.com/oauthplayground

Follow these steps:
1. Click ⚙️ (Settings) → "Use your own OAuth credentials"
2. Enter:
   - Client ID: `your_client_id` (from Google Cloud Console)
   - Client Secret: `your_client_secret` (from Google Cloud Console)
3. Select scope: `https://mail.google.com/`
4. Click "Authorize APIs" and sign in with the Gmail account
5. Click "Exchange authorization code for tokens"
6. Copy the **Refresh Token**

### 2. Update .env File

Open `.env` and add your refresh token:
```
GMAIL_REFRESH_TOKEN=your_refresh_token_here
```

### 3. Run the Application

**Option A: Run both frontend and backend together**
```bash
npm run dev:all
```

**Option B: Run separately**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server
```

### 4. Test the Contact Form

1. Open http://localhost:5173
2. Navigate to the contact section
3. Fill out the form and submit
4. Check `sales@tertiarycourses.com.sg` for the email!

## 📋 Environment Variables

Your `.env` file should look like this:
```env
# Gmail OAuth2 Configuration
GMAIL_USER=your_gmail_address
GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REFRESH_TOKEN=your_refresh_token

# Server Port
PORT=3001

# API URL
VITE_API_URL=http://localhost:3001
```

## 🚀 Production Deployment (Coolify)

1. Set these environment variables in Coolify:
   ```
   GMAIL_USER=your_gmail_address
   GMAIL_CLIENT_ID=your_client_id
   GMAIL_CLIENT_SECRET=your_client_secret
   GMAIL_REFRESH_TOKEN=your_refresh_token
   PORT=3001
   VITE_API_URL=https://your-production-api-url.com
   ```

2. Deploy both:
   - Frontend (Vite app)
   - Backend (Node server)

## 🔍 Troubleshooting

**Error: "Failed to get access token"**
- Generate a new refresh token

**Emails not sending?**
- Check server logs: Look for error messages
- Test the API directly:
  ```bash
  curl -X POST http://localhost:3001/api/contact \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Test",
      "email": "test@example.com",
      "message": "Test message"
    }'
  ```

**CORS errors?**
- Make sure backend is running on port 3001
- Frontend should be on port 5173 (Vite default)

## 📚 More Information

See `EMAIL_SETUP.md` for detailed setup instructions.
