const express = require('express');
const getUrls = require('get-urls');
const axios = require('axios');
const youtubeData = require('./youtube.json');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('What are you doing here?'));
app.get('/check', (req, res) => {
  try {
  let severity = 1;
	const url = req.query.url;
	let urlSet = getUrls(url);
	let urlArray = {};
	urlArray = [...urlSet];
	if (urlArray.length <= 0) {
		res.json({rickroll: false, urlList: urlArray, query: url, });
	}
	for (i = 0; i < urlArray.length; i++) {
		axios.get(urlArray[i]).then(function(response) {
			let URL = response.request.res.responseUrl;
			for (i = 0; i <= youtubeData.length; i++) {
				if (URL.includes(youtubeData[i])) {
					severity++;
				}
			}
		});
	}
	if(severity == 0){
	   res.json({ rickroll: false, urlList: urlArray, query: url, rickrollCount: severity });
	} else {
	   res.json({ rickroll: true, urlList: urlArray, query: url , rickrollCount: severity});
	}
  } catch(error){
    console.error(error)
    res.status(400)
    res.json({ message: 'Something went wrong. Please try again later.'});
  }
});

app.listen(port, () => console.log(`Server working!`));

