var TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');

class Startup {
   constructor(config) {
      this._config = config;
   }

   async setupTelegramBot() {
      console.log(this._config);
      this._bot = new TelegramBot(this._config.telegram.token, {webHook:true});
      console.log(process.env.TOKEN);
      await this._bot.setWebHook(this._config.telegram.webhookUrl);

     this._bot.onText(/[^0-9][^0-9]-[0-9][0-9]/, (msg,rgx)=> {
      this._bot.sendMessage(msg.chat.id,'kek');
      
   })
      this._bot.on('message', msg => {
         this._bot.sendMessage(msg.chat.id, 'I am alive!');
      });
   }

  async setupMiddleware(app) {
      this.setupTelegramBot().then(() => {
         app.use(bodyParser.json());
         console.log(this._bot)
         app.post('/', (req, res) => {
            this._bot.processUpdate(req.body);
            res.sendStatus(200);
         });
      });
   }
}
module.exports = Startup;