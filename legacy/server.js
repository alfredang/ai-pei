import express from 'express'
import cors from 'cors'
import pkg from 'nodemailer'
const { createTransport } = pkg
import { google } from 'googleapis'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const OAuth2 = google.auth.OAuth2

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Middleware
app.use(cors())
app.use(express.json())

// Create OAuth2 transporter
const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  })

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.error('Failed to get access token:', err)
        reject(err)
      }
      resolve(token)
    })
  })

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER,
      accessToken,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  })

  return transporter
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, and message are required',
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // Create email transporter
    const emailTransporter = await createTransporter()

    // Email HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
              <p style="margin: 0; opacity: 0.9;">Tertiary Infotech Academy Website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${
                company
                  ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${company}</div>
              </div>
              `
                  : ''
              }
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                <p>This email was sent from the Tertiary Infotech Academy contact form.</p>
                <p>Reply to: ${email}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email
    const mailOptions = {
      from: `"Tertiary Infotech Website" <${process.env.GMAIL_USER}>`,
      to: 'sales@tertiarycourses.com.sg',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: htmlContent,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

Message:
${message}

---
This email was sent from the Tertiary Infotech Academy contact form.
Reply to: ${email}
      `.trim(),
    }

    const info = await emailTransporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)

    res.json({
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully',
    })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message,
    })
  }
})

// Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Create model with system instructions about the website
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `You are a helpful assistant for Tertiary Infotech Academy, a leading provider of professional training and IT solutions in Singapore.

About Tertiary Infotech Academy:
- Located at: 12 Woodlands Square, #07-85/86/87, Woods Square Tower 1, Singapore 737715
- UEN: 201200606W
- Contact: sales@tertiarycourses.com.sg
- Website: https://tertiaryinfo.tech

Our Services:
1. Professional IT Training
2. Corporate Training Solutions
3. Custom Software Development
4. Web and Mobile App Development
5. IT Consulting Services

Our Portfolio includes:
- TertiaryInfo (https://www.tertiaryinfo.com) - Comprehensive IT training platform
- TertiaryCourses (https://www.tertiarycourses.com) - Course catalog and booking system
- TertiaryFX (https://www.tertiaryfx.com) - Foreign exchange trading platform
- MelodyMinds (https://www.melodyminds.com) - Music education platform
- Various corporate training projects and custom solutions

Your role is to:
- Answer questions about our services, training programs, and portfolio
- Help visitors understand what we offer
- Provide information about course availability and corporate training
- Direct users to contact us for specific inquiries or bookings
- Be professional, friendly, and helpful
- If you don't know something specific, encourage them to contact us directly

Always maintain a professional yet approachable tone.`,
    })

    // Start chat with history
    const chat = model.startChat({
      history: history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    })

    // Send message and get response
    const result = await chat.sendMessage(message)
    const response = result.response.text()

    res.json({
      response,
      success: true,
    })
  } catch (error) {
    console.error('Chatbot error:', error)
    res.status(500).json({
      error: 'Failed to get response from chatbot',
      details: error.message,
    })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`📧 Email service configured with OAuth2`)
  console.log(`🌐 API available at http://localhost:${PORT}/api`)
})
