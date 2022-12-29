import { faker } from "@faker-js/faker";
import { hashSync } from "bcrypt";

export const user = (
  username = faker.internet.userName(),
  password = hashSync("Test!123", 10)
) => ({
  username: username,
  password: password,
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  name: faker.name.fullName(),
  image: faker.image.avatar(),
  phone: faker.phone.number("###-###-####"),
});
