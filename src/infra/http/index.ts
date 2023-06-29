import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "config/docs/swagger-v1";

const app = express();

export function startHTTP() {
  app.use(cors());
  const port = 3000;

  app.use(express.json());
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

  /**
   * @openapi
   * /api/v1/workouts:
   *   get:
   *     tags:
   *       - Workouts
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: OK
   *                 data:
   *                   type: array
   *                   items:
   *                         $ref: "#/components/schemas/User"
   */
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
