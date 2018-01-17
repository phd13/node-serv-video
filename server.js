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
	let { link } = req.body;
	let fileName = path.basename(link);
	fs.stat(path.resolve(__dirname, 'public', fileName), err => {
		if (err) {
			console.log(err); // скачивает файл и сохраняет с таким же именем в /public
			let writeStream = fs.createWriteStream(path.resolve(__dirname, 'public', fileName));
			let readStream = request.get(link);
			readStream.pipe(writeStream);
			readStream.on('end', () => res.send(`http://localhost:8080/${fileName}`));
		} else {
			res.send(`http://localhost:8080/${fileName}`);
		}

	})
});

app.use((req, res, next) => {
	res.status(404).send('404 NOT FOUND');
});

app.listen(port, () => {
	console.log(`API app started on port ${port}!`);
});
