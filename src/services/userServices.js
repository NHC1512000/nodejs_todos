import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

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


let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExistEmail  = await checkUserEmail(username);
            if(isExistEmail) {
                let user = await db.User.findOne({
                    attributes : ['email', 'roleId', 'password'],
                    where: {email: username},
                    raw : true,
                });
                if(user){
                    //false
                    let check = await bcrypt.compare(password, user.password);
                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else{
                        userData.errCode =3;
                        userData.errMessage = 'Wrong password';
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User is not found`;
                }
            }else {
                userData.errCode = 1;
                userData.errMessage = `Your's email is not exist. Pls try another email.`
                
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail= (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email : userEmail}
            })
            if(user) {
                resolve(true);
            }else {
                resolve(false);
            }
        }catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if(userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    
                });
            }
            if(userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {id : userId},
                    attributes: {
                        exclude: ['password']
                    },
                    
                })
            }
            resolve(users);
        }catch(e){
            reject(e);
        }
    })
}

let createNewUser = (dataNewUSer) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(dataNewUSer.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in use',
                })
            }else{
                let hashPasswordFromBcrypt = await hashUserPassword(dataNewUSer.password);
            await db.User.create({
                email: dataNewUSer.email,
                password: hashPasswordFromBcrypt,
                firstName: dataNewUSer.firstName,
                lastName: dataNewUSer.lastName,
                address: dataNewUSer.address,
                phoneNumber: dataNewUSer.phoneNumber,
                gender: dataNewUSer.Gender === '1' ? true : false,
                roleId: dataNewUSer.Role,
            })
            resolve({
                errCode: 0,
                errMessage: 'OK',
            })
            }
            
        }catch(e) {
            reject(e);
        }
    })
}

let updateUser = (dataUpdateUser) => {
    return new Promise(async (resolve, reject) => {
        try{
            console.log(dataUpdateUser);
            if(!dataUpdateUser.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters !',
                })
            }
            let user = await db.User.findOne({
                where: {id: dataUpdateUser.id},
                raw: false,
            })
            if(user) {
                user.firstName = dataUpdateUser.firstName;
                user.lastName = dataUpdateUser.lastName;
                user.address = dataUpdateUser.address;
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update succeeds!',
                });
            }
            else{
                resolve({
                    errCode: 1,
                    errMessage: `User's not found`, 
                });
            }
        }catch(e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: { id: userId },
                raw: false,
            })
            if(!user){
                resolve({
                    errCode: 2,
                    errMessage: 'User is not found'
                })
            }else {
                await user.destroy();
                resolve({
                    errCode: 0,
                    errMessage: 'The user is deleted !',
                })
            }
        }catch(e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}