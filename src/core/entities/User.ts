import { z } from "zod";
import { schemaValidation } from "./Error";
import { Entity } from "./Entity";
import { ObjectId } from "mongodb";

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Tommy V
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
export interface User extends Entity {
  name: string;
  lastName: string;
  email: string;
  isDeleted: boolean;
  password: string;
  roleName: string;
  cryptoCheckoutAccountId: string;
  isTermsAcepted: boolean;
}

export const CreateUserSchema = z.object({
  name: z.string({ required_error: "name requerido" }),
  lastName: z.string({ required_error: "lastName requerido" }),
  email: z.string({ required_error: "email requerido" }).email(),
  isTermsAcepted: z.boolean({ required_error: "isTermsAcepted requerido" }),
});

type CreateUser = z.infer<typeof CreateUserSchema>;

export class User {
  static create(data: CreateUser): User {
    schemaValidation(CreateUserSchema, data);
    return {
      ...data,
      _id: new ObjectId(),
      password: "123",
      isDeleted: false,
      roleName: "user",
      cryptoCheckoutAccountId: "",
    };
  }
}
