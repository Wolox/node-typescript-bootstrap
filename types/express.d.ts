/**
 * This type definition augments existing definition
 * from @types/express
 */
declare namespace Express {
  interface Request {
    user?: import('models').IUserModel;
  }
  interface Response {
    user?: import('models').IUserModel;
  }
}
