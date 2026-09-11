import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
let apiKey = '';
for (const line of envFile.split('\n')) {
  if (line.startsWith('NIVI_PULSE_API_KEY=')) {
    apiKey = line.split('=')[1].trim().replace(/^"|"$/g, '');
  }
}

if (!apiKey) {
  console.error("No API key found in .env.local");
  process.exit(1);
}

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reminder: Event Today - Innovate Web</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f7fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    table { border-spacing: 0; border-collapse: collapse; }
    td { padding: 0; }
    img { border: 0; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #f4f7fb; padding-bottom: 60px; }
    .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; font-family: sans-serif; color: #333333; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); margin-top: 40px; }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main" width="100%">
      <tr>
        <td style="background-color: #0ea5e9; padding: 40px 0; text-align: center;">
          <img src="https://innovateweb.org/images/white-logo.png" alt="Innovate Web Logo" width="200" style="max-width: 200px; height: auto;">
        </td>
      </tr>
      <tr>
        <td style="padding: 40px 30px;">
          <h1 style="margin: 0 0 20px 0; font-size: 24px; color: #1e293b; text-align: center;">Reminder: See You Today! 🚀</h1>
          <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #475569;">Hi Karan,</p>
          <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 24px; color: #475569;">
            This is a quick reminder that <strong>The AI Shift: AI for Business and Developers</strong> is happening <strong>on 18 July</strong>! We can't wait to see you there and share an incredible experience with the Innovate Web community.
          </p>
          <table width="100%" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
            <tr>
              <td style="padding: 20px;">
                <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Event Details</h3>
                <table width="100%">
                  <tr><td style="padding-bottom: 10px; width: 30%; font-size: 14px; color: #64748b; font-weight: bold;">Event:</td><td style="padding-bottom: 10px; font-size: 15px; color: #334155;"><strong>The AI Shift: AI for Business and Developers</strong></td></tr>
                  <tr><td style="padding-bottom: 10px; font-size: 14px; color: #64748b; font-weight: bold;">Date:</td><td style="padding-bottom: 10px; font-size: 15px; color: #334155;">18 July</td></tr>
                  <tr><td style="padding-bottom: 10px; font-size: 14px; color: #64748b; font-weight: bold;">Time:</td><td style="padding-bottom: 10px; font-size: 15px; color: #334155;">4:00 PM - 7:00 PM</td></tr>
                  <tr><td style="padding-bottom: 0px; font-size: 14px; color: #64748b; font-weight: bold;">Location:</td><td style="padding-bottom: 0px; font-size: 15px; color: #334155;">Cubispace, 2nd Floor, JSV Hyundai Building CP-53, near Engineering College Chauraha, Lucknow</td></tr>
                </table>
              </td>
            </tr>
          </table>

          <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 24px; color: #475569; text-align: center;">
            If you have any questions before the event, feel free to connect with us at 9429692542
          </p>
          <table width="100%">
            <tr>
              <td align="center">
                <a href="https://www.google.com/maps/dir//Cubispace,+2nd+Floor,+JSV+Hyundai+Building+CP-53,+near+Engineering+College+Chauraha,+near+CNG+Petrol+Pump,+Lucknow,+Uttar+Pradesh+226021/@26.9109169,80.9464606,17z/data=!4m17!1m7!3m6!1s0x399957732a46274b:0xe09917f505f98e8f!2sCubispace!8m2!3d26.9109169!4d80.9464606!16s%2Fg%2F11ptq671jp!4m8!1m0!1m5!1m1!1s0x399957732a46274b:0xe09917f505f98e8f!2m2!1d80.9464606!2d26.9109169!3e9?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D" style="background-color: #0ea5e9; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block; margin: 6px;">Get Directions</a>
                <a href="https://chat.whatsapp.com/IerKyZQLwNoFcWgaGOjO5N" style="background-color: #ffffff; color: #0ea5e9; border: 2px solid #0ea5e9; text-decoration: none; padding: 12px 26px; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block; margin: 6px;">Join Community</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f1f5f9; padding: 30px; text-align: center; font-size: 14px; color: #64748b; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0 0 10px 0;">Innovate Web Community<br>Building the future of the web, together.</p>
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">You received this email because you registered for an Innovate Web event.</p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;

async function testEmail() {
  console.log("Sending test reminder email...");
  const payload = {
    to: "karan@genxwebhosting.us",
    from: "noreply@innovateweb.org",
    subject: "Reminder: See You Today! 🚀",
    html: htmlTemplate
  };
  try {
    const res = await fetch("https://api.nivipulse.in/api/v1/transactional/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      console.log("✅ Success! Email sent.");
    } else {
      console.error("❌ Failed to send email.");
      console.error("Response:", data);
    }
  } catch (error) {
    console.error("❌ Request failed:", error);
  }
}
testEmail();
