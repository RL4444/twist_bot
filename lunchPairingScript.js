const data = require('./lunch-pairing-script/people.json');
const fs = require('fs');
const people = data.people;

exports.startPairsForLunch = () => {
	let newLunchPairsNumbers = [];
	let numberToPush;
	let match1 = [];
	let match2 = [];
	let match3 = [];
	let match4 = [];
	let match5 = [];

	const randomNumber = () => Math.floor(Math.random() * people.length);
	const checkArrayForDuplicates = (num) => {
		for (let j = 0; j < newLunchPairsNumbers.length; j++) {
			if (num === newLunchPairsNumbers[j]) {
				numberToPush = randomNumber();
				checkArrayForDuplicates(numberToPush);
			}
		}
		return num;
	};

	const generatePeopleArray = () => {
		for (let i = 0; i < people.length; i++) {
			numberToPush = randomNumber();
			checkArrayForDuplicates(numberToPush);
			newLunchPairsNumbers.push(numberToPush);
		}
	};

	let lastWeeksPairs = fs.readFileSync('pairs.json', 'utf8'); // temp array for testing

	generatePeopleArray();

	match1 = newLunchPairsNumbers.slice(0, 2).sort();
	match2 = newLunchPairsNumbers.slice(2, 4).sort();
	match3 = newLunchPairsNumbers.slice(4, 6).sort();
	match4 = newLunchPairsNumbers.slice(6, 8).sort();
	match5 = newLunchPairsNumbers.slice(8, 10).sort();

	newLunchPairsNumbers = [match1, match2, match3, match4, match5].sort();

	const compareLastWeeksMatchesForDuplicates = (newLunchPairsNumbers, lastWeeksPairs) => {
		for (let i = 0; i < newLunchPairsNumbers.length; i++) {
			for (let j = 0; j < newLunchPairsNumbers[i].length; j++) {
				if (
					newLunchPairsNumbers[i][j] === lastWeeksPairs[i][j] &&
					newLunchPairsNumbers[i][j + 1] === lastWeeksPairs[i][j + 1]
				) {
					console.log('Some pairs from last week have occured again - restarting');
					startPairsForLunch();
				}
				return newLunchPairsNumbers;
			}
		}
	};
	const checkedArrayOfNumbers = compareLastWeeksMatchesForDuplicates(
		newLunchPairsNumbers,
		lastWeeksPairs
	);

	const replaceUndefinedNameWithGroup = (name, index) => {
		if (typeof name === 'undefined') {
			const generateRandomGroupNumber = Math.floor(Math.random() * newLunchPairsNumbers.length);
			if (index === generateRandomGroupNumber) {
				replaceUndefinedNameWithGroup(name, index);
			} else {
				const groupNumber = generateRandomGroupNumber + 1;
				return 'Group ' + groupNumber + ' ';
			}
		} else {
			return name;
		}
	};

	fs.writeFileSync('pairs.json', JSON.stringify(newLunchPairsNumbers));
	const arrayOfStrings = [];
	const sortNamesFromNumbers = (newLunchPairsNumbers) => {
		for (let i = 0; i < newLunchPairsNumbers.length; i++) {
			for (let j = 0; j < newLunchPairsNumbers[i].length; j += 2) {
				arrayOfStrings.push(
					replaceUndefinedNameWithGroup(people[newLunchPairsNumbers[i][j]], i) +
						' have a nice lunch with ' +
						replaceUndefinedNameWithGroup(people[newLunchPairsNumbers[i][j + 1]], i) +
						' 🌮 🌮'
				);
			}
		}
	};

	sortNamesFromNumbers(checkedArrayOfNumbers);
	return arrayOfStrings;
};
