const { Command } = require('discord-akairo');
User = require('../models/user').User

const SLOT_EMOJI = ["<:Number_7:399057286024265747>",
    "<:cherry:399073094314098699>",
    "<:banana:399073130074734603>",
    "<:diamond:399098047105335306>",
    "<:watermelon:399098183881457664>"
];

const coinEmoji = "<:coins:729903134536630314>";

class SlotsCommand extends Command {
    constructor() {
        super('slots', {
            aliases: ['slots', 'sl'],
            category: 'Money',
            description: {
                desc: 'Gamble your money with slots!',
                format: '$slots {amount}',
                example: '$slots 100'
            },
            args: [{
                id: 'amount',
                default: 0
            }, {
                id: 'payout',
                match: 'flag',
                flag: '--payout'
            }]
        })
    }

    async exec(message, args) {
        const user = await new User(message.author.id).update();
        const embed = {
            color: '#C4FAF8'
        };
        if (args.payout) {
            embed.title = `==Slot Machine Payout==`;
            embed.fields = [{
                    name: `**Lucky 7's**`,
                    value: `<:Number_7:399057286024265747> <:Number_7:399057286024265747> <:Number_7:399057286024265747> - 15x`
                },
                {
                    name: `**Diamonds**`,
                    value: `<:diamond:399098047105335306> <:diamond:399098047105335306> <:diamond:399098047105335306> - 10x`
                },
                {
                    name: `**Watermelons**`,
                    value: `<:watermelon:399098183881457664> <:watermelon:399098183881457664> <:watermelon:399098183881457664> - 7x`
                },
                {
                    name: `**Bananas**`,
                    value: `<:banana:399073130074734603> <:banana:399073130074734603> <:banana:399073130074734603> - 5x`
                },
                {
                    name: `**Cherries**`,
                    value: `<:cherry:399073094314098699> <:cherry:399073094314098699> <:cherry:399073094314098699> - 4x `
                },
                {
                    name: `**Cherries**`,
                    value: `<:cherry:399073094314098699> <:cherry:399073094314098699> Any Order -  2x`
                }
            ]

        } else if (args.amount == 0) {
            embed.title = `ERROR`;
            embed.description = `Must give a amount over 0 to bet`;
        } else if (user.currency < args.amount || ((args.amount == 'all' || args.amount == 'half') && user.currency == 0)) {
            embed.title = `ERROR`;
            embed.description = `Insufficient funds`;
        } else {
            const value = args.amount == 'all' ? user.currency : args.amount == 'half' ? user.currency / 2 : args.amount;
            user.setCurrency(user.currency - value);
            let number = [];
            for (let i = 0; i < 9; i++) {
                number.push(Math.floor(Math.random() * 5));
            }
            const slotImage1 = `<:transparent:729708731159281664>${SLOT_EMOJI[number[0]] + SLOT_EMOJI[number[1]] + SLOT_EMOJI[number[2]]}<:transparent:729708731159281664>`
            const slotImage2 = `\n:arrow_forward:${SLOT_EMOJI[number[3]] + SLOT_EMOJI[number[4]] + SLOT_EMOJI[number[5]]}:arrow_backward:`
            const slotImage3 = `\n<:transparent:729708731159281664>${SLOT_EMOJI[number[6]] + SLOT_EMOJI[number[7]] + SLOT_EMOJI[number[8]]}<:transparent:729708731159281664>`
            const finalSlotImage = slotImage1 + slotImage2 + slotImage3;
            embed.description = finalSlotImage;
            if (number[3] == number[4] && number[3] == number[5]) {
                const multipler = number[3] == 0 ? 15 : number[3] == 1 ? 4 : number[3] == 2 ? 5 : number[3] == 3 ? 10 : 7;
                embed.description = embed.description + `\n\n**You won ${parseInt(value * multipler)} ${coinEmoji}!**`
                user.setCurrency(user.currency + multipler * (parseInt(value)));
            } else if (number[3] == 1 && number[4] == 1 || number[4] == 1 && number[5] == 1 || number[3] == 1 && number[5] == 1) {
                embed.description = embed.description + `\n\n**You won ${parseInt(value * 2)} ${coinEmoji}!**`
                user.setCurrency(user.currency + 2 * (parseInt(value)));
            } else {
                embed.description = embed.description + `\n\n**Sorry, you lost :(**`;
            }
        }
        message.channel.send({ embed });
    }
}

module.exports = SlotsCommand;