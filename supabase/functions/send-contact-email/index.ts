/// <reference path="../_shared/deno-globals.d.ts" />
/// <reference path="../_shared/remote-modules.d.ts" />

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * Escape HTML special characters to prevent injection in email
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { id, name, email, phone, subject, message } = await req.json();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields for email");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailPass = Deno.env.get("GMAIL_APP_PASSWORD");
    const adminEmail = Deno.env.get("ADMIN_EMAIL");

    if (!gmailUser || !gmailPass) {
      console.error("Gmail SMTP credentials not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!adminEmail) {
      console.error("Admin email not configured");
      return new Response(
        JSON.stringify({ error: "Admin email not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Escape all user input to prevent injection
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedPhone = phone ? escapeHtml(phone) : "N/A";
    const escapedSubject = escapeHtml(subject);
    const escapedMessage = escapeHtml(message);

    // Create plain text email body
    const textBody = `
New Contact Submission from Primexia Website

Name: ${escapedName}
Email: ${escapedEmail}
Phone: ${escapedPhone}
Subject: ${escapedSubject}

Message:
${escapedMessage}

---
Submission ID: ${id}
Submitted at: ${new Date().toISOString()}
    `.trim();

    // Create HTML email body
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin-bottom: 20px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: bold; color: #555; }
    .message { background-color: #f9f9f9; padding: 15px; border-left: 3px solid #007bff; margin-top: 20px; }
    .footer { color: #999; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Submission from Primexia Website</h2>
    </div>
    
    <div class="field">
      <span class="label">Name:</span> ${escapedName}
    </div>
    <div class="field">
      <span class="label">Email:</span> <a href="mailto:${escapedEmail}">${escapedEmail}</a>
    </div>
    <div class="field">
      <span class="label">Phone:</span> ${escapedPhone}
    </div>
    <div class="field">
      <span class="label">Subject:</span> ${escapedSubject}
    </div>
    
    <div class="message">
      <span class="label">Message:</span><br>
      ${escapedMessage.replace(/\n/g, "<br>")}
    </div>
    
    <div class="footer">
      <p>Submission ID: ${id}</p>
      <p>Submitted at: ${new Date().toISOString()}</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Use Deno's built-in SMTP via the denomailer module
    const { SMTPClient } = await import("https://deno.land/x/denomailer@1.6.0/mod.ts");

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: gmailUser,
          password: gmailPass,
        },
      },
    });

    await client.send({
      from: gmailUser,
      to: adminEmail,
      subject: `[Primexia Contact] ${escapedSubject}`,
      content: textBody,
      html: htmlBody,
    });

    await client.close();

    // Log successful email send
    console.log(`[v0] Email sent for submission ${id} from ${escapedEmail}`);

    return new Response(
      JSON.stringify({ success: true, id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("[v0] Error sending email:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
