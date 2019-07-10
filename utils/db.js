const utils = require('util');
const Datastore = require('nedb');

const db = new Datastore({ filename: './data.json', autoload: false });

const findOne = (username) => {
	return new Promise((resolve, reject) => {
		db.loadDatabase((err) => {
			if (err) {
				reject(err);
				return;
			}
			db.findOne({ name: username }, (err, doc) => {
				if (err) {
					reject(err);
				}
				resolve(doc);
			});
		});
	});
};
const findFruitLeaderBoard = () => {
	return new Promise((resolve, reject) => {
		db.loadDatabase((err) => {
			if (err) {
				reject(err);
				return;
			}
			db.find({}, (err2, doc) => {
				if (err2) {
					reject(err2);
				}
				resolve(doc);
			});
		});
	});
};

const insertOrUpdate = async (username, fruitAmount) => {
	const res = await findOne(username);
	return new Promise((resolve, reject) => {
		db.loadDatabase((err) => {
			if (err) {
				reject(err);
				return;
			}
			if (!res) {
				db.insert({ name: username, fruits: fruitAmount }, (err2, doc2) => {
					if (err2) {
						reject(err2);
					}
					resolve(doc2);
				});
			} else {
				const fruitsTotal = res.fruits + fruitAmount;
				console.log('updating fruit for ' + username + ' in db');
				db.update(
					{ name: username },
					{ name: username, fruits: fruitsTotal },
					{ upsert: true },
					(err3, doc3) => {
						if (err3) {
							reject(err3);
						}
						console.log('successfully updated entry in db ', doc3);
						resolve(doc3);
					}
				);
			}
		});
	});
};

exports.getLeaderBoard = async () => {
	const res = await findFruitLeaderBoard();

	let arrayOfLeadersStrings = [];

	const res2 = res.sort((a, b) => b.fruits - a.fruits);
	res2.forEach((arrayItem) => {
		let x = arrayItem.fruits;
		let y = arrayItem.name;
		let z = `Well done ${y} you have ${x} emojis!`;
		arrayOfLeadersStrings.push(z);
	});
	return arrayOfLeadersStrings;
};

exports.createOrUpdateUserFruits = async (username, fruitAmount) => {
	await insertOrUpdate(username, fruitAmount);
};

exports.searchUser = async (username) => {
	const res = await findOne(username);
	return res;
};
