Iniciar o projeto de API

1 - Instalar o Yarn e o Node.js
2 - Criar pasta do projeto
4 - Instalar o express, sucrase e nodemon
3 - Estrutura de pastas: criar pasta src e criar os arquivos app.js, router.js e server.js



App.js:

    1 - importar o express e o routes

        import express from 'express';
        import routes from ''./routes;

    2 - criar classe app e export

        class App{

        }
        export default new App();

    Classe App():

        1 - criar construtor e a estrutura dos middlewares e das routes

            class App{

                constructor(){
                    this.server = express();
                    this.middleware();
                    this.routes();   
                }

                middleware(){
                    this.server.use(express.json());
                }

                routes(){
                    
                }

            }
            export default new App();

        constructor():
        1 - configurar o express

            

    

