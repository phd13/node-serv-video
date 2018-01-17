const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = 8080;

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/link', (req, res) => {
	let regexp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
	let { link } = req.body;
	let isValidLink = regexp.test(link);
	let fileName = path.basename(link);
	if (isValidLink) {
		fs.stat(path.resolve(__dirname, 'public', fileName), err => {
			if (err) {
				const data = {
					link: `http://localhost:8080/${fileName}`,
					from: 'Video has been downloaded to our server from outer resource!'
				};
				let writeStream = fs.createWriteStream(path.resolve(__dirname, 'public', fileName));
				let readStream = request.get(link);
				readStream.pipe(writeStream);
				readStream.on('end', () => res.send(data));
			} else {
				const data = {
					link: `http://localhost:8080/${fileName}`,
					from: 'Video is streaming from our server!'
				};
				res.send(data);
			}
		});
	} else {
		res.status(400).send('BAD REQUEST: INVALID LINK SENT');
	}
});

app.use((req, res, next) => {
	res.status(404).send('404 NOT FOUND');
});

app.listen(port, () => {
	console.log(`API app started on port ${port}!`);
});
