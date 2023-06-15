import nodemailer from "nodemailer";

import { Request, Response } from "express";

export const enviarMensajeReq = async (req: Request, res: Response) => {
  const { usuario, incidente, asunto } = req.body;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: usuario.correo,
    subject: "Incidente registro",
    text: "This is a test email sent from Node.js with NodeMailer and TypeScript.",
    html: " ",
  };
  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({
      msg: `Incidente ${incidente.id}Registrado,por favor revise su correo ${usuario.correo} para hacer seguimiento al incidente`,
      usuario,
      info,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      BDStatus: {
        MYSQL_ON: process.env.MYSQLDB_ON,
        MONGODB_ON: process.env.MONGODB_ON,
      },
    });
  }
};

export const enviarMensajeInsideServer = async (
  usuarioDestino: any,
  asunto: string,
  incidente: any,
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: usuarioDestino.correo,
    subject: asunto,
    text: `Tu Incidente ${incidente.inc_nombre} ha sido actualizado por un Administrador.`,
    html: `<html>
    <head>
      <meta charset="utf-8">
      <title>${asunto}</title>
    </head>
    <body>
      <h1>¡Hola, ${usuarioDestino.nombre}!</h1>
      <p>Tu Incidente, ${incidente.inc_nombre} ha sido actualizado por un Administrador.</p>
      <p>Puedes personalizar este contenido como desees.</p>
      <p>Aquí hay un enlace de ejemplo: <a href="https://www.example.com">Enlace de ejemplo</a></p>
      <p>¡Gracias por utilizar Nodemailer!</p>
    </body>
  </html>`,
  };
  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
  } catch (error) {
    console.log(error);
    
  }
};
