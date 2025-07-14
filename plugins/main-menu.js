const config = require('../config')
const { cmd, commands } = require('../command')
const os = require("os")
const { runtime } = require('../lib/functions')

cmd({
  pattern: "menu",
  alias: ["sheikh"],
  desc: "menu the bot",
  react: "📜",
  category: "main"
},
async (conn, mek, m, { from, reply, pushname }) => {
  try {
    const pages = [
      [
        { id: 'menu_dl', displayText: '📥 Download Menu' },
        { id: 'menu_ai', displayText: '🤖 AI Menu' },
        { id: 'menu_anime', displayText: '🎌 Anime Menu' },
      ],
      [
        { id: 'menu_convert', displayText: '🔄 Convert Menu' },
        { id: 'menu_fun', displayText: '🎉 Fun Menu' },
        { id: 'menu_main', displayText: '🏠 Main Menu' },
      ],
      [
        { id: 'menu_group', displayText: '👥 Group Menu' },
        { id: 'menu_owner', displayText: '👑 Owner Menu' },
        { id: 'menu_other', displayText: '📦 Other Menu' },
      ],
      [
        { id: 'menu_reaction', displayText: '😊 Reactions Menu' },
        { id: 'menu_scammer', displayText: '⚠️ Scammer Info' },
        { id: 'menu_logo', displayText: '🖼️ Logo Menu' },
      ]
    ]

    let currentPage = 0

    const buildButtonMessage = (page) => {
      const buttons = pages[page].map(b => ({
        buttonId: b.id,
        buttonText: { displayText: b.displayText },
        type: 1
      }))

      if (page > 0) {
        buttons.push({
          buttonId: 'prev_page',
          buttonText: { displayText: '⬅️ Previous' },
          type: 1
        })
      }
      if (page < pages.length - 1) {
        buttons.push({
          buttonId: 'next_page',
          buttonText: { displayText: '➡️ Next' },
          type: 1
        })
      }

      return {
        image: { url: "https://i.imghippo.com/files/YZK6549KW.jpg" },
        caption: `*Hello ${pushname}!*

*꧁ྀི*𝐒𝐇𝐄𝐈𝐊𝐇 𝐀𝐋𝐈 𝐌𝐃*ྀི꧂*
*Runtime:* ${runtime(process.uptime())}
*RAM Use:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB

*Choose an option below:*`,
        footer: '© Pᴏᴡᴇʀᴇᴅ Bʏ 𒁂𓄂❥.𝑺𝑯𝑬𝑰𝑲𝑯 𝑨𝑳𝑰 🔥༽༼࿐ ♡••²⁴⁰²',
        buttons,
        headerType: 4
      }
    }

    const sentMsg = await conn.sendMessage(from, buildButtonMessage(currentPage), { quoted: mek })

    conn.ev.on('messages.upsert', async ({ messages }) => {
      const msg = messages[0]
      if (!msg.message || !msg.message.buttonsResponseMessage) return
      const btnId = msg.message.buttonsResponseMessage.selectedButtonId

      if (msg.key.remoteJid !== from) return

      switch (btnId) {
        case 'next_page':
          currentPage++
          await conn.sendMessage(from, buildButtonMessage(currentPage), { quoted: mek })
          break
        case 'prev_page':
          currentPage--
          await conn.sendMessage(from, buildButtonMessage(currentPage), { quoted: mek })
          break
        case 'menu_dl':
          reply('📥 *Download Menu*\n• facebook\n• mediafire\n• twitter\n• mediafire\n• intsta\n• tiktok\n• spotify\n• pinterest\n• fb2\n• apk2\n• pins\n• tt2\n• img\n• apk\n• tiks\n• play\n• play2\n• play3\n• audio\n• video\n• video2\n• video3\n• ytmp3\n• ytmp4\n• song\n• mediafire\n• darama\n• gdrive\n• ssweb\n• tiks\n...')
          break
        case 'menu_ai':
          reply('🤖 *AI Menu*\n• ai\n• gpt3\n• gpt2\n• gptmini\n• gpt\n• meta\n• blackbox\n• luma\n• dj\n• sheikh\n• ali\n• gpt4\n• bing\n• imagine\n• imagine2\n• copilot\n...')
          break
        case 'menu_anime':
          reply('🎌 *Anime Menu*\n• fack\n• fack\n• dare\n• dog\n• awoo\n• garl\n• waifu\n• neko\n• megnumin\n• maid\n• loli\n• animegirl\n• animegirl1\n• animegirl2\n• animegirl3\n• animegirl4\n• animegirl5\n• anime1\n• anime2\n• anime3\n• anime4\n• anime5\n• animenews\n• foxgirl\n• naruto\n...')
          break
        case 'menu_convert':
          reply('🔄 *Convert Menu*\n• sticker\n• sticker2\n• emojimix\n• fancy\n• take\n• tomp3\n• tts\n• trt\n• base64\n• unbase64\n• binary\n• dbinary\n• tinyurl\n• urldecode\n• urlencode\n• url\n• repeat\n• ask\n• readmore\n...')
          break
        case 'menu_fun':
          reply('🎉 *Fun Menu*\n• shapar\n• rate\n• insult\n• hack\n• ship\n• character\n• pickup\n• joke\n• hrt\n• hpy\n• syd\n• anger\n• shy\n• kiss\n• mon\n• cunfuzed\n• setpp\n• hand\n• nikal\n• hold\n• hug\n• hifi\n• poke\n...')
          break
        case 'menu_main':
          reply('🏠 *Main Menu*\n• ping\n• ping2\n• speed\n• live\n• alive\n• runtime\n• uptime\n• repo\n• owner\n• menu\n• menu2\n• restart\n...')
          break
        case 'menu_group':
          reply('👥 *Group Menu*\n• grouplink\n• kickall\n• kickall2\n• kickall3\n• add\n• remove\n• kick\n• promote\n• demote\n• dismiss\n• revoke\n• setgoodbye\n• setwelcome\n• delete\n• getpic\n• ginfo\n• disappear on\n• disappear off\n• disappear 7D,24H\n• allreq\n• updategname\n• updategdesc\n• joinrequests\n• senddm\n• nikal\n• mute\n• unmute\n• lockgc\n• unlockgc\n• invite\n• tag\n• hidetag\n• tagall\n• tagadmins\n...')
          break
        case 'menu_owner':
          reply('👑 *Owner Menu*\n• owner\n• menu\n• menu2\n• vv\n• allmenu\n• repo\n• block\n• unblock\n• fullpp\n• setpp\n• restart\n• shutdown\n• updatecmd\n• alive\n• ping\n• gjid\n• jid\n...')
          break
        case 'menu_other':
          reply('📦 *Other Menu*\n• timenow\n• date\n• count\n• calculate\n• countx\n• flip\n• coinflip\n• rcolor\n• roll\n• fact\n• cpp\n• rw\n• pair\n• pair2\n• pair3\n• fancy\n• logo <text>\n• define\n• news\n• movie\n• weather\n• srepo\n• insult\n• save\n• wikipedia\n• githubstalk\n• yts\n• ytv...')
          break
        case 'menu_reaction':
          reply('😊 *Reactions Menu*\n• bully @tag\n• cuddle @tag\n• cry @tag\n• hug @tag\n• awoo @tag\n• kiss @tag\n• lick @tag\n• pat @tag\n• smug @tag\n• bonk @tag\n• yeet @tag\n• blush @tag\n• smile @tag\n• wave @tag\n• highfive @tag\n• highfive @tag\n• handhold @tag\n• nom @tag\n• bite @tag\n• glomp @tag\n• slap @tag\n• kill @tag\n• happy @tag\n• wink @tag\n• poke @tag\n• dance @tag\n• cringe @tag\n...')
          break
        case 'menu_scammer':
          reply('⚠️ *Scammer Info*\n•https://api.whatsapp.com/send?phone=923181093514&text=Hi+Randi+Ki+Olad+UK+UMAIR+LOL🖕🏻\n• https://api.whatsapp.com/send?phone=923094230218&text=Hi+Randi+Ki+Olad+UK+UMAIR+LOL🖕🏻\n• https://api.whatsapp.com/send?phone=447715929714&text=Hi+Randi+Ki+Olad+UK+UMAIR+LOL🖕🏻\n• https://api.whatsapp.com/send?phone=923092342318&text=Hi+Randi+Ki+Olad+UK+UMAIR+LOL🖕🏻\n• https://api.whatsapp.com/send?phone=923304093758&text=Hi+Randi+Ki+Olad+UK+UMAIR+LOL🖕🏻\n• https://api.whatsapp.com/send?phone=923202231275&text=Hi+Randi+Ki+Olad+UK+UMAIR+LOL🖕🏻\n• https://api.whatsapp.com/send?phone=923134885399&text=hi+bc+scammer🖕🏻\n• https://api.whatsapp.com/send?phone=923299539369&text=hi+bc+scammer🖕🏻\n...')
          break
        case 'menu_logo':
          reply('🖼️ *Logo Menu*\n• neonlight\n• galaxy\n• paint\n...')
          break
      }
    })
  } catch (e) {
    console.error(e)
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
    reply('An error occurred while processing your request.')
  }
})
