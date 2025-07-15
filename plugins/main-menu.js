const config = require('../config');
const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

let currentPage = {};
let mekMap = {};
const pages = [
  [ { id: 'menu_dl', displayText: '📥 Download Menu' }, { id: 'menu_ai', displayText: '🤖 AI Menu' }, { id: 'menu_anime', displayText: '🎌 Anime Menu' } ],
  [ { id: 'menu_convert', displayText: '🔄 Convert Menu' }, { id: 'menu_fun', displayText: '🎉 Fun Menu' }, { id: 'menu_main', displayText: '🏠 Main Menu' } ],
  [ { id: 'menu_group', displayText: '👥 Group Menu' }, { id: 'menu_owner', displayText: '👑 Owner Menu' }, { id: 'menu_other', displayText: '📦 Other Menu' } ],
  [ { id: 'menu_reaction', displayText: '😊 Reactions Menu' }, { id: 'menu_scammer', displayText: '⚠ Scammer Info' }, { id: 'menu_logo', displayText: '🖼 Logo Menu' } ]
];

const buildButtonMessage = (page) => {
  if (page < 0 || page >= pages.length) return;

  const buttons = pages[page].map(b => ({
    buttonId: b.id,
    buttonText: { displayText: b.displayText },
    type: 1
  }));

  if (page > 0) buttons.push({ buttonId: 'prev_page', buttonText: { displayText: '⬅ Previous' }, type: 1 });
  if (page < pages.length - 1) buttons.push({ buttonId: 'next_page', buttonText: { displayText: '➡ Next' }, type: 1 });

  return {
    image: { url: "https://i.ibb.co/YdSKMhv/6767.jpg" },
    caption: `*Hello!*\n*Runtime:* ${runtime(process.uptime())}\n*RAM Use:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB\n\n*Choose an option below:*`,
    footer: '𒁂𓄂❥.𝑺𝑯𝑬𝑰𝑲𝑯 𝑨𝑳𝑰 🔥༽༼࿐ ♡••²⁴⁰²',
    buttons,
    headerType: 4
  };
};

cmd({
  pattern: "menu",
  alias: ["menu"],
  desc: "menu the bot",
  react: "📜",
  category: "main"
}, async (conn, mek, m, { from, reply, pushname }) => {
  try {
    currentPage[from] = 0;
    mekMap[from] = mek;

    // Clean up to prevent memory leaks
    setTimeout(() => {
      delete currentPage[from];
      delete mekMap[from];
    }, 10 * 60 * 1000); // 10 minutes

    await conn.sendMessage(from, buildButtonMessage(currentPage[from]), { quoted: mek });
  } catch (error) {
    console.error(error);
  }
});

module.exports.registerButtonHandler = (conn) => {
  conn.ev.on('messages.upsert', async ({ messages }) => {
    try {
      const msg = messages[0];
      if (!msg.message || !msg.message.buttonsResponseMessage) return;

      const btnId = msg.message.buttonsResponseMessage.selectedButtonId;
      const from = msg.key.remoteJid;

      if (currentPage[from] === undefined) return;

      const send = (text) => conn.sendMessage(from, { text }, { quoted: mekMap[from] });

      switch (btnId) {
        case 'next_page': if (currentPage[from] < pages.length - 1) currentPage[from]++; break;
        case 'prev_page': if (currentPage[from] > 0) currentPage[from]--; break;
        case 'menu_dl': return send('📥 Download Menu\n• facebook\n• insta\n• twitter\n...');
        case 'menu_ai': return send('🤖 AI Menu\n• gpt\n• meta\n• luma\n...');
        case 'menu_anime': return send('🎌 Anime Menu\n• waifu\n• neko\n• anime1\n...');
        case 'menu_convert': return send('🔄 Convert Menu\n• sticker\n• emojimix\n• take\n...');
        case 'menu_fun': return send('🎉 Fun Menu\n• joke\n• rate\n• insult\n...');
        case 'menu_main': return send('🏠 Main Menu\n• ping\n• alive\n• speed\n...');
        case 'menu_group': return send('👥 Group Menu\n• kick\n• add\n• promote\n...');
        case 'menu_owner': return send('👑 Owner Menu\n• block\n• restart\n• setpp\n...');
        case 'menu_other': return send('📦 Other Menu\n• date\n• count\n• flip\n...');
        case 'menu_reaction': return send('😊 Reactions Menu\n• hug\n• kiss\n• slap\n...');
        case 'menu_scammer': return send('⚠ Scammer Info\n• report scammer numbers\n...');
        case 'menu_logo': return send('🖼 Logo Menu\n• neonlight\n• galaxy\n• paint\n...');
        default: return send('❌ Invalid option. Please try again.');
      }

      await conn.sendMessage(from, buildButtonMessage(currentPage[from]), { quoted: mekMap[from] });
    } catch (err) {
      console.error(err);
    }
  });
};
