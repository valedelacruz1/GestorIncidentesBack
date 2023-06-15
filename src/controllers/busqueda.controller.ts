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
import Role from "../models/MySQL/role";
import Dependencia from "../models/MySQL/dependencia";
import TipoDocumento from "../models/MySQL/tipoDocumento";
import { getModeloBD } from "../helpers/getModelo";

const coleccionesPermitidas = [
  "incidentesTipoEstado",
  "incidentesUsuario",
  "usuariosDependencia",
];

const getIncidentesPorUsuario = async (req: Request, res: Response) => {
  const { id: idUsuario } = req.params;
  let { tipoIncidente = 0, estadoIncidente = 0, estado = true } = req.query;

  let estadoIncidenteVal = Number(estadoIncidente);
  let tipoIncidenteVal = Number(tipoIncidente);
  let estadoVal: boolean = Boolean(estado);

  const payloadUsuario = {
    idMYSQL: idUsuario,
  };

  const usuarioM = await getModeloBD("usuario", payloadUsuario, "MONGO");

  let query, queryMongo;

  switch (!estadoIncidenteVal) {
    case estadoIncidenteVal !== 0 &&
      tipoIncidenteVal !== 0 &&
      estadoVal !== undefined:
      const payloadEstadoIncidente = {
        idMYSQL: estadoIncidenteVal,
      };
      const estadoIncidenteM: any = await getModeloBD(
        "estadoIncidente",
        payloadEstadoIncidente,
        "MONGO"
      );
      const payloadTipoIncidente = {
        idMYSQL: tipoIncidenteVal,
      };
      const tipoIncidenteM: any = await getModeloBD(
        "tipoIncidente",
        payloadTipoIncidente,
        "MONGO"
      );

      query = {
        inc_estado: estadoVal,
        inc_usuarioId: idUsuario,
        inc_estadoIncidenteId: estadoIncidenteVal,
        inc_tipoIncidenteId: tipoIncidenteVal,
      };

      queryMongo = {
        inc_estado: estadoVal,
        inc_usuario: usuarioM.id,
        inc_estadoIncidente: estadoIncidenteM.id,
        inc_tipoIncidente: tipoIncidenteM.id,
      };
      break;
    case tipoIncidenteVal !== 0 &&
      estadoIncidente === 0 &&
      estadoVal !== undefined:
      const payloadTipoIncidente2 = {
        idMYSQL: tipoIncidenteVal,
      };
      const tipoIncidenteM2: any = await getModeloBD(
        "tipoIncidente",
        payloadTipoIncidente2,
        "MONGO"
      );
      query = {
        inc_estado: estadoVal,
        inc_usuarioId: idUsuario,
        inc_tipoIncidenteId: tipoIncidenteVal,
      };
      queryMongo = {
        inc_estado: estadoVal,
        inc_usuarioId: usuarioM.id,
        inc_tipoIncidenteId: tipoIncidenteM2.id,
      };
      break;
    case estadoIncidente !== 0 &&
      tipoIncidenteVal === 0 &&
      estadoVal !== undefined:
      const payloadTipoIncidente3 = {
        idMYSQL: tipoIncidenteVal,
      };
      const tipoIncidenteM3: any = await getModeloBD(
        "tipoIncidente",
        payloadTipoIncidente3,
        "MONGO"
      );
      query = {
        inc_estado: estadoVal,
        inc_usuarioId: idUsuario,
        inc_tipoIncidenteId: tipoIncidenteVal,
      };
      queryMongo = {
        inc_estado: estadoVal,
        inc_usuarioId: usuarioM.id,
        inc_tipoIncidenteId: tipoIncidenteM3.id,
      };
      break;
    case estadoIncidente === 0 &&
      tipoIncidenteVal === 0 &&
      estadoVal !== undefined:
      query = {
        inc_estado: estadoVal,
        inc_usuarioId: idUsuario,
      };
      queryMongo = {
        inc_estado: estadoVal,
        inc_usuarioId: usuarioM.id,
      };
      break;
  }

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
      IncidenteM.countDocuments(queryMongo),
      // TipoDocumentoM.find(query).skip(Number(desde)).limit(Number(limite)),
      IncidenteM.find(queryMongo)
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

    return res.status(200).json({
      msg: "get API -getIncidentesPorUsuario",
      totalMYSQL,
      incidentesMy,
      totalMongoDB,
      incidentesMo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
      BDStatus: {
        MYSQL_ON: process.env.MYSQLDB_ON,
        MONGODB_ON: process.env.MONGODB_ON,
      },
    });
  }
};

const getIncidentesPorTipoEstado = async (req: Request, res: Response) => {
  const { id: idTipoIncidente } = req.body;
  let { estadoIncidente = 0, estado = true } = req.query;

  let estadoIncidenteVal = Number(estadoIncidente);
  let estadoVal: boolean = Boolean(estado);

  let query,
    queryMongo,
    payloadEstadoIncidente,
    payloadTipoIncidente,
    estadoIncidenteM,
    tipoIncidenteM;

  switch (idTipoIncidente) {
    case idTipoIncidente !== 0 &&
      estadoIncidenteVal !== 0 &&
      estadoVal !== undefined:
      payloadTipoIncidente = {
        idMYSQL: idTipoIncidente,
      };
      payloadEstadoIncidente = {
        idMYSQL: estadoIncidenteVal,
      };

      tipoIncidenteM = await getModeloBD(
        "tipoIncidente",
        payloadTipoIncidente,
        "MONGO"
      );

      estadoIncidenteM = await getModeloBD(
        "estadoIncidente",
        payloadEstadoIncidente,
        "MONGO"
      );

      query = {
        inc_estado: estadoVal,
        inc_tipoIncidenteId: idTipoIncidente,
        inc_estadoIncidenteId: estadoIncidenteVal,
      };
      queryMongo = {
        inc_estado: estadoVal,
        inc_tipoIncidente: tipoIncidenteM.id,
        inc_estadoIncidente: estadoIncidenteM.id,
      };
      break;
    case idTipoIncidente !== 0 &&
      estadoIncidenteVal === 0 &&
      estadoVal !== undefined:
      payloadTipoIncidente = {
        idMYSQL: idTipoIncidente,
      };
      tipoIncidenteM = await getModeloBD(
        "tipoIncidente",
        payloadTipoIncidente,
        "MONGO"
      );

      query = {
        inc_estado: estadoVal,
        inc_tipoIncidenteId: idTipoIncidente,
      };
      queryMongo = {
        inc_estado: estadoVal,
        inc_tipoIncidente: tipoIncidenteM.id,
      };
      break;
    case idTipoIncidente === 0 &&
      estadoIncidenteVal === 0 &&
      estadoVal !== undefined:
      query = {
        inc_estado: estadoVal,
      };
      queryMongo = {
        inc_estado: estadoVal,
      };
      break;
  }

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
      IncidenteM.countDocuments(queryMongo),
      // TipoDocumentoM.find(query).skip(Number(desde)).limit(Number(limite)),
      IncidenteM.find(queryMongo)
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

    return res.status(200).json({
      msg: "get API -getIncidencias",
      totalMYSQL,
      incidentesMy,
      totalMongoDB,
      incidentesMo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
      BDStatus: {
        MYSQL_ON: process.env.MYSQLDB_ON,
        MONGODB_ON: process.env.MONGODB_ON,
      },
    });
  }
};

const getUsuariosPorDependencia = async (req: Request, res: Response) => {
  const { id: idDependencia } = req.params;
  let { estado = true } = req.query;

  let estadoVal: boolean = Boolean(estado);

  const payloadDependencia = {
    idMYSQL: idDependencia,
  };

  //Obtener la dependencia MYSQL
  let dependencia: any = await getModeloBD("dependencia", payloadDependencia, "MYSQL");

  let dependenciaM: any = await getModeloBD("dependencia",payloadDependencia,"MONGO");
  if (!dependencia) {
    return res.status(404).json({
      msg: `No se encontro dependencia con el id ${idDependencia} en base de datos MYSQL`,
    });
  } else if (!dependenciaM) {
    return res.status(404).json({
      msg: `No se encontro dependencia con el id ${idDependencia} en base de datos MONGODB`,
    });
  }

  console.log(dependenciaM);

  let query, queryMongo;

  if (Number(idDependencia) !== 0 && estadoVal !== undefined) {
    query = {
      estado: estadoVal,
      dependenciaId: idDependencia,
    };
    queryMongo = {
      estado: estadoVal,
      dependencia: dependenciaM.id,
    };
  }

  try {
    //Buscar todas los incidentes

   

    //MYSQL
    const [totalMYSQL, usuariosMy] = await Promise.all([
      Usuario.count({ where: query }),
      Usuario.findAll({
        where: query,
        include: [
          {
            model: Role,
            as: "role",
            required: true, // INNER JOIN
            attributes: ["id", "rol_nombre", "rol_descripcion"],
          },
          {
            model: Dependencia,
            as: "dependencia",
            required: true, // INNER JOIN
            attributes: ["id", "dep_nombre", "dep_descripcion"],
          },
          {
            model: TipoDocumento,
            as: "tipoDocumento",
            required: true, // INNER JOIN
            attributes: ["id", "tdoc_nombre", "tdoc_descripcion"],
          },
        ],
      }),
    ]);

    //MONGODB
    const [totalMongoDB, usuariosMo] = await Promise.all([
      UsuarioM.countDocuments(queryMongo),
      // TipoDocumentoM.find(query).skip(Number(desde)).limit(Number(limite)),
      UsuarioM.find(queryMongo)
        .populate("role", ["idMYSQL", "rol_nombre", "rol_descripcion "])
        .populate("dependencia", [
          "idMYSQL",
          "dep_nombre",
          "dep_descripcion",
          "role",
        ])
        .populate("tipoDocumento", [
          "idMYSQL",
          "tdoc_nombre",
          "tdoc_descripcion",
        ]),
    ]);

    if (!usuariosMy || !usuariosMo) {
      return res.status(400).json({
        msg: `No hay usuarios registrados en la base de datos`,
      });
    }

    res.status(200).json({
      msg: "get API -getUsuarios",
      totalMYSQL,
      usuariosMy,
      totalMongoDB,
      usuariosMo,
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

export const buscar = (req: Request, res: Response) => {
  const { coleccion } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "incidentesTipoEstado":
      getIncidentesPorTipoEstado(req, res);
      break;
    case "incidentesUsuario":
      getIncidentesPorUsuario(req, res);
      break;
    case "usuariosDependencia":
      console.log("entro usuarios dependencia");
      getUsuariosPorDependencia(req, res);
      break;
    default:
      return res.status(500).json({
        msg: "Se le olvido hacer esta busqueda",
      });
  }
};
