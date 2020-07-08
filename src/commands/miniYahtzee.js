const { Command } = require('discord-akairo');
User = require('../models/user').User

const DICE_EMOJI = [
    "1⃣",
    "2⃣",
    "3⃣",
    "4⃣",
    "5⃣",
    "6⃣",
];


class MiniYahtzeeCommand extends Command {
    constructor() {
        super('miniYahtzee', {
            aliases: ['miniyahtzee', 'my', 'yaht', 'yahtzee'],
            category: 'Money',
            description: {
                desc: 'Gamble your money with some dice!',
                format: '$yaht {amount}',
                example: '$yaht 100'
            },
            args: [{
                id: 'amount',
                default: 0
            }, {
                id: 'payout',
                match: 'flag',
                flag: '--payout'
            },
            {
                id: 'bonus',
                match: 'flag',
                flag: '--bonus'
            },]
        })
    }

    async exec(message, args) {
        const user = await new User(message.author.id).update();
        const embed = {
            color: '#C4FAF8'
        };
        if (args.bonus) {
            embed.title = `==Mini Yahtzee Bonuses==`;
            embed.fields = [{
                    name: `**Yahtzee (all the same numbers)**`,
                    value: `Dice Sum + 100`
                },
                {
                    name: `**Run (Consecutive numbers)**`,
                    value: `Dice Sum + 60`
                },
                {
                    name: `**Four of a Kind**`,
                    value: `Dice Sum + 40`
                },
                {
                    name: `**Full House (Pair and Three of a Kind)**`,
                    value: `Dice Sum + 25`
                },
                {
                    name: `**Three of a Kind**`,
                    value: `Dice Sum + 15`
                },
                {
                    name: `**None of the above**`,
                    value: `Dice Sum`
                }
            ]
            message.channel.send({ embed });
        } else if(args.payout){
            embed.title = `==Mini Yahtzee Payout==`;
            embed.fields = [{
                    name: `**Score >= 100**`,
                    value: `x10`
                },
                {
                    name: `**Score >= 75**`,
                    value: `x7`
                },
                {
                    name: `**Score >= 45**`,
                    value: `x3`
                },
                {
                    name: `**Score >= 32**`,
                    value: `x2`
                },
                {
                    name: `**Score >= 20**`,
                    value: `x1`
                },
                {
                    name: `Score < 20`,
                    value: `x0`
                }
            ]
            message.channel.send({ embed });
        } else if (args.amount == 0) {
            embed.title = `ERROR`;
            embed.description = `Must give a amount over 0 to bet`;
            message.channel.send({ embed });
        } else if (user.currency < args.amount || ((args.amount == 'all' || args.amount == 'half') && user.currency == 0)) {
            embed.title = `ERROR`;
            embed.description = `Insufficient funds`;
            message.channel.send({ embed });
        } else {
            const value = args.amount == 'all' ? user.currency : args.amount == 'half' ? user.currency / 2 : args.amount;
            //user.setCurrency(user.currency - value);
            let roll = [];
            for (let i = 0; i < 5; i++) {
                roll.push(Math.floor(Math.random() * 6));
            }
            console.log(roll);
            const columnLetters = '🇦 🇧 🇨 🇩 🇪\n';
            const diceRoll = `${DICE_EMOJI[roll[0]]} ${DICE_EMOJI[roll[1]]} ${DICE_EMOJI[roll[2]]} ${DICE_EMOJI[roll[3]]} ${DICE_EMOJI[roll[4]]}`
            embed.title = columnLetters + diceRoll;
            embed.description = `You have 10 seconds to reroll any dice A-E\nType "rr (letters) to reroll, or "rr" for no reroll`;
            message.channel.send({ embed });
            const filter = m => m.content.startsWith('rr');
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 10000 });
            collector.on('collect', message => {
                if (message.content.startsWith("rr")) {
                    console.log(message.content.toLowerCase());
                    if(message.content.toLowerCase().includes('a')){
                        //console.log(roll);
                        roll[0] = Math.floor(Math.random() * 6);
                        //console.log(roll);
                    }
                    if(message.content.toLowerCase().includes('b')){
                        roll[1] = Math.floor(Math.random() * 6);
                    }
                    if(message.content.toLowerCase().includes('c')){
                        roll[2] = Math.floor(Math.random() * 6);
                    }
                    if(message.content.toLowerCase().includes('d')){
                        roll[3] = Math.floor(Math.random() * 6);
                    }
                    if(message.content.toLowerCase().includes('e')){
                        roll[4] = Math.floor(Math.random() * 6);
                    }
                }
                //console.log(roll);
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
                //console.log(roll);
                embed.title = `${DICE_EMOJI[roll[0]]} ${DICE_EMOJI[roll[1]]} ${DICE_EMOJI[roll[2]]} ${DICE_EMOJI[roll[3]]} ${DICE_EMOJI[roll[4]]}`
                let sum = 0;
                for(let i = 0; i < 5; i++){
                    sum+=roll[i] + 1;
                }
                let bonus = `None`;
                let bonusPoints = 0;
                let winningsMultiplier = 1;
                let diceQuantity = [0,0,0,0,0,0];
                for(let i = 0; i < 5; i++){
                    diceQuantity[roll[i]]++;
                }
                //check yahtzee
                if(diceQuantity.includes(5)){
                    bonus = `Yahtzee`;
                    bonusPoints = 100;
                } else if(diceQuantity.includes(4)){
                    bonus = `Four of a Kind`;
                    bonusPoints = 40;
                } else if(diceQuantity.includes(3)){
                    if(diceQuantity.includes(2)){
                        bonus = `Full House`;
                        bonusPoints = 25;
                    } else {
                        bonus = `Three of a Kind`;
                        bonusPoints = 15;
                    }
                }
                console.log(diceQuantity);
                //check run
                if(JSON.stringify(diceQuantity)==JSON.stringify([0,1,1,1,1,1]) || JSON.stringify(diceQuantity)==JSON.stringify([1,1,1,1,1,0])){
                    
                    bonus = `Run`;
                    bonusPoints = 60;
                }
                sum += bonusPoints;
                if(sum >= 100){
                    winningsMultiplier = 10;
                } else if(sum >= 75){
                    winningsMultiplier = 7;
                } else if(sum >= 45){
                    winningsMultiplier = 3;
                } else if(sum >= 32){
                    winningsMultiplier = 2;
                } else if(sum >= 20){
                    winningsMultiplier = 1;
                } else {
                    winningsMultiplier = 0;
                }

                embed.description = `\nBonus: ${bonus}\nSum: ${sum}\nWinnings: (todo)`;
                message.channel.send({ embed });
            });

        }
       
    }
}

module.exports = MiniYahtzeeCommand;