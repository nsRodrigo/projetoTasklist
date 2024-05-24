import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // buscando o token do usuário
  const authHeader = req.headers.authorization;

  // validando se o token existe
  if (!authHeader) {
    // retornando tratativa de erro
    return res.status(401).json({ error: 'Token não existe.' });
  }

  // pegando o token
  const [, token] = authHeader.split(' ');

  // validando se o token é valido
  try {
    // verificando se o token é valido
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // criando uma variavel no req para receber o id do usuario logado
    req.userId = decoded.id;
    // caso o token esteja OK, solicitamos seguir com a requisição
    return next();
  } catch (error) {
    // retornando tratativa de erro
    return res.status(401).json({ error: 'Token não existe.' });
  }
};
