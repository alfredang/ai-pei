# Email Setup Guide - Gmail OAuth2

This guide will help you set up Gmail OAuth2 for the contact form.

## What You Have

✅ Client ID: (from Google Cloud Console → Credentials → OAuth 2.0 Client IDs)
✅ Client Secret: (from Google Cloud Console → Credentials → OAuth 2.0 Client IDs)
✅ Gmail Account: (your Gmail address)

## What You Need

❌ **Refresh Token** - Follow the steps below to get it

## Steps to Get Refresh Token

### Method 1: Using OAuth2 Playground (Recommended)

1. **Go to OAuth 2.0 Playground**
   - Visit: https://developers.google.com/oauthplayground

2. **Configure OAuth2 Settings**
   - Click the gear icon (⚙️) in the top right
   - Check "Use your own OAuth credentials"
   - Enter your Client ID (from `.env` file)
   - Enter your Client Secret (from `.env` file)
   - Click "Close"

3. **Select Scopes**
   - In the left panel, find "Gmail API v1"
   - Select: `https://mail.google.com/` (Full Gmail access)
   - Click "Authorize APIs"

4. **Authorize**
   - Sign in with `sales@tertiarycourses.com.sg`
   - Grant the requested permissions

5. **Get Refresh Token**
   - After authorization, you'll be redirected back
   - Click "Exchange authorization code for tokens"
   - Copy the **Refresh Token** (it starts with `1//`)

6. **Update .env File**
   - Open `.env` in the project root
   - Paste the refresh token:
     ```
     GMAIL_REFRESH_TOKEN=your_refresh_token_here
     ```

### Method 2: Using the Helper Script

Run the token generator script (if you prefer a command-line approach):

```bash
node generate-token.js
```

## Testing the Email Service

1. **Start the backend server:**
   ```bash
   npm run server
   ```

2. **Test the health endpoint:**
   ```bash
   curl http://localhost:3001/api/health
   ```

3. **Test sending an email:**
   ```bash
   curl -X POST http://localhost:3001/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "company": "Test Company",
       "message": "This is a test message"
     }'
   ```

## Running Both Frontend and Backend

```bash
npm run dev:all
```

This will start:
- Frontend (Vite): http://localhost:5173
- Backend (Express): http://localhost:3001

## Important Notes

- **Never commit `.env`** to Git (it's already in `.gitignore`)
- Keep your Client Secret and Refresh Token secure
- The refresh token doesn't expire unless revoked
- Emails will be sent from `sales@tertiarycourses.com.sg`
- All contact form submissions will be sent to `sales@tertiarycourses.com.sg`

## Troubleshooting

### Error: "Invalid grant"
- Your refresh token may have expired or been revoked
- Generate a new refresh token using the OAuth Playground

### Error: "Unauthorized client"
- Make sure your Client ID and Secret are correct
- Verify that the Gmail API is enabled in Google Cloud Console

### Error: "Access blocked"
- Make sure the app is not in testing mode in Google Cloud Console
- Or add `sales@tertiarycourses.com.sg` as a test user

## Production Deployment

For production (Coolify):
1. Set environment variables in Coolify dashboard:
   - `GMAIL_USER`
   - `GMAIL_CLIENT_ID`
   - `GMAIL_CLIENT_SECRET`
   - `GMAIL_REFRESH_TOKEN`
   - `PORT`
   - `VITE_API_URL` (your production API URL)

2. Deploy both frontend and backend
3. Update CORS settings if needed
