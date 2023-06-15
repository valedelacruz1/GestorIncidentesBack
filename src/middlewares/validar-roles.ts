import { Response, NextFunction } from "express";

export const esAdminRole=(req:any,res:Response,next:NextFunction)=>{

    

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar rol sin validar token'
        });
    }

    const {roleId,nombre}= req.usuario;

    if(roleId.rol_nombre!=="ADMIN_ROLE"){
        return res.status(401).json({
            msg:`${nombre} no es Administrador.`
        })
    }
    next();

}

