const express = require('express')
var router = express.Router();
const hxz = require('hxz-api')
const yts = require('yt-search')
const axios = require('axios')
__path = process.cwd()
const fs = require('fs')
const { getBuffer } = require('../lib/function')

const { ytv, yta } = require('../scraper/ytdl')

router.get('/youtube', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'Link not found!' })
	var yt1 = await yta(link)
	var yt2 = await ytv(link)
	//const audioUrl = await shorts('converter/toFile?url='+yt1.dl_link)
	//const videoUrl = await shorts('converter/toFile?url='+yt2.dl_link)
	try {
		res.json({
			title: yt1.title,
			thumb: yt1.thumb,
			filesize_audio: yt1.filesizeF,
			filesize_video: yt2.filesizeF,
			audio: yt1.dl_link,
			video: yt2.dl_link,
		})
	} catch(err) {res.json({ message: 'Ups, error' })}
})
router.get('/play', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	let results = await yts(query)
  	let vid = results.all.find(video => video.seconds < 3600)
	if (!vid) return res.json({ message: 'not found!'})
	var hasil = await axios.get('https://tyz-api.herokuapp.com/downloader/youtube?link='+vid.url)
	try {
		res.json(hasil.data)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})


module.exports = router
