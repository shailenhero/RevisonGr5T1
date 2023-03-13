const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const path = require('path');





const startDB = async function () {
    try {
        await mongoose.connect('mongodb+srv://shailenhero:rXZNDKgMjhvb6MYZ@subjectscluster.9jypgt9.mongodb.net/RevisionBookletData?retryWrites=true&w=majority')
        console.log("db Connected");
        app.listen(3000, function () {
            console.log("listening on port 3000");
        })
    } catch (error) {
        console.log(error);
        console.log("db unsuccessful");
    }
}

startDB();

////////////// setting defaults
const Subject = require('./DBModel/subjects');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'staticAssests')));
////////////// routes

app.get('/', function (req, res) {
    res.render("HomePage");
})

app.get('/:subject', async function (req, res) {
    const { subject } = req.params;
    console.log(subject);
    const subjectFound = await Subject.find({ subjectName: subject })
    // .then(function (res) {
    //     console.log("here is the data");
    //     console.log(res);
    // }).catch(function (err) {
    //     console.log(err);
    // })
    console.log(subjectFound);
    res.render("TopicsPage", { subject: subjectFound });

    // const newdata = new Subject({
    //     subjectName: "math",
    //     topic: "geo"
    // });

    // await newdata.save().then(function (res) {
    //     console.log(res);
    // }).catch(function (err) {
    //     console.log(err);
    // })


})

app.get('/:subject/:topic', async function (req, res) {
    const { subject, topic } = req.params;
    console.log(subject + topic);
    const subjectFound = await Subject.find({ subjectName: subject })
    const topicData = subjectFound[0].topics
    console.log(topicData);
    let topicFound = {};
    for (const currentTopic of topicData) {
        if (currentTopic.topicName === topic) {
            topicFound = currentTopic;
            console.log('topic found///////////////');
        }
    }
    console.log(topicFound);
    res.render(`Afrikaans/${topic}`, { topic: topicFound });
})


