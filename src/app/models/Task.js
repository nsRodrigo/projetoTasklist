import Sequilize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    // aqui iniciamos a estrutura dos dados do db que serão criados passando a tipagem de cada coluna
    super.init(
      {
        task: Sequilize.STRING,
        check: Sequilize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // aqui criamos uma associação do id da tabela com o id do usuario
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}
export default Task;
