import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { fakerES as faker } from "@faker-js/faker";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const generateProduct = (ownerInfo) => {
  console.log("entro a generateProduct12");
  const randomNumber = faker.number.int({ min: 100, max: 9999 });
  const randomNumProduct = faker.number.int({ min: 1, max: 9999 });

  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: `rutaCode#${randomNumber}.png`,
    code: "code#" + randomNumber,
    stock: faker.number.int(randomNumProduct),
    owner: ownerInfo,
  };
};

const __filname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filname);

export default __dirname;
