import { Request, Response } from "express";

const {
  UsuarioM,
  IncidenteM,
  TipoIncidenteM,
  EstadoIncidenteM,
} = require("../models/MongoDB/index");
import Incidente from "../models/MySQL/incidente";
import Usuario from "../models/MySQL/usuario";
import TipoIncidente from "../models/MySQL/tipoIncidente";
import EstadoIncidente from "../models/MySQL/estadoIncidente";
import { Role } from "../models/MySQL";
import { enviarMensajeInsideServer } from "../helpers/sendEmail";

export const crearIncidente = async (req: Request, res: Response) => {
  const {
    inc_nombre,
    inc_descripcion,
    inc_tipoIncidenteId,
    inc_estadoIncidenteId,
    inc_usuarioId,
    inc_usuarioRevisionId,
    ...body
  } = req.body;
  // incidente
  try {
    //MYSQL
    const incidenteDB = await Incidente.findOne({
      where: {
        inc_nombre: inc_nombre,
      },
    });

    //MONGODB
    const incidenteMDB = await IncidenteM.findOne({
      inc_nombre: inc_nombre,
    });

    if (incidenteDB || incidenteMDB) {
      return res.status(400).json({
        msg: `El incidente ${incidenteMDB.inc_nombre},ya existe`,
      });
    }

    //Generar la data a guardar
    const data = {
      inc_nombre,
      inc_descripcion,
      inc_tipoIncidenteId,
      inc_estadoIncidenteId,
      inc_usuarioId,
      inc_usuarioRevisionId,
      ...body,
    };

    //MYSQL
    const incidente: any = await Incidente.create(data);

    //Preparar data mongo
    const usuarioMDB = await UsuarioM.findOne({
      idMYSQL: data.inc_usuarioId,
    });
    const usuarioRevisionMDB = await UsuarioM.findOne({
      idMYSQL: data.inc_usuarioRevisionId,
    });
    const tipoIncidenteMDB = await TipoIncidenteM.findOne({
      idMYSQL: data.inc_tipoIncidenteId,
    });

    const estadoIncidenteMDB = await EstadoIncidenteM.findOne({
      idMYSQL: data.inc_estadoIncidenteId,
    });

    const { id: idUsuarioMongo } = usuarioMDB;
    const { id: idUsuarioRevisionMongo } = usuarioRevisionMDB;
    const { id: idTipoIncidenteMongo } = tipoIncidenteMDB;
    const { id: idEstadoIncidenteMongo } = estadoIncidenteMDB;

    const dataMongo = {
      inc_nombre,
      inc_descripcion,
      inc_tipoIncidente: idTipoIncidenteMongo,
      inc_usuario: idUsuarioMongo,
      inc_usuarioRevision: idUsuarioRevisionMongo,
      inc_estadoIncidente: idEstadoIncidenteMongo,
      idMYSQL: incidente.id,

      ...body,
    };

    //MONGODB
    const incidenteM = new IncidenteM(dataMongo);

    //Guardar en DB
    await incidenteM.save();

    res.status(201).json({
      msg: "Incidente Creado Correctamente",
      incidente,
      incidenteM,
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

export const getIncidentes = async (req: Request, res: Response) => {
  const query = {
    inc_estado: true,
  };
  try {
    //Buscar todas los incidentes

    //MYSQL

    const [totalMYSQL, incidentesMy] = await Promise.all([
      Incidente.count({ where: query }),
      Incidente.findAll({
        where: query,
        include: [
          {
            model: Usuario,
            as: "inc_usuario",
            required: true, // INNER JOIN
            attributes: [
              "id",
              "nombre",
              "correo",
              "telefono",
              "dependenciaId",
              "roleId",
            ],
          },
          {
            model: Usuario,
            as: "inc_usuarioRevision",
            required: true, // INNER JOIN
            attributes: ["id", "nombre", "correo", "roleId"],
          },
          {
            model: TipoIncidente,
            as: "inc_tipoIncidente",
            required: true, // INNER JOIN
            attributes: ["id", "tinc_nombre", "tinc_descripcion"],
          },
          {
            model: EstadoIncidente,
            as: "inc_estadoIncidente",
            required: true, // INNER JOIN
            attributes: ["id", "est_nombre", "est_descripcion"],
          },
        ],
      }),
    ]);

    //MONGODB
    const [totalMongoDB, incidentesMo] = await Promise.all([
      IncidenteM.countDocuments(query),
      // TipoDocumentoM.find(query).skip(Number(desde)).limit(Number(limite)),
      IncidenteM.find(query)
        .populate("inc_usuario", [
          "idMYSQL",
          "nombre",
          "correo",
          "telefono",
          "dependencia",
          "role",
        ])
        .populate("inc_usuarioRevision", [
          "idMYSQL",
          "nombre",
          "correo",
          "role",
        ])
        .populate("inc_tipoIncidente", [
          "idMYSQL",
          "tinc_nombre",
          "tinc_descripcion",
        ])
        .populate("inc_estadoIncidente", [
          "idMYSQL",
          "est_nombre",
          "est_descripcion",
        ]),
    ]);

    if (!incidentesMo || !incidentesMy) {
      return res.status(400).json({
        msg: `No hay Incidencias registradas en la base de datos`,
      });
    }

    res.status(200).json({
      msg: "get API -getIncidencias",
      totalMYSQL,
      incidentesMy,
      totalMongoDB,
      incidentesMo,
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

export const getIncidente = async (req: Request, res: Response) => {
  const { id } = req.params;

  const query = {
    id: id,
  };

  try {
    //Conseguir el incidente

    //Obtener la dependencia MYSQL

    let incidente: any = await Incidente.findOne({
      where: query,
      include: [
        {
          model: Usuario,
          as: "inc_usuario",
          required: true, // INNER JOIN
          attributes: [
            "id",
            "nombre",
            "correo",
            "telefono",
            "dependenciaId",
            "roleId",
          ],
        },
        {
          model: Usuario,
          as: "inc_usuarioRevision",
          required: true, // INNER JOIN
          attributes: ["id", "nombre", "correo", "roleId"],
        },
        {
          model: TipoIncidente,
          as: "inc_tipoIncidente",
          required: true, // INNER JOIN
          attributes: ["id", "tinc_nombre", "tinc_descripcion"],
        },
        {
          model: EstadoIncidente,
          as: "inc_estadoIncidente",
          required: true, // INNER JOIN
          attributes: ["id", "est_nombre", "est_descripcion"],
        },
      ],
    });

    //Obtener la dependencia MONGODB
    let incidenteM: any = await IncidenteM.findOne({ idMYSQL: id })
      .populate("inc_usuario", [
        "idMYSQL",
        "nombre",
        "telefono",
        "correo",
        "dependencia",
        "role",
      ])
      .populate("inc_usuarioRevision", ["idMYSQL", "nombre", "correo", "role"])
      .populate("inc_tipoIncidente", [
        "idMYSQL",
        "tinc_nombre",
        "tinc_descripcion",
      ])
      .populate("inc_estadoIncidente", [
        "idMYSQL",
        "est_nombre",
        "est_descripcion",
      ]);

    if (!incidente) {
      incidente = {
        msg: "No se encontro en base MYSQL",
      };
    } else if (!incidenteM) {
      incidenteM = {
        msg: "No se encontro en base MONGODB",
      };
    }

    res.status(200).json({
      msg: "get API -getIncidente",
      incidente,
      incidenteM,
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

//Actualizar Incidente
export const actualizarIncidente = async (req: any, res: Response) => {
  const { id } = req.params;
  const { inc_usuarioRevisionId, ...body } = req.body;

  try {
    const query = {
      id,
    };
    //Verificar que exista ya uno

    //MYSQL

    //Obtener la dependencia MYSQL
    // const incidenteDB = await Incidente.findByPk(id);
    let incidenteDB: any = await Incidente.findOne({
      where: query,
      include: [
        {
          model: Usuario,
          as: "inc_usuario",
          required: true, // INNER JOIN
          attributes: [
            "id",
            "nombre",
            "correo",
            "telefono",
            "dependenciaId",
            "roleId",
          ],
        },
        {
          model: Usuario,
          as: "inc_usuarioRevision",
          required: true, // INNER JOIN
          attributes: ["id", "nombre", "correo", "roleId"],
        },
        {
          model: TipoIncidente,
          as: "inc_tipoIncidente",
          required: true, // INNER JOIN
          attributes: ["id", "tinc_nombre", "tinc_descripcion"],
        },
        {
          model: EstadoIncidente,
          as: "inc_estadoIncidente",
          required: true, // INNER JOIN
          attributes: ["id", "est_nombre", "est_descripcion"],
        },
      ],
    });

    //Obtener la dependencia MONGODB
    // const incidenteMDB = await IncidenteM.findOne({ idMYSQL: id });
    let incidenteMDB: any = await IncidenteM.findOne({ idMYSQL: id })
      .populate("inc_usuario", [
        "idMYSQL",
        "nombre",
        "telefono",
        "correo",
        "dependencia",
        "role",
      ])
      .populate("inc_usuarioRevision", ["idMYSQL", "nombre", "correo", "role"])
      .populate("inc_tipoIncidente", [
        "idMYSQL",
        "tinc_nombre",
        "tinc_descripcion",
      ])
      .populate("inc_estadoIncidente", [
        "idMYSQL",
        "est_nombre",
        "est_descripcion",
      ]);

    if (!incidenteDB) {
      return res.status(404).json({
        msg: `No se encontro incidente con el id ${id} en base de datos MYSQL`,
      });
    } else if (!incidenteMDB) {
      return res.status(404).json({
        msg: `No se encontro incidente con el id ${id} en base de datos MONGODB`,
      });
    }

    const { id: idMongo } = incidenteMDB;

    //VERIFICAR si el que actualiza es admin

    const queryRevision = {
      id: inc_usuarioRevisionId,
    };

    let usuarioAdminMy: any = await Usuario.findOne({
      where: queryRevision,
      include: [
        {
          model: Role,
          as: "role",
          required: true, // INNER JOIN
          attributes: ["id", "rol_nombre", "rol_descripcion"],
        },
      ],
    });
    let usuarioAdminMo: any = await UsuarioM.findOne({ idMYSQL: query.id }).populate(
      "role",
      ["idMYSQL", "rol_nombre", "rol_descripcion "]
    );

    const dataMDB = { updatedAt: Date.now(), ...body };

    //actualizar la dependencia en MYSQL
    const incidenteActualizado = await incidenteDB.update(dataMDB);

    //actualizar la dependencia en MONGODB

    const incidenteMActualizado = await IncidenteM.findOneAndUpdate(
      idMongo,
      dataMDB,
      {
        new: true,
      }
    );

    // Enviar Email notifar
    if (
      usuarioAdminMy.role.rol_nombre === "ADMIN_ROLE" ||
      usuarioAdminMo.role.rol_nombre === "ADMIN_ROLE"
    ) {
      const { inc_usuario } = incidenteActualizado;

      const correoEnviado= await enviarMensajeInsideServer(
        inc_usuario,
        "Actualizacion de Incidente Por Admin",
        incidenteActualizado,
      );
      
    }

    res.status(200).json({
      msg: "Incidente Actualizado",
      incidenteActualizado,
      incidenteMActualizado,
      
      // dataMDB
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

export const borrarIncidente = async (req: Request, res: Response) => {
  const { id } = req.params;

  //Deshabilitar
  try {
    //MYSQL
    const incidenteMy = await Incidente.findByPk(id);
    if (!incidenteMy) {
      return res.status(404).json({
        msg: `No existe un incidente con el id ${id}`,
      });
    }

    //Obtener la dependencia MONGODB
    const incidenteMDB: any = await IncidenteM.findOne({ idMYSQL: id });
    const { id: idMongo } = incidenteMDB;

    //MYSQL
    await incidenteMy.update({ inc_estado: false });

    //MongoDB
    const incidenteMo = await IncidenteM.findByIdAndUpdate(
      idMongo,
      { inc_estado: false, updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json({
      msg: "Incidente  deshabilitado",
      incidenteMy,
      incidenteMo,
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

export const borrarIncidentePermanente = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  //Fisicamente lo borramos

  try {
    //MYSQL
    const incidenteMy = await Incidente.findByPk(id);
    if (!incidenteMy) {
      return res.status(404).json({
        msg: "No existe una dependencia con el id" + id,
      });
    }

    //Obtener la dependencia MONGODB
    const incidenteMDB = await IncidenteM.findOne({ idMYSQL: id });
    const { id: idMongo } = incidenteMDB;

    //Eliminar en MYSQL
    await incidenteMy.destroy();
    //Eliminar MONGODB
    const incidenteMo = await IncidenteM.findByIdAndDelete(idMongo);

    res.status(200).json({
      msg: "Incidente borrado",
      incidenteMy,
      incidenteMo,
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
