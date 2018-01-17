const api = 'http://localhost:8080/api';
const input = document.getElementById('link');
const sendBtn = document.getElementById('send-btn');
const video = document.getElementById('video');

let link = ''; // http://cdn02.nativeroll.tv/nr/3/videoplayback_1024.mp4';
input.onchange = function(event) {
	let { value } = event.target;
	link = value;
};

sendBtn.onclick = function() {
	const request = new Request(`${api}/link`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ link })
	});

	fetch(request)
		.then(res => res.text())
		.then(link => {
			video.src = link;
			video.play();
		})
		.catch(err => console.log(err));
};
