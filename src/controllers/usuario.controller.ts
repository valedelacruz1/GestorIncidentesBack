import { Request, Response } from "express";
import bcrypt from "bcrypt";

import Usuario from "../models/MySQL/usuario";
import Role from "../models/MySQL/role";
import Dependencia from "../models/MySQL/dependencia";
import TipoDocumento from "../models/MySQL/tipoDocumento";

const {
  UsuarioM,
  DependenciaM,
  RoleM,
  TipoDocumentoM,
} = require("../models/MongoDB/index");

export const crearUsuario = async (req: Request, res: Response) => {
  const {
    username,
    password,
    nombre,
    correo,
    apellido,
    telefono,
    roleId,
    dependenciaId,
    tipoDocumentoId,
    ...body
  } = req.body;

  try {
    // Validamos si el usuario ya existe en la base de datos
    //MYSQL
    const usuarioDB = await Usuario.findOne({ where: { username: username } });
    const usuarioCorreoDB = await Usuario.findOne({ where: { correo } });

    //MONGODB
    const usuarioMDB = await UsuarioM.findOne({
      username: username,
    });
    const usuarioCorreoMDB = await UsuarioM.findOne({
      correo,
    });

    if (usuarioDB || usuarioMDB || usuarioCorreoDB || usuarioCorreoMDB) {
      return res.status(400).json({
        msg: `Ya existe el usuario `,
      });
    }

    // Guardarmos usuario en la base de datos

    const hashedPassword = await bcrypt.hash(password, 10);

    //Generar la data a guardar
    const data = {
      username,
      password: hashedPassword,
      nombre,
      apellido,
      correo,
      telefono,
      roleId,
      dependenciaId,
      tipoDocumentoId,
      ...body,
    };

    const usuario: any = await Usuario.create(data);

    //MONGODB

    //Preparar data mongo
    const dependenciaMDB = await DependenciaM.findOne({
      idMYSQL: dependenciaId,
    });
    const roleMDB = await RoleM.findOne({ idMYSQL: roleId });
    const tipoDocumentoMDB = await TipoDocumentoM.findOne({
      idMYSQL: tipoDocumentoId,
    });

    const { id: idDependenciaMongo } = dependenciaMDB;
    const { id: idRoleMongo } = roleMDB;
    const { id: idTipoDocumentoMongo } = tipoDocumentoMDB;

    const dataMongo = {
      username: data.username,
      correo,
      password: hashedPassword,
      nombre,
      telefono,
      apellido,
      idMYSQL: usuario.id,
      role: idRoleMongo,
      dependencia: idDependenciaMongo,
      tipoDocumento: idTipoDocumentoMongo,
      ...body,
    };

    const usuarioM = new UsuarioM(dataMongo);

    await usuarioM.save();

    let usuarioEnvio;
    if (!usuario) {
      usuarioEnvio = usuarioM;
    } else {
      usuarioEnvio = usuario;
    }

    res.status(201).json({
      msg: `Usuario ${username} creado exitosamente!`,
      usuario: usuarioEnvio,
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

export const getUsuarios = async (req: Request, res: Response) => {
  //   const { limite = 5, desde = 0 } = req.query;

  const query = {
    estado: true,
  };

  try {
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
      UsuarioM.countDocuments(query),
      // TipoDocumentoM.find(query).skip(Number(desde)).limit(Number(limite)),
      UsuarioM.find(query)
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

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const query = {
    id: id,
  };
  try {
    //Obtener la dependencia MYSQL
    let usuarioMy: any = await Usuario.findOne({
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
    });

    //Obtener la dependencia MONGODB
    let usuarioMo: any = await UsuarioM.findOne({ idMYSQL: id })
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
      ]);

    if (!usuarioMy) {
      usuarioMy = {
        msg: "No se encontro en base MYSQL",
      };
    } else if (!usuarioMo) {
      usuarioMo = {
        msg: "No se encontro en base MONGODB",
      };
    }

    res.status(200).json({
      msg: "get API -getUsuario ",
      usuarioMy,
      usuarioMo,
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

export const actualizarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, password, correo, ...body } = req.body;

  try {
    //Verificar que  exista ya uno con el mismo nombre

    //MYSQL
    //Obtener el usuario MYSQL
    const usuarioDB = await Usuario.findByPk(id);

    //Obtener el usuario MONGODB
    
    
    

    const usuarioMDB:any = await UsuarioM.findOne({ idMYSQL: id });
    const { id: idMongo } = usuarioMDB;
    

    if (!usuarioDB) {
      return res.status(404).json({
        msg: `No se encontro usuario con el id ${id} en base de datos MYSQL`,
      });
    } else if (!usuarioMDB) {
      return res.status(404).json({
        msg: `No se encontro dependencia con el id ${id} en base de datos MONGODB`,
      });
    }

    if (password) {
      const salt = bcrypt.genSaltSync();
      body.password = bcrypt.hashSync(password, salt);
    }

    const dataMDB = { 
      updatedAt: Date.now(), ...body 
    };

    //actualizar el usuario en MYSQL
    const usuarioMyActualizado = await usuarioDB.update(body);

    //actualizar el usuario en MONGODB

    const usuarioMoActualizado = await UsuarioM.findOneAndUpdate(
      idMongo,
      dataMDB,
      {
        new: true,
      }
    );

    res.status(200).json({
      msg: "Usuario Actualizado",
      usuarioMyActualizado,
      usuarioMoActualizado,
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
export const borrarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  //Deshabilitar

  try {
    //MYSQL
    const usuarioMy = await Usuario.findByPk(id);
    if (!usuarioMy) {
      return res.status(404).json({
        msg: `No existe un usuario con el id ${id}`,
      });
    }

    //Obtener la dependencia MONGODB
    const usuarioMDB = await UsuarioM.findOne({ idMYSQL: id });
    const { id: idMongo } = usuarioMDB;
    //MYSQL
    await usuarioMy.update({ dep_estado: false });

    //MongoDB
    const usuarioMo = await UsuarioM.findByIdAndUpdate(
      idMongo,
      { estado: false, updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json({
      msg: "Usuario deshabilitado",
      usuarioMy,
      usuarioMo,
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

export const borrarUsuarioPermanente = async (req: Request, res: Response) => {
  const { id } = req.params;

  //Fisicamente lo borramos

  try {
    //MYSQL
    const usuarioMy = await Usuario.findByPk(id);
    if (!usuarioMy) {
      return res.status(404).json({
        msg: "No existe un usuario con el id" + id,
      });
    }

    //Obtener el usuario en  MONGODB
    const usuarioMDB = await DependenciaM.findOne({ idMYSQL: id });
    const { id: idMongo } = usuarioMDB;

    //Eliminar en MYSQL
    await usuarioMy.destroy();
    //Eliminar MONGODB
    const usuarioMo = await UsuarioM.findByIdAndDelete(idMongo);

    res.status(200).json({
      msg: "Usuario borrado",
      usuarioMy,
      usuarioMo,
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
