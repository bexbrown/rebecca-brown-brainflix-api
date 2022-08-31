const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");

function readVideos() {
    const videosFile = fs.readFileSync("./data/videos.json");
    const videosData = JSON.parse(videosFile);
    return videosData;
}

//get all videos
router.get("/videos", (req, res) => {
    const videos = readVideos();
    res.json(videos);
})

//get video by id
router.get("/videos/:videoId", (req, res) => {
    const videos = readVideos();
    const video = videos.find((video) => video.id === req.params.videoId);
    res.json(video);
})

//post video 
router.post(("/videos"), (req, res) => {

    const newVideo = {
        title: req.body.title,
        channel: "Test Channel",
        id: crypto.randomUUID(),
        image: "http://localhost:8000/images/Upload-video-preview.jpg",
        description: req.body.description,
        views: 0,
        likes: 0,
        timestamp: Date.now(),
        comments: [],
    }
    console.log(newVideo);
    const videos = readVideos();
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    res.status(201).json(newVideo);
})


//post comment
router.post(("/videos/:videoId/comments"), (req, res) => {
    const newComment = {
        comment: req.body.comment,
        likes: 0,
        name: req.body.name,
        timestamp: 1234567890,
    }
    const videos = readVideos();

    let newVideos = videos.map((video) => {
        return video;
    })

    const currentVideo = newVideos.find((video) => video.id === req.params.videoId);

    currentVideo.comments.push(newComment);

    fs.writeFileSync("./data/videos.json", JSON.stringify(newVideos));

    res.status(201).json(newComment);

})







module.exports = router;