/* eslint-disable no-unused-expressions */
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import User from '../models/Users';

class UserController {
  // metodo para criar um usuario
  async store(req, res) {
    /** Vamos criar o schema para validação dos campos */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });
    // aqui informamos a condição, se algum dado não atender o schema, retornamos um erro
    if (!(await schema.isValid(req.body))) {
      // tratativa do erro para dados invalidos
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // aqui vamos buscar o email do usuario
    const userExist = await User.findOne({
      where: { email: req.body.email },
    });

    // validamos se o usuario já existe
    if (userExist) {
      // tratativa em caso do email existir
      return res.status(400).json({ error: 'Usuario ja existe' });
    }

    // caso não existir, criarmos um usuario informando o id, name, email
    const { id, name, email } = await User.create(req.body);

    // retornamos os dados do id, name e email
    return res.json({ id, name, email });
  }

  async update(req, res) {
    /** Vamos criar o schema para validação dos campos */
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      // aqui setamos a obrigatoriedade do campo password somente se o campo "oldPassword" for preenchido
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      // aqui setamos a obrigatoriedade do campo confirmePassword somente se o campo "password" for preenchido e deve ser igual ao campo password
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // aqui informamos a condição, se algum dado não atender o schema, retornamos um erro
    if (!(await schema.isValid(req.body))) {
      // tratativa do erro para dados invalidos
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // aqui informamos a condição, se algum dado não atender o schema, retornamos um erro
    if (!(await schema.isValid(req.body))) {
      // tratativa do erro para dados invalidos
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // aqui pegamos os dados de email e old password que estamos querendo enviar
    const { email, oldPassword } = req.body;

    // aqui buscamos o id do usuário que queremos utilizar
    const user = await User.findByPk(req.userId);

    /* primeiro vamos ver as condições do email */

    // validar se o email que iremos colocar é diferente do email cadastrado
    if (email !== user.email) {
      /* validar se o email ja existe no db */
      const userExist = await User.findOne({ where: { email } });
      if (userExist) {
        // tratativa em caso do email existir
        return res.status(400).json({ error: 'Usuario ja existe' });
      }
    }

    /* segundo vamos ver as condições do password */

    // aqui validamos primeiro se o usuario mandou a senha para alterar, caso ele tenha mandado a senha
    // seguimos para segunda validação que é se a senha antiga do usuário está correta
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      // tratativa em caso de senha incorreta
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    /** caso ambas as condições estejam OK seguimos com o update */
    const { id, name } = await user.update(req.body);
    // retornamos id, name, email
    return res.json({ id, name, email });
  }
}

export default new UserController();
