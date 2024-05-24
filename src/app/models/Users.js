import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // aqui iniciamos a estrutura dos dados do db que serão criados passando a tipagem de cada coluna
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // criamos uma criptografia para o password
    this.addHook('beforeSave', async user => {
      // validamos se o password foi informado na variavel virtual password
      if (user.password) {
        // password informado, é criptografado no nivel 8
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    // retornamos o password criptografado
    return this;
  }

  // essa funcionalidade compara se o password informado é igual ao password hash
  checkPassword(password) {
    // aqui retornamos a comparação do password informado com o password hash
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
