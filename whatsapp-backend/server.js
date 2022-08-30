import express, { response } from "express"
import mongoose from "mongoose"
import { MongoClient, ServerApiVersion } from "mongodb"
import dotenv from 'dotenv'
import MessageContents from "./dbMessages.js"
import Cors from "cors"
import Pusher from "pusher"
dotenv.config();



// App Config
const app = express();
const port = process.env.PORT || 9000;
const connection_url = `mongodb+srv://admin:${process.env.PASSWORD}@tinder-cluster.qy1vbqv.mongodb.net/test?retryWrites=true&w=majority`;

const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true
});

pusher.trigger("my-channel", "my-event", {
    message: "hello world"
});



// Middlewares
app.use(express.json()); // its sends responses as a json object
app.use(Cors());


// Db Config
mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
async function run() {
    try {
        // Mongoose
        let query = await MessageContents.find({});
        console.log("query: " + query);


        // Mongo Client
        //const client = new MongoClient(connection_url);
        // const database = client.db('tinder-clone');
        // const collection_cards = database.collection('cards');
        // let cursor = collection_cards.find();
        // let result = await cursor.toArray();
        // console.log("card1: "+result)


    } finally {
    }
}
run().catch(console.dir);

const db = mongoose.connection
db.once("open", () => {
    console.log("Db connected")

    const msgCollection = db.collection("messagecontents");
    // mongoose'un isimlendirme şekline göre isim değişebiliyor. 
    // örn MessageContent olarak kaydetsen bile mongoose onu messagecontents olarak değiştiriyor. Sonuna "s" takısı ve hepsi küçük harf olarak. 
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change) => {
        console.log(change)

        if (change.operationType === "insert") {
            const MessageDetails = change.fullDocument;

            pusher.trigger("messages", "inserted", {
                name: MessageDetails.name,
                message: MessageDetails.message,
                timestamp: MessageDetails.timestamp,
                received: MessageDetails.received
            })
        }
        else {
            console.log("Pusher triggerlanırken hata meydana geldi.")
        }
    })

})



// API Endpoints
app.get("/", (req, res) =>
    res.status(200).send("Hello World")
);

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;
    MessageContents.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
});

app.get("/messages", (req, res) => {

    MessageContents.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    })
})

// Listener
app.listen(port, () => console.log("listening on localhost: " + port));