/**
 * This type definition augments existing definition
 * from @types/express
 */
declare namespace Express {
  interface Request {
    user?: import('../db/models/user').User;
  }
  interface Response {
    user?: import('../db/models/user').User;
  }
}
