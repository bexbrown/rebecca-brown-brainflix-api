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

    if (!req.body.title) {
        res.status(400).send("There must be a title");
        return;
    }

    if (req.body.title.length < 3) {
        res.status(400).send("Title must be at least 3 characters in length");
        return;
    }

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

    if (!req.body.comment) {
        res.status(400).send("There must be a comment");
        return;
    }

    if (req.body.comment.length < 3) {
        res.status(400).send("Comment must be at least 3 characters in length");
        return;
    }

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