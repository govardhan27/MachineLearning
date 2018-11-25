const outputs = [];

// Ran every time a balls drops into a bucket
function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
	outputs.push([dropPosition, bounciness, size, bucketLabel]);

};

// Write code here to analyze stuff
function runAnalysis() {
	const testSize = 50;
	const [testSet, trainingSet] = splitDataset(outputs, testSize);

	_.range(1, 15).forEach(k => {
		const accuracy = _.chain(testSet)
			.filter(testPoint => knn(trainingSet, testPoint[0], k) === testPoint[3])
			.size()
			.divide(testSize)
			.value()
		console.log('For k of ', k, ' Accuracy ', accuracy);
	});
};

// KNN Algorithm
function knn(data, point, k) {
	return _.chain(data)
		.map(row => [distance(row[0], point), row[3]])
		.sortBy(row => row[0])
		.slice(0, k)
		.countBy(row => row[1])
		.toPairs()
		.sortBy(row => row[1])
		.last()
		.first()
		.parseInt()
		.value()
};


function distance(pointA, pointB) {
	return Math.abs(pointA - pointB)
};

function splitDataset(data, testCount) {
	const shuffled = _.shuffle(data);

	const testSet = _.slice(shuffled, 0, testCount);
	const trainingSet = _.slice(shuffled, testCount);

	return [testSet, trainingSet];
};