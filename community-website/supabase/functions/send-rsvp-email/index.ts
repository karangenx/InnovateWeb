import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      email,
      firstName,
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventUrl,
      uniqueCode,
    } = await req.json()

    // Get the API key from environment variables (you will configure this in Supabase)
    const apiKey = Deno.env.get('NIVI_PULSE_API_KEY')

    if (!apiKey) {
      throw new Error("NIVI_PULSE_API_KEY is not set in environment variables")
    }

    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmed - Innovate Web</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f7fb;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f4f7fb;
      padding-bottom: 60px;
    }
    .main {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      font-family: sans-serif;
      color: #333333;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main" width="100%">
      
      <!-- Header / Logo -->
      <tr>
        <td style="background-color: #0ea5e9; padding: 40px 0; text-align: center;">
          <!-- Replace the src below with the hosted URL of your actual Innovate Web logo -->
          <img src="https://innovateweb.org/images/white-logo.png" alt="Innovate Web Logo" width="200" style="max-width: 200px; height: auto;">
        </td>
      </tr>
      <!-- Body Content -->
      <tr>
        <td style="padding: 40px 30px;">
          <h1 style="margin: 0 0 20px 0; font-size: 24px; color: #1e293b; text-align: center;">Registration Confirmed! 🎉</h1>
          
          <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #475569;">
            Hi ${firstName},
          </p>
          
          <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 24px; color: #475569;">
            You are officially on the list! Thank you for registering. We can't wait to see you there and share an incredible experience with the Innovate Web community.
          </p>
          <!-- Event Details Card -->
          <table width="100%" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
            <tr>
              <td style="padding: 20px;">
                <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
                  Event Details
                </h3>
                
                <table width="100%">
                  <tr>
                    <td style="padding-bottom: 10px; width: 30%; font-size: 14px; color: #64748b; font-weight: bold;">Event:</td>
                    <td style="padding-bottom: 10px; font-size: 15px; color: #334155;"><strong>${eventName}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 10px; font-size: 14px; color: #64748b; font-weight: bold;">Date:</td>
                    <td style="padding-bottom: 10px; font-size: 15px; color: #334155;">${eventDate}</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 10px; font-size: 14px; color: #64748b; font-weight: bold;">Time:</td>
                    <td style="padding-bottom: 10px; font-size: 15px; color: #334155;">${eventTime}</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 0px; font-size: 14px; color: #64748b; font-weight: bold;">Location:</td>
                    <td style="padding-bottom: 0px; font-size: 15px; color: #334155;">${eventLocation}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Unique Ticket Code -->
          <table width="100%" style="background-color: #f8fafc; border-radius: 8px; border: 2px dashed #cbd5e1; margin-bottom: 30px; text-align: center;">
            <tr>
              <td style="padding: 20px;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Your Entry Ticket Code</p>
                <div style="font-size: 28px; font-weight: 900; color: #0ea5e9; letter-spacing: 2px; font-family: monospace;">${uniqueCode}</div>
                <p style="margin: 10px 0 0 0; font-size: 13px; color: #94a3b8;">Please show this code at the registration desk.</p>
              </td>
            </tr>
          </table>
          <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 24px; color: #475569; text-align: center;">
            Please have this email handy when you arrive. If you have any questions before the event, feel free to reply directly to this email.
          </p>
          <!-- Call to Action Button -->
          <table width="100%">
            <tr>
              <td align="center">
                <a href="${eventUrl}" style="background-color: #0ea5e9; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;">View Event Dashboard</a>
              </td>
            </tr>
          </table>
          
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="background-color: #f1f5f9; padding: 30px; text-align: center; font-size: 14px; color: #64748b; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0 0 10px 0;">
            Innovate Web Community<br>
            Building the future of the web, together.
          </p>
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">
            You received this email because you registered for an Innovate Web event.
          </p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;

    const res = await fetch("https://api.nivipulse.in/api/v1/transactional/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        from: "noreply@innovateweb.org",
        subject: "Your Registration for the Innovate Web Meetup Is Confirmed",
        html: htmlTemplate,
      }),
    });

    const data = await res.json()

    if (!res.ok || !data.success) {
      console.error("Nivi Pulse API error:", data)
      throw new Error("Failed to send email")
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
