const request = require("request");
const cheerio = require("cheerio");
module.exports = (config, out) => {
   config.urls.forEach(url => {
      request(url, async  (error, response, body) => {
         if (!error) {
            const $ = cheerio.load(body);
            let posts = $(".post__title_link");
            for (let i = 0; i < posts.length; i++) {
              await out(`${posts[i].firstChild.data} \n ${posts[i].attribs.href}` );
            }
         } else {

         }
      });
   });
}