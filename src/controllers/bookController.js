const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:bookController');
function bookController(nav){
    
	function getIndex(req, res){
        const url = "mongodb://localhost:27017";
        const dbname = "libraryApp";

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug("Connected correctly to server");

                const db = client.db(dbname);

                const col = await db.collection("books");

                const books = await col.find().toArray();

                /*	connection.query("select * from books").then(result => {
                    debug("Flag 1, run this now");
                    debug(result); 
                    res.render(
                        "bookListView",
                        {
                            nav,
                            title: "Library",
                            books,
                            result
                        });
                }); 
    
                connection.query("select * from books", function(err, result){
                    debug(result); 
                    
                }); */
                res.render(
                    "bookListView",
                    {
                        nav,
                        title: "Library",
                        books
                    });
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());
    }
    function getById(req, res) {
        const id = req.params.id;
        const url = "mongodb://localhost:27017";
        const dbname = "libraryApp";

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug("Connected correctly to server");

                const db = client.db(dbname);

                const col = await db.collection("books");

                const book = await col.findOne({_id: new ObjectId(id)}); 
                debug(book);
                res.render(
                    "bookView",
                    {
                        nav,
                        title: "Library",
                        book
                    });
            }
            catch (err){
                debug(err.stack);
            }
            }());
        //	connection.query("select * from books where id=@id");
    }

    return {
        getIndex,
        getById
    };
}


module.exports = bookController;