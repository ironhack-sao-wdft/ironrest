const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/User");

function configurePassport(app) {
  app.use(passport.initialize());

  // Configurar o passport para usar a estratégia local de autenticação para verificar se o login é válido

  passport.use(
    new LocalStrategy(
      // Nomes dos campos de usuario e senha no req.body
      { usernameField: "email", passwordField: "password" },
      // Callback onde vamos tentar fazer o login e retornar sucesso ou falha
      async (username, password, done) => {
        // Pesquisar o email que o usuario enviou no banco

        try {
          const foundUser = await User.findOne({ email: username });

          // Se o usuario não foi encontrado, retorne uma mensagem de erro
          if (!foundUser) {
            return done(null, false, {
              message: "This email is not registered yet",
            });
          }

          // Se a senha que o usuário está enviando na tentativa de login não bater com a senha salva no banco, retorne uma mensagem de erro
          if (!bcrypt.compareSync(password, foundUser.passwordHash)) {
            return done(null, false, {
              message: "Incorrect password",
            });
          }

          return done(null, foundUser);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );

  // Configura o passport para extrair os tokens JWT do cabeçalho das requisições HTTP

  passport.use(
    new JWTStrategy(
      {
        // Não esquecer de criar variável de ambiente com secret para assinatura dos tokens JWT
        secretOrKey: process.env.TOKEN_SIGN_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      (token, done) => {
        try {
          return done(null, token.user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
}

module.exports = configurePassport;
