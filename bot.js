const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const lunchPairs = require('./lunchPairingScript');
const localPort = 3000;
const db = require('./utils/db');

const searchMessageForReceiver = (message) => {
	const thankYou = 'thank you ';
	const indexOfThankYou = message.indexOf(thankYou);

	let nameToReturn = '';
	const indexForLoopToStartFrom = Number(indexOfThankYou + thankYou.length);
	for (let i = indexForLoopToStartFrom; i < indexForLoopToStartFrom + 20; i++) {
		if (message[i] !== ' ') {
			nameToReturn += message[i];
		} else {
			return nameToReturn;
		}
	}
};

// Parse POST requests with JSON or URLEncoded
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
///////// Routes

app.post('/check_fruits', async (req, res) => {
	const personToSearch = req.body.command_argument;
	const personSearchResult = await db.searchUser(personToSearch);
	res.send(personSearchResult.name + ' has an emoji count of ' + personSearchResult.fruits);
});

app.post('/fruits_rank', async (req, res) => {
	const fruitsLeadersResult = await db.getLeaderBoard();
	res.send(`fruits ranks are as follows:
				 ${fruitsLeadersResult[0]}
				 ${fruitsLeadersResult[1]}
				 ${fruitsLeadersResult[2]}
				 ${fruitsLeadersResult[3]}
				 `);
});

app.post('/bot', (req, res) => {
	let emojiCount = 0;
	const message = req.body.content.toLowerCase();
	const personThanked = searchMessageForReceiver(message);
	for (let i = 0; i < message.length; i++) {
		// convert message string characters to numbers for filtering food emojis and count
		if (message[i].codePointAt(0) === 55358 || message[i].codePointAt(0) === 55356) {
			emojiCount++;
			i++;
		}
	}
	if (emojiCount) {
		db.createOrUpdateUserFruits(personThanked, emojiCount);
		res.send('How kind of you, you sent ' + emojiCount + ' tasty fruits to ' + personThanked);
	} else {
		res.send(
			'Awww no fruits today :(. See how many you have by typing "/thank_you <persons_name>" into the thread'
		);
	}
});

app.post('/lunch_pairs', (req, res) => {
	const printOutPairs = lunchPairs.startPairsForLunch();
	const match1 = printOutPairs[0];
	const match2 = printOutPairs[1];
	const match3 = printOutPairs[2];
	const match4 = printOutPairs[3];
	const match5 = printOutPairs[4];
	res.send({
		match1,
		match2,
		match3,
		match4,
		match5,
	});
});

app.listen(process.env.PORT || localPort, () =>
	console.log(`Server listening on port ${process.env.PORT || localPort}`)
);
