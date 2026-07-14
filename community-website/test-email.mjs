

const apiKey = process.env.NIVI_PULSE_API_KEY;

if (!apiKey) {
  console.error("No API key found in .env.local");
  process.exit(1);
}

async function testEmail() {
  console.log("Testing Nivi Pulse email API...");
  
  const payload = {
    to: "er.karansrivastava@gmail.com",
    from: "noreply@innovateweb.org",
    subject: "Registration Confirmed! 🎉",
    html: `<!DOCTYPE html>
<html lang="en">
<body>
  <h1>Registration Confirmed! 🎉</h1>
  <p>Hi Test User,</p>
  <p>Event: Local Test Event</p>
  <p>Time: 10:00 AM</p>
  <p>Location: Virtual</p>
</body>
</html>`
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
      console.log("Response:", data);
    } else {
      console.error("❌ Failed to send email.");
      console.error("Status:", res.status);
      console.error("Response:", data);
    }
  } catch (error) {
    console.error("❌ Request failed:", error);
  }
}

testEmail();
