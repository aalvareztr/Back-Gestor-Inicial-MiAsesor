import { Contrato } from "../models/Contrato.js";
import { Cliente } from "../models/Cliente.js";
import { PPC } from "../models/PPC.js";
import { Plan } from "../models/Plan.js";
import { Representante } from "../models/Representante.js";
import { transporter } from "../../config/nodemailer.js";


export async function getContratos (req,res){
    try {
        const contratos = await Contrato.findAll({
            attributes: [
                ['fecha', 'fecha'],
                ['id', 'idContrato'],
            ],
            include: {
                model: Cliente,
                attributes: [
                    ['rut','idCliente'],
                    'razon_social'
                ],
            },
            raw: true, // Esto devuelve resultados como objetos planos en lugar de instancias de Sequelize
            nest: true,
        });
        return res.status(200).json({contratos})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:error})
    }
}


export async function getContratoDetail (req,res) {
    const idContrato = req.params.id
    try {
        const detalle = await Contrato.findOne({
            attributes:[
                'id'
            ],
            include: {
                model: Cliente,
                attributes: [
                    'razon_social',
                    'tipo',
                    'rut',
                    'mail',
                    'telefono'
                ]
            },
            where: {
                id : idContrato
            },
            raw: true,
            nest: true,
            where: {
                id : idContrato
            }
        });
        const planes = await PPC.findAll({
            attributes: [],
            include: {
                model: Plan,
                attributes: [
                    'nombre',
                    'precio',
                    'descripcion',
                    'mes_de_gracia'
                ]
            },
            where: {
                id_contrato : idContrato
            },
            raw: true,
            nest: true,
        })
        const representantes = await Representante.findOne({
            attributes: [
                'rut',
                'nombre'
            ],
            where:{id_cliente:detalle.Cliente.rut}
        })
        return res.status(200).json({detalle,planes,representantes})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:error})
    }
}


//funcion del backennd:

export async function sendContrato (req,res){
    const { 
        //destinatario, asunto
        adjunto } = req.body;
    const mailOptions = {
        from: 'agosalvarezz1999@gmail.com',
        //por ahora voy a dejar uno fijo
        to: "aalvarez@wecom.global",
        //asunto
        subject: "Contrato Mi Asesor",
        //text: "Plaintext version of the message",
        //html: "<p>HTML version of the message</p>",
        attachments: [
          {
            filename: 'contrato.pdf',
            content: adjunto,
            encoding: 'base64',
          },
        ],
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        return res.status(200).send('Contrato enviado por correo electrónico.');
    } catch (err) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).send('Error al enviar el correo electrónico.');
    }
}