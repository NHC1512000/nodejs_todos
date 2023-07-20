import express from "express";
import apiController from "../controllers/apiControllers";
import userController from '../controllers/userController';
let router = express.Router();

const initApiRoute = (app) => {
  // server side
  router.get('/', apiController.getHomePage);
  router.get('/crud', apiController.getCRUD);
  router.post('/postCRUD', apiController.postCRUD);
  router.get('/getCRUD', apiController.displayGetCRUD);
  router.get('/editCRUD',apiController.getEditCRUD);
  router.post('/putCRUD', apiController.putEditCRUD);
  router.get('/deleteCRUD',apiController.deleteCRUD);

  //client side
  router.post('/api/login', userController.handleLogin);
  router.get(`/api/get-all-users`, userController.handleGetAllUsers);
  router.post('/api/create-new-user', userController.handleCreateNewUser);
  router.put('/api/edit-user', userController.handleEditUser);
  router.delete('/api/delete-user', userController.handleDeleteUser);
  return app.use("/", router);
};

export default initApiRoute;
