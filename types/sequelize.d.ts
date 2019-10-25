/**
 * This type definition augments existing definition
 * from @types/sequelize
 */
declare namespace sequelize {
  interface DestroyOptions {
    restartIdentity?: boolean;
  }
}
