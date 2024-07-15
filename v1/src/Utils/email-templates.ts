export const resetPassMail = ( resetLink: string ) => {
    const message = `
    <div style="font-family: sans-serif; font-size: 16px; line-height: 1.5;">
      <p>Hello!</p>
      <p>
        We received a request to reset your password. If this was you, please use the link:
      </p>
      <p style="text-align: center;">
        <a href="${resetLink}" target="_blank">
          Reset Password Link
        </a>
      </p>
      <p>
        This link will expire in 1 hour for security reasons. If you didn't request this reset, please disregard this email.
      </p>
    </div>
  `;
    return message;
};

export const confirmReset = () => {
    const message = `
    <div style="font-family: sans-serif; font-size: 16px; line-height: 1.5;">
      <p>Hello!</p>
      <p>
        Congratulations the request to reset your password, was successful.
      <p>
        If you didn't request this reset, please contact our support team.
      </p>
    </div>
  `;
    return message;
};

