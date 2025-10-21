export const getAdminEmailTemplate = (formData) => {
  const { name, email, phone, subject, message, propertyType, location, budget } = formData

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0B5D48 0%, #16855D 100%); padding: 30px 40px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
            New Contact Form Submission
          </h1>
          <p style="color: #E8F5E8; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            Evernal Group - Admin Notification
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px;">
          
          <!-- Alert Banner -->
          <div style="background-color: #FFF3CD; border: 1px solid #FFEAA7; border-radius: 8px; padding: 15px; margin-bottom: 30px;">
            <p style="margin: 0; color: #856404; font-weight: 500; font-size: 14px;">
              New inquiry received - Please respond within 24 hours
            </p>
          </div>

          <!-- Customer Information -->
          <div style="background-color: #F8F9FA; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
            <h3 style="color: #0B5D48; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #E9ECEF; padding-bottom: 10px;">
              Customer Information
            </h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; width: 120px; color: #6C757D; font-weight: 500; font-size: 14px;">Name:</td>
                <td style="padding: 8px 0; color: #212529; font-weight: 600; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6C757D; font-weight: 500; font-size: 14px;">Email:</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${email}" style="color: #0B5D48; text-decoration: none; font-weight: 600; font-size: 14px;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6C757D; font-weight: 500; font-size: 14px;">Phone:</td>
                <td style="padding: 8px 0;">
                  <a href="tel:${phone || "N/A"}" style="color: #0B5D48; text-decoration: none; font-weight: 600; font-size: 14px;">${phone || "Not provided"}</a>
                </td>
              </tr>
              ${
                location
                  ? `
              <tr>
                <td style="padding: 8px 0; color: #6C757D; font-weight: 500; font-size: 14px;">Location:</td>
                <td style="padding: 8px 0; color: #212529; font-weight: 600; font-size: 14px;">${location}</td>
              </tr>
              `
                  : ""
              }
              ${
                propertyType
                  ? `
              <tr>
                <td style="padding: 8px 0; color: #6C757D; font-weight: 500; font-size: 14px;">Property Type:</td>
                <td style="padding: 8px 0; color: #212529; font-weight: 600; font-size: 14px;">${propertyType}</td>
              </tr>
              `
                  : ""
              }
              ${
                budget
                  ? `
              <tr>
                <td style="padding: 8px 0; color: #6C757D; font-weight: 500; font-size: 14px;">Budget:</td>
                <td style="padding: 8px 0; color: #212529; font-weight: 600; font-size: 14px;">₹${budget}</td>
              </tr>
              `
                  : ""
              }
            </table>
          </div>

          <!-- Inquiry Details -->
          <div style="background-color: #F8F9FA; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
            <h3 style="color: #0B5D48; margin: 0 0 15px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #E9ECEF; padding-bottom: 10px;">
              Inquiry Details
            </h3>
            
            <div style="margin-bottom: 15px;">
              <p style="margin: 0 0 5px 0; color: #6C757D; font-weight: 500; font-size: 14px;">Subject:</p>
              <p style="margin: 0; color: #212529; font-weight: 600; font-size: 16px; background-color: #FFFFFF; padding: 10px; border-radius: 6px; border-left: 4px solid #0B5D48;">
                ${subject}
              </p>
            </div>
            
            <div>
              <p style="margin: 0 0 5px 0; color: #6C757D; font-weight: 500; font-size: 14px;">Message:</p>
              <div style="background-color: #FFFFFF; padding: 15px; border-radius: 6px; border-left: 4px solid #16855D; line-height: 1.6;">
                <p style="margin: 0; color: #212529; font-size: 14px; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #0B5D48 0%, #16855D 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; font-size: 14px; margin: 0 10px; box-shadow: 0 4px 15px rgba(11, 93, 72, 0.3);">
              Reply via Email
            </a>
            <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #CBA135 0%, #E6B800 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; font-size: 14px; margin: 0 10px; box-shadow: 0 4px 15px rgba(203, 161, 53, 0.3);">
              Call Now
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #F8F9FA; padding: 20px 40px; text-align: center; border-top: 1px solid #E9ECEF;">
          <p style="margin: 0; color: #6C757D; font-size: 12px;">
            This email was automatically generated from the Evernal Group website contact form.
          </p>
          <p style="margin: 5px 0 0 0; color: #6C757D; font-size: 12px;">
            Received on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </p>
        </div>

      </div>
    </body>
    </html>
  `
}

export const getUserEmailTemplate = (formData) => {
  const { name, subject } = formData;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Thank You - Evernal Group</title>
    <style>
      @media only screen and (max-width: 600px) {

        .container {
          padding: 20px !important;
        }
        h1, h2, h3 {
          font-size: 90% !important;
        }
        .step-number {
          width: 20px !important;
          height: 20px !important;
          font-size: 10px !important;
        }
        .contact-button {
          padding: 8px 15px !important;
          font-size: 12px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
    <div class="container" style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0B5D48 0%, #16855D 100%); padding: 40px; text-align: center; color: #fff; position: relative;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700;">EVERNAL GROUP</h1>
        <p style="margin: 5px 0 0; font-size: 14px;">Premium Property Solutions</p>
      </div>

      <!-- Thank You Message -->
      <div style="padding: 30px; text-align: center;">
        <div style="margin-bottom: 20px;">
          <div style="display: inline-block; background: #E8F5E8; padding: 20px; border-radius: 50%;">
            <span style="font-size: 36px;">✅</span>
          </div>
        </div>
        <h2 style="margin: 0 0 10px; color: #0B5D48;">Thank You, ${name}!</h2>
        <p style="color: #6C757D; font-size: 15px;">We've received your inquiry and truly appreciate you contacting us.</p>
      </div>

      <!-- Inquiry Summary -->
      <div style="background: #F1F3F5; padding: 20px 30px; margin: 0 30px 30px; border-left: 4px solid #0B5D48; border-radius: 6px;">
        <h3 style="margin: 0 0 10px; color: #0B5D48; font-size: 16px;">Your Inquiry Summary</h3>
        <p style="margin: 0 0 5px; color: #6C757D; font-size: 14px;">Subject:</p>
        <p style="margin: 0; padding: 10px; background: #fff; border-radius: 5px; font-weight: 600; color: #212529; font-size: 15px;">${subject}</p>
      </div>

      <!-- What Happens Next -->
      <div style="background: #FFF9E6; padding: 25px 30px; margin: 0 30px 30px; border: 1px solid #FFE066; border-radius: 8px;">
        <h3 style="margin: 0 0 20px; color: #B8860B; font-size: 16px;">What Happens Next?</h3>

        <!-- Steps -->
        <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <div class="step-number" style="background: #0B5D48; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">1</div>
          <div>
            <p style="margin: 0; font-weight: 600;">Review & Analysis</p>
            <p style="margin: 5px 0 0; font-size: 13px; color: #6C757D;">We will review your requirements within 2–4 hours.</p>
          </div>
        </div>

        <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <div class="step-number" style="background: #16855D; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">2</div>
          <div>
            <p style="margin: 0; font-weight: 600;">Personal Contact</p>
            <p style="margin: 5px 0 0; font-size: 13px; color: #6C757D;">A dedicated consultant will connect with you within 24 hours.</p>
          </div>
        </div>

        <div style="display: flex; align-items: flex-start;">
          <div class="step-number" style="background: #CBA135; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">3</div>
          <div>
            <p style="margin: 0; font-weight: 600;">Customized Solutions</p>
            <p style="margin: 5px 0 0; font-size: 13px; color: #6C757D;">We’ll present tailored options based on your needs.</p>
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div style="background: linear-gradient(135deg, #0B5D48 0%, #16855D 100%); padding: 25px 20px; text-align: center; color: #fff; border-radius: 0 0 8px 8px;">
        <h3 style="margin: 0 0 15px;">Need Immediate Help?</h3>
        <a href="tel:+919876543210" class="contact-button" style="margin: 5px; display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.15); color: #fff; text-decoration: none; border-radius: 20px;">📱 +91 98765 43210</a>
        <a href="mailto:info@evernalgroup.com" class="contact-button" style="margin: 5px; display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.15); color: #fff; text-decoration: none; border-radius: 20px;">✉️ info@evernalgroup.com</a>
      </div>

      <!-- Footer -->
      <div style="padding: 20px; text-align: center; font-size: 13px; color: #6C757D;">
        <p style="margin: 0; font-weight: 600; color: #0B5D48;">EVERNAL GROUP</p>
        <p style="margin: 5px 0;">Your Trusted Partner in Premium Property Solutions</p>
        <p style="margin: 5px 0; font-size: 12px;">This is an automated email. Please do not reply.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

