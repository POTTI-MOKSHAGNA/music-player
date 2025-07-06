const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');

router.get('/search', musicController.searchMusic);

router.get('/track/:id', musicController.getTrackById);

router.get('/album/:id', musicController.getAlbumById);

router.get('/artist/:id', musicController.getArtistById);

router.get('/chart', musicController.getChart);

router.get('/genres', musicController.getGenres);

router.get('/genre/:id/tracks', musicController.getTracksByGenre);

module.exports = router;