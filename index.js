const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const path = require('path');
const methodeOverride = require('method-override');
const PORT = process.env.PORT || 3000;


const startDB = async function () {
    try {
        await mongoose.connect('mongodb+srv://shailenhero:rXZNDKgMjhvb6MYZ@subjectscluster.9jypgt9.mongodb.net/RevisionBookletData?retryWrites=true&w=majority')
        console.log("db Connected");

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
app.use(methodeOverride('_method'));
////////////// routes

app.listen(PORT, function () {
    console.log("listening on port 3000");
})


app.get('/', function (req, res) {
    res.render("HomePage");
})

app.get('/:subject', async function (req, res) {
    const { subject } = req.params;

    const subjectFound = await Subject.find({ subjectName: subject })
    // .then(function (res) {
    //     console.log("here is the data");
    //     console.log(res);
    // }).catch(function (err) {
    //     console.log(err);
    // })

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
    //console.log(subject + topic);
    const subjectFound = await Subject.find({ subjectName: subject })
    const topicData = subjectFound[0].topics
    //console.log(topicData);
    let topicFound = {};
    for (const currentTopic of topicData) {
        if (currentTopic.topicName === topic) {
            topicFound = currentTopic;
            console.log('topic found///////////////');
        }
    }
    //console.log(topicFound);
    res.render(`${topic}`, { topic: topicFound });
})

app.put('/', async function (req, res) { // handle form score data
    const { score, topicName, corrections } = req.body;
    console.log("/////////////////////score")
    console.log(score);
    console.log(topicName);
    console.log(corrections);

    // capture corrections
    let sentence = ""
    const correctionsArr = []
    for (let i = 0; i < corrections.length; i++) {
        if (corrections[i] === ",") {
            //push word to array
            correctionsArr.push(sentence)
            sentence = ""
        }
        else {
            //push letter to word
            sentence = sentence + corrections[i];
        }
    }
    console.log("/////////////////////Corrections array")
    console.log(correctionsArr);

    // update score in db
    const updatedScore = await Subject.updateOne(
        {
            "topics.topicName": topicName
        },
        {
            "$set": {
                "topics.$.score": score
            }
        });

    //update corrections in db
    const updatedCorrections = await Subject.updateOne(
        {
            "topics.topicName": topicName
        },
        {
            "$set": {
                "topics.$.corrections": correctionsArr
            }
        });


    console.log("/////////////////////updated score")
    console.log(updatedScore);
    res.redirect('/')
})

//handling corrections
app.get('/:subject/:topic/corrections', async function (req, res) {
    const { subject, topic } = req.params;
    const subjectFound = await Subject.find({ subjectName: subject })
    console.log(subjectFound)
    topicdata = subjectFound[0].topics
    console.log(topicdata)
    res.render(`${topic}Corrections`, { topicdata });
})


