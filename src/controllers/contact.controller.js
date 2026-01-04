const transporter = require("../config/mail.js");

const sendContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: `${name} <${email}>`,
    to: process.env.MAIL_USER,
    subject: "Nueva consulta desde la web",
    html: `
            <h2>Consulta desde la web</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Mensaje:</strong> ${message}</p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.render("contacto", { success: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error(error);
    res.render("contacto", {
      error:
        "Hubo un error en enviar el mensaje. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};

module.exports = {
  sendContactForm,
};
