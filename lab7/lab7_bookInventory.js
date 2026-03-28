var express = require('express');
var app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
    extended: false
}));

/* Requirement #4: A book is a JSON object with properties: 
 * title, author, publisher, date, and website.     
 */
/* Requirement #7: The book inventory may be stored in memory (i.e. javascript variable) 
 * using an array of JSON objects     */
var books = [
    {
        title: 'Gilead'
        , author: 'Marilynne Robinson'
        , publisher: 'Thorndike Press'
        , date: 'November 2004'
        , website: 'https://www.google.ca/books/edition/Gilead/EkQ9PgAACAAJ?hl=en'
    },
    {
        title: 'Dead Beat'
        , author: 'Jim Butcher'
        , publisher: 'Roc Hardcover'
        , date: 'May 3 2005'
        , website: 'https://www.jim-butcher.com/books/dresden/dead-beat'
    }
]

var main_uri = "/lab7.html";
/* Requirement #5: The web application needs to have an express URI (/bookinventory/add) 
 * where a user can add a book to the inventory. */
var add_uri = "/bookinventory/add";
var add_uri_post = "/bookinventory/addbook";
/* Requirement #6: The web application needs to have an express URI (/bookinventory/list) 
 * where a user can list the entire book inventory. */
var list_uri = "/bookinventory/list";

// Ensure the Main Page is accessible at the root URI
app.get('/', function (req, res) {
    //res.redirect(main_uri); // can't be redirected to a local file, so use sendFile instead
    res.sendFile(__dirname + main_uri)
});


app.get(list_uri, function (req, res) {
    var html = '<p>'
    for (var i = 0; i < books.length; i++) {
        html = html + "<b>Title: </b>" + books[i].title + "<br>";
        html = html + "<b>Author: </b>" + books[i].author + "<br>";
        html = html + "<b>Publisher: </b>" + books[i].publisher + "<br>";
        html = html + "<b>Date: </b>" + books[i].date + "<br>";
        html = html + "<b>Website: </b>" + books[i].website + "<br><br>";
    }
    html += '</p>'

    res.send(
        "<h1>Book Inventory</h1>"
        + "<h2>Artemis Lee</h2>"
        + "<h3>Inventory List of books: </h3>"
        + html
        + '<a href="/"> <button>Back to Main Page</button></a>'
    );
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

    var new_json = {
        'title': new_title, 'author': new_author
        , 'publisher': new_publisher, 'date': new_date
        , 'website': new_website
    };
    books.push(new_json);
    res.send('Book: ' + new_title + ' is added!'
        + '<br> <a href="/bookinventory/list"><button>List Book Inventory</button></a>'
        + '<br> <a href="/bookinventory/add"><button>Add Another Book</button></a>'
    );
});

app.listen(3000);
