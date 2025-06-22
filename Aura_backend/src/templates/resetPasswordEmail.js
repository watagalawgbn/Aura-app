//templates/resetPasswordEmail.js

const resetPasswordTemplate = (userName, resetLink) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Hello ${userName || "there"},</h2>
    <p>You recently requested to reset your password.</p>
    <p>Click the button below to set a new password:</p>
    <a href="${resetLink}" style="
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      margin-top: 10px;
    ">Reset Password</a>
    <p>If you didn't request this, just ignore this email.</p>
    <br/>
    <p>Thanks,</p>
    <p><strong>Your App Team</strong></p>
  </div>
`;

module.exports = resetPasswordTemplate;
