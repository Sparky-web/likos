const { Telegraf   } = require('telegraf')

const token = "1402932590:AAEV6EY9dd_tm3AOORHBTVCl-y3VdqN9Fs0"

module.exports = async (ctx, next) => {
    await next();

    const body = ctx.request.body
    const bot = new Telegraf(token)
    const order = `
❗ Новый заказ с сайта: Ликос | Плазменная резка ❗
Имя: ${body.name}
Контакты: ${body.email}
Сообщение: ${body.comment}

Время: ${Date()}

🔷 Заказ: ${body.order}

`
    for(let chatId of ["438670811", "351858949"]) {
        await bot.telegram.sendMessage(chatId, order).catch(err => {
            console.error(err)
            ctx.status = 500
            ctx.message = "Couldn't send telegram notification"
        })
    }

};
