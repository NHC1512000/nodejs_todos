// import pool from "../configs/connectDB";
import db from "../models/index";
import CRUDServices from "../services/CRUDServices";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render('homepage.ejs',{dataUsers: JSON.stringify(data)});
  }catch(e) {
    console.log(e);
  }
  
}

let getCRUD = async (req, res) => {
  return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDServices.createNewUser(req.body);
    console.log(message);
    return res.send('rcud from post')
}

let displayGetCRUD = async (req, res) => {
  let data = await CRUDServices.getAllUser();
  // console.log(data);
  return res.render('display-crud.ejs', {dataAllUser: data});
}

let getEditCRUD = async (req, res) => {
  let userId  = req.query.id;
  if(userId) {
    let userData = await CRUDServices.getEditUserById(userId);
    return res.render("edit-crud.ejs",{personData: userData});
  }else{
    return res.send('user not found');
  }
  
  
}

let putEditCRUD = async (req, res) => {
  let dataEdit = req.body;
  await CRUDServices.updateEditUser(dataEdit);
  return res.redirect('/getCRUD');
}

let deleteCRUD = async (req, res) => {
  let dataDeleteUser = req.query.id;
  if(dataDeleteUser){
    await CRUDServices.deleteUserById(dataDeleteUser);
    return res.redirect('/getCRUD');
  }else {
    res.send('user not found')
  }
 
}
module.exports = {
  getHomePage : getHomePage,
  getCRUD : getCRUD,
  postCRUD : postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putEditCRUD: putEditCRUD,
  deleteCRUD: deleteCRUD,

};
