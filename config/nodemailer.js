import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'agosalvarezz1999@gmail.com',
        pass: 'gvhl indw obld xjar',  // Usa la contraseña de aplicación generada
    },
 });