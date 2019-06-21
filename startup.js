var TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');

class Startup {
   constructor(config) {
      this._config = config;
   }

   setupTelegramBot() {
      this._bot = new TelegramBot(process.env.TOKEN);
      console.log(this._config);
      this._bot.setWebHook(this._config.get('telegram.webhookUrl'));
      bot.on('message', msg => {
         bot.sendMessage(msg.chat.id, 'I am alive!');
       });
   }

   setupMiddleware(app) {
      this.setupTelegramBot();

      app.use(bodyParser.json());

      app.post(this._config.get('telegram.webhookUrl'), (req, res) => {
         this._bot.getUpdates(req.body);
         res.sendStatus(200);
      });
   }
}
module.exports = Startup;