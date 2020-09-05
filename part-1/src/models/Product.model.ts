import Sequelize, { Model } from 'sequelize';
import connection from '../database';

class Product extends Model {
  public id!: string;

  public name!: string;

  // eslint-disable-next-line camelcase
  public readonly created_at!: Date;

  // eslint-disable-next-line camelcase
  public readonly updated_at!: Date;
}

Product.init(
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  },
  {
    sequelize: connection,
  },
);

export default Product;
