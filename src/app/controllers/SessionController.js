import jwt from 'jsonwebtoken';
import User from '../models/Users';
import authConfig from '../../config/auth';

class SessionController {
  // metodo para criar uma sessão do usuario ja criado
  async store(req, res) {
    // aqui pegamos o usuario e a senha do usuario
    const { email, password } = req.body;

    // verificar se email existe no banco
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // tratativa de erro caso o usuario nao exista
      return res.status(401).json({ error: 'Usuario não existe' });
    }

    // verificar se a senha informada pelo usuario esta correta com a senha de criação
    if (!(await user.checkPassword(password))) {
      // tratativa de erro caso o senha esteja incorreta
      return res.status(401).json({ error: 'Senha incorreta' });
    }
    const { id, name } = user;
    // retornando os dados do id, name, email e o token do usuario
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
