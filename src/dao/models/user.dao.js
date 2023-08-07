import userModel from "./user.js";

export default class User {
  login = async (req) => {
    console.log(req);

    try {
      let idUser = JSON.stringify(req.user._id);
      console.log(idUser);
      let id = "";
      id = idUser.split('"');
      console.log(id[1]);
      let infoUsuario = await userModel.findById(id[1]);
      let idCart = JSON.stringify(infoUsuario.carts[0]._id);
      console.log("id cart ------", typeof idCart);
      idCart = idCart.split('"');
      console.log(idCart[1]);
      console.log(
        "55 sessionRouter - Informacion usuario logueado ->",
        infoUsuario
      );
      req.session.user = {
        first_name: infoUsuario.first_name,
        last_name: infoUsuario.last_name,
        email: infoUsuario.email,
        id: id[1],
        age: infoUsuario.age,
        rol: infoUsuario.rol,
        idCart: idCart[1],
      };
      console.log("User Session en login -> ", req.session.user);

      return { status: "success", payload: req.user };
    } catch (error) {
      console.log("no se pudo realizar la operacion ");
      return "no se pudo realizar la accion";
    }
  };

  getInfoUserById = async (id) => {
    try {
      let user = await userModel.findById(id);
      console.log(user);
      return user;
    } catch (error) {
      console.log("no se pudo obtener la información ");
      return "no se pudo obtener la información ";
    }
  };

  getInfoUserByEmail = async (email) => {
    try {
      console.log(email);
      let user = await userModel.findOne({ email: email });
      console.log(user);
      return user;
    } catch (error) {
      console.log("no se pudo obtener la información ");
      return "no se pudo obtener la información ";
    }
  };
  updatePassByUserEmail = async (user) => {
    try {
      console.log("actualizando pass...");
      let userUpdated = await userModel.updateOne({ email: user.email }, user);
      console.log("actualizando pass -> result -> ", userUpdated);

      return userUpdated;
    } catch (error) {
      console.log("no se pudo obtener la información ");
      return "no se pudo obtener la información ";
    }
  };

  changeRol = async (req) => {
    let { id } = req.params;
    let { newRol } = req.body;
    console.log(req.body);
    console.log(req.params);
    console.log("id usuario = ", id);
    let idUsuario = id.split(" ");
    console.log("ROL ACTUAL DE USER -> ", req.session.user.rol);
    try {
      //let idUser = JSON.stringify(req.user._id);
      //console.log(idUser);
      //let id = "";
      //id = idUser.split('"');
      console.log(idUsuario);
      let user = await userModel.findById(idUsuario[1]);
      console.log("informacion usuario a actualizar ", user);
      return user;
    } catch (error) {
      console.log("no se pudo realizar la operacion ");
      return "no se pudo realizar la accion";
    }
  };
}
