const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // to load environment variables from .env file


// Load environment variables like MongoDB URI from .env file
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT;

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
    extended: false
}));

// list key urls
var main_uri = "/lab9.html";
/* Requirement #7.5: The web application needs to have an express URI (/bookinventory/add) 
 * where a user can add a book to the inventory. */
var add_uri = "/bookinventory/add";
var add_uri_post = "/bookinventory/addbook";
/* Requirement #7.6: The web application needs to have an express URI (/bookinventory/list) 
 * where a user can list the entire book inventory. */
var list_uri = "/bookinventory/list";

// Connect to MongoDB
// from https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose
async function connectMongoose() {
    await mongoose.connect(process.env.MONGO_URI);

    // Add connection error handlers
    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB disconnected");
    });
}

try {
    connectMongoose();
    console.log(`MongoDB Connected`);
}   
catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    console.error(`Error: ${err.message}`);
    process.exit(1);
}

// Define the Schema
const BookSchema = new mongoose.Schema(

    /* Requirement #7.4: A book is a JSON object with properties: 
     * title, author, publisher, date, and website.     
     */
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        publisher: { type: String, required: true },
        date: { type: String, required: true }, // technically should be Date but only month and year
        website: { type: String, required: true },
    }, 
    {   //preexisting collection, so to ensure a match
        collection: 'books',
        strict: false // Allow unknown fields 
    }
);

// Create the Model, and identify the preexisting condition via 3rd parameter
const Book = mongoose.model('books', BookSchema, 'books'); // specify the collection name as 'books'


/* ==========================================================================================
   ==================================== CRUD OPERATIONS =====================================
   ========================================================================================== */

// Ensure the Main Page is accessible at the root URI
app.get('/', function (req, res) {
    //res.redirect(main_uri); // can't be redirected to a local file, so use sendFile instead
    res.sendFile(__dirname + main_uri)
});

// LIST BOOK INVENTORY
app.get(list_uri, function (req, res) {
    console.log("Trying to retrieve books");

    async function retrieveBooks() {
        try{
            /*NOTE: Model.find() returns a Mongoose Query object, 
             * if executed it returns a promise, the promise resolves to an array of docs
             */
            const books = await Book.find({});
            console.log("Book retrieved from MongoDB:", books);

            // create the HTML. future: pug or react template
            var html = '<p>'
            books.forEach(book => {
                html = html + "<b>Title: </b>" + book.title + "<br>";
                html = html + "<b>Author: </b>" + book.author + "<br>";
                html = html + "<b>Publisher: </b>" + book.publisher + "<br>";
                html = html + "<b>Date: </b>" + book.date + "<br>";
                html = html + "<b>Website: </b>" + book.website + "<br><br>";
            });
            html += '</p>'
                
            res.send(
                    "<h1>Book Inventory</h1>"
                    + "<h2>Artemis Lee</h2>"
                    + "<h3>Inventory List of books: </h3>"
                    + html
                    + '<a href="/"> <button>Back to Main Page</button></a>'
            );
        }
        catch (err) {
            console.error("Error retrieving books from MongoDB:", err);
            res.status(500).send(
                'Error: Failed to retrieve book inventory from database!'
                + '<br><a href="/"> <button>Back to Main Page</button></a>'
            );
            return;
        } 
    } // END async function retrieveBooks()
    retrieveBooks();
});


app.get(add_uri, function (req, res) {
    var html = '<form action="/bookinventory/addbook" method="POST">'
        + '<input type="text" placeholder="title" name="title" />'
        + '<input type="text" placeholder="author" name="author" />'
        + '<input type="text" placeholder="publisher" name="publisher" />'
        + '<input type="text" placeholder="date" name="date" />'
        + '<input type="text" placeholder="website" name="website" />'
        + '<button type="submit">Submit</button>'
        + '</form> '

    res.send('Insert a book: '
        + html
        + '<a href="/bookinventory/list"><button>List Book Inventory</button></a>'
        + '<br>'
        + '<a href="/bookinventory/add"><button>Add Book</button></a>'
    );
});

app.post(add_uri_post, function (req, res) {
    var new_title = req.body.title;
    var new_author = req.body.author;
    var new_publisher = req.body.publisher;
    var new_date = req.body.date;
    var new_website = req.body.website;

    // Check if book form entries are empty
    if (!new_title || !new_author || !new_publisher || !new_date || !new_website) {
        res.status(400).send(
            'Error: All book properties must be filled!'
            + '<br><a href="/bookinventory/add"><button>Back to Add Book</button></a>'
        );
        return;
    }
    
    // created a new book document via the mongoose model
    var new_book = new Book({
        title: new_title,
        author: new_author,
        publisher: new_publisher,
        date: new_date,
        website: new_website
    });

    async function saveBook() {
         try {
            await new_book.save();
            // successfully saved the new book to MongoDB
            res.send('Book: ' + new_title + ' is added!'
                + '<br> <a href="/bookinventory/list"><button>List Book Inventory</button></a>'
                + '<br> <a href="/bookinventory/add"><button>Add Another Book</button></a>'
            );
        }
        catch (err) {
            console.error("Error saving book to MongoDB:", err);
            res.status(500).send(
                'Error: Failed to save book to database!'
                + '<br><a href="/bookinventory/add"><button>Back to Add Book</button></a>'
            );
        }
    } // END async function saveBook()
    saveBook();
   
});// END POST aadding new book to MongoDB

app.listen(PORT);
