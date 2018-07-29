import express from 'express';
import * as config from '../config.json';
import { YoutubeService } from '../services/youtube';

const router = express.Router();
const service = new YoutubeService();

/* GET home page. */
router.get('/', async (req, res) => {
  let code = req.query.countryCode;
  const trends = await service.getTrendingVideos(code);
  res.render('youtube/index', {
    title: config.title,
    videos: trends,
    countries: config.countryList,
    selectedCountry: code
  });
});

router.get('/:videoId', async (req, res) => {
  res.render('youtube/player', {
    title: config.title,
    countries: config.countryList
  });
});

module.exports = router;
