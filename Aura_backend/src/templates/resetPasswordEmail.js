//templates/resetPasswordEmail.js

const resetPasswordTemplate = (userName, resetLink) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body>
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #333;">Hello ${userName || "there"},</h2>
    <p style="font-size: 16px; line-height: 1.5;">You recently requested to reset your password.</p>
    <p style="font-size: 16px; line-height: 1.5;">Click the button below to set a new password:</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetLink}" 
         style="background-color: #4CAF50;
                color: white !important;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                font-size: 16px;
                font-weight: bold;
                margin: 10px 0;">
        Reset Password
      </a>
    </div>
    
    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>
    <p style="font-size: 14px; color: #4CAF50; word-break: break-all;">
      ${resetLink}
    </p>
    
    <p style="font-size: 14px; color: #666; margin-top: 20px;">
      If you didn't request this, just ignore this email.
    </p>
    <p style="font-size: 14px; color: #666;">
      If this link doesn't open the app, please make sure Expo Go and your app are installed on your device.
    </p>
    
    <br/>
    <p style="font-size: 16px;">Thanks,</p>
    <p style="font-size: 16px;"><strong>Your Aura Team</strong></p>
  </div>
</body>
</html>
`;

module.exports = resetPasswordTemplate;