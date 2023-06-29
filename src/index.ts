import { configVars } from "config";
import { User } from "core/entities/User";
import { startHTTP } from "infra/http";
import {
  collections,
  connectToDatabase,
} from "infra/repositories/config/mongo";
import { MongoModel } from "infra/repositories/mongo.repository";

async function start() {
  startHTTP();
  await connectToDatabase(configVars.mongo.uri);

  if (!collections.users) {
    throw new Error("no user");
  }
  const user = new MongoModel<User>(collections.users);

  const userCreated = User.create({
    name: "test",
    lastName: "test",
    email: "test@test.com",
    isTermsAcepted: true,
  });
  console.log("===> to create", userCreated);
  // user.save(userCreated)
  //   .then(res => { console.log(res) })
  user.getById("649d25ddb355443c3788eeef").then((res) => {
    console.log(res);
  });
}

start();
