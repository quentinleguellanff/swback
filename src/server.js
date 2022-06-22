import express from "express";
import routes from "./routes";
import sequelize from "./db/sequelize";

export function launch(port) {
  const application = express();
  
  application.use(express.json()) // for parsing application/json
  application.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

  application.use("/", routes);

  application.get("/", (request, response) => {
    response.json("Hello, World!")
  })

  application.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  });
}
