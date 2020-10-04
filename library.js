//Class to represent the different books
class Book {
    //pass in parameters for each book detail
    constructor(title, author, isbn) {
        //assign passed in parameters to the object properties
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//Class to handle UI tasks
class UI {
    //has static methods so the UI class doesn't have to be instantiated
    static displayBooks() {
        //hard coded array of books (before localStorage gets implemented)
        const storedBooks = [
            {
                title: 'Ayana',
                author: 'Ngina',
                isbn: '3154316'
            },
            {
                title: 'BeforeSunset',
                author: 'Bram',
                isbn: '7391974'
            }
        ];
        //assign array to the variable books
        const books = storedBooks;

        //loop through the array of books as each gets added to the library list
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        //get list from the DOM
        let list = document.querySelector('#book-list');

        //Create a DOM table row element for the added books 
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.title}</td>
        <td>${book.title}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete>X</a></td>
        `;

        //append created row to the book list
        list.appendChild(row);
    }
}

/*
Class to handle storage (localStorage on the browser), so that content doesn't disappear when the browser is closed/refreshed
*/


/*
Book display event
Call the displayBooks() function once the DOM loads
*/
document.addEventListener('DOMContentLoaded', UI.displayBooks);


//Book adding event
document.querySelector('#book-form').addEventListener('submit', (e) => {     //arrow function with event parameter
    //prevent default form submittion action (entered values just quickly flash on the console screen)
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
});
    //instantiate book
    const book = new book(title, author, isbn);
    console.log(book);

//Book removal event