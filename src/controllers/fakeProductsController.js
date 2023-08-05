import FakeProduct from "../services/fakeProducts.service.js";

const FakeProductService = new FakeProduct();
const getFakeProducts = async (req, res) => {
  try {
    let products = await FakeProductService.getFakeProducts();
    req.logger.info("se crearon los 100  productos!!!");
    return res.status(201).json(products);
  } catch (err) {
    req.logger.error("No se crearon los 100  productos!!!");
    return res.send(401).json({ status: "error", error: error });
  }
};

export default {
  getFakeProducts,
};
