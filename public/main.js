const api = 'http://localhost:8080/api';
const input = document.getElementById('link');
const form = document.querySelector('form');
const video = document.getElementById('video');

let link = '';
input.onchange = function(event) {
	let { value } = event.target;
	link = value;
};

form.onsubmit = function(e) {
	e.preventDefault();
	const request = new Request(`${api}/link`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ link })
	});

	fetch(request)
		.then(res => {
			if (res.status === 400) {
				throw new Error(res.statusText);
			} else {
				return res.json();
			}
		})
		.then(({ link, from }) => {
			console.log(from);
			video.src = link;
			video.play();
		})
		.catch(err => {
			console.log(err.message);
		});
};
