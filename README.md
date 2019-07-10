# Cinuru Bot Commands

Cinuru's twist bot is designed to count emojis sent by user to user and keep a record of it. The bot can also be used to generate lunch pairing's for the companies lunch roulette. The following are instructions for how to call and use the bot.

---

###For Testing

To test this bot add a new bot in your twist account and start the express server in one terminal with node/nodemon bot.js and in another terminal start ngrok. Copy the forwarding address given by ngrok as your webhook entry for the twist bot created in twist and start using the below commands in the channel that the bot has been added to.

#### Lunch Roulette

This is triggered by the slash command `/lunch_pairs get` and will post a new set of pairs which replaces the comment of whoever called it. The syntax must be exactly as stated in the above command.

#### The Bot

The bot is another twist team member in the thread and will record how many emojis were sent to whom. It is triggered when adding `CinuruBot` as a person who is notified and with the specific key word `thank you`. You **must** use _'thank you'_. Using the words 'thanks!' or 'a big thank you to' is **not the right way to trigger the bot** and it will mess up the records. Whatever is written after the 'thank you' keywords **must** be the person's name of who you wish to thank as this is what the bot searches the message for. **DO NOT** include more than one person in a message.

​ In brief, add the bot as a person notified in the channel and write `thank you <person_thanked>`

In terms of emojis; it is possible to use smiley faces etc when thanking a person. However, any food or drink emojis will count as fruit or vegetables towards the count, so if you want to sent them, make sure that they are in a seperate message and the bot is not being notified in the message. For example;

​ `Thank you person for doing such a great job on project thing 😀😀 🍉🍉🥝🍉`

This will count 4 emojis and record the name as 'person'.

​ `Thank you person for doing such a great job on project thing 😀 🍉🍉🥝🍉 Have a great night tonight 🍺🥂🍷`

This will also include the drink emojis and have a **count of 7**, which is not what is desired.

​ In brief, any food or drink emojis will be included when the bot is triggered so keep this in mind.

#### The Bot Slash Commands

`/check_fruits <person>`

To check how many fruits a person has simply type `/check_fruits <person>`. The <person> in this case is the name of somebody in the database. Decide on the names that you wish to use for thanking and storing fruits because it will not work for a misspelled name.

`/fruits_rank get`

This command will return the top 4 people ranked in the fruits rank.

​
