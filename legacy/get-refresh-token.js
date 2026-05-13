import { google } from 'googleapis'
import http from 'http'
import { parse } from 'url'
import open from 'open'
import dotenv from 'dotenv'

dotenv.config()

const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'http://localhost:3000/oauth2callback'
)

// Generate the url that will be used for authorization
const authorizeUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://mail.google.com/',
  prompt: 'consent', // Force to get refresh token
})

console.log('\n🚀 Starting OAuth2 Token Generator...\n')
console.log('📝 Instructions:')
console.log('1. A browser window will open automatically')
console.log(`2. Sign in with: ${process.env.GMAIL_USER}`)
console.log('3. Grant the requested permissions')
console.log('4. You will be redirected back automatically')
console.log('5. Your refresh token will be displayed here\n')

// Create a simple HTTP server to handle the OAuth callback
const server = http.createServer(async (req, res) => {
  if (req.url.indexOf('/oauth2callback') > -1) {
    const qs = parse(req.url, true).query

    if (qs.error) {
      console.error('❌ Error:', qs.error)
      res.end('Error occurred. Check the console.')
      server.close()
      return
    }

    console.log('✅ Authorization successful!')
    console.log('🔄 Exchanging code for tokens...\n')

    try {
      const { tokens } = await oauth2Client.getToken(qs.code)

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('✅ SUCCESS! Your tokens:')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
      console.log('🔑 REFRESH TOKEN (copy this to your .env file):')
      console.log(tokens.refresh_token)
      console.log('\n📋 Full token response:')
      console.log(JSON.stringify(tokens, null, 2))
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('\n📝 Next steps:')
      console.log('1. Copy the refresh token above')
      console.log('2. Update your .env file:')
      console.log('   GMAIL_REFRESH_TOKEN=paste_token_here')
      console.log('3. Run: npm run dev:all')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

      res.end(`
        <html>
          <head>
            <title>OAuth Success</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              }
              .container {
                background: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                text-align: center;
                max-width: 500px;
              }
              h1 { color: #667eea; margin: 0 0 20px 0; }
              p { color: #666; line-height: 1.6; }
              .success { color: #10b981; font-size: 48px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success">✅</div>
              <h1>Authentication Successful!</h1>
              <p>Your refresh token has been generated.</p>
              <p><strong>Check your terminal for the token.</strong></p>
              <p>You can close this window now.</p>
            </div>
          </body>
        </html>
      `)

      setTimeout(() => {
        server.close()
        process.exit(0)
      }, 1000)
    } catch (error) {
      console.error('❌ Error getting tokens:', error.message)
      res.end('Error getting tokens. Check the console.')
      server.close()
    }
  }
})

server.listen(3000, async () => {
  console.log('🌐 Server listening on http://localhost:3000')
  console.log('🔓 Opening browser for authorization...\n')

  try {
    await open(authorizeUrl)
  } catch (error) {
    console.log('⚠️  Could not open browser automatically.')
    console.log('📋 Please open this URL manually:')
    console.log(authorizeUrl)
  }
})
