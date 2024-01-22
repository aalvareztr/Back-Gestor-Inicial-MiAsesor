

//Archivo contratosControllers.js

import { Contrato } from "../models/Contrato.js";
import { Cliente } from "../models/Cliente.js";
import { PPC } from "../models/PPC.js";
import { Plan } from "../models/Plan.js";
import { Representante } from "../models/Representante.js";


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