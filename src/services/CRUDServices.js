import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.FirstName,
                lastName: data.LastName,
                address: data.Address,
                phoneNumber: data.PhoneNumber,
                gender: data.Gender === '1' ? true : false,
                roleId: data.Role,
            })
            resolve("ok");
        }catch(e){
            reject(e);
        }
    })
    

}

let hashUserPassword =async (password) => {
    return new Promise(async (resolve, reject ) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e) {
            reject(e);
        }
    })
}

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try{
            let users = await db.User.findAll({
                raw: true,
            });

            resolve(users);
        }catch(e) {
            reject(e);
        }
    })
}

let getEditUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let userDataFromId = await db.User.findOne({
                where : { id: userId},
                raw: true,
            })
            if( userDataFromId){
                resolve(userDataFromId);
            }else{
                resolve({});
            }
            
        }catch(e){
            reject(e);
        }
    })
}

let updateEditUser = async (dataEdit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: dataEdit.id},
            })
            if(user) {
                user.firstName = dataEdit.FirstName;
                user.lastName = dataEdit.LastName;
                user.address = dataEdit.Address;
                user.phoneNumber = dataEdit.PhoneNumber;
                await user.save();
                resolve();
            }
            else{
                resolve();
            }
        }catch(e) {
            reject(e);
        }
    })
}

let deleteUserById = async (dataDelete) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: dataDelete},
            })
            if(user) {
                await user.destroy();
                resolve();
            }else{
                resolve();
            }
        }catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getEditUserById: getEditUserById,
    updateEditUser: updateEditUser,
    deleteUserById: deleteUserById,
}