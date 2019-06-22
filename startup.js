const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
const parseHabrPosts = require('./habr-parser');


class Startup {
   constructor(config) {
      this._config = config;
      this._sesions = {};
   }

   async setupTelegramBot() {
      this._bot = new TelegramBot(this._config.telegram.token, {});
      
      await this._bot.deleteWebHook();

      this._bot.onText(/\/habr -posts/, async (msg, match) => {
         const id = msg.chat.id;
         parseHabrPosts(this._config, async (str) => await this._bot.sendMessage(id, str));
         await this._bot.sendMessage(id, '/habr processing...');

      });

      this._bot.on('message', msg => {
         if (msg.text === '/habr -posts') return;
         const id = msg.chat.id;
         this._bot.sendMessage(id, 'pong!');
      });
      await this._bot.setWebHook(this._config.telegram.webhookUrl);
   }

   async setupMiddleware(app) {
      await this.setupTelegramBot();
      app.post('/', (req, res) => {
         this._bot.processUpdate(req.body);
         res.sendStatus(200);
      });
   }
}

module.exports = Startup;