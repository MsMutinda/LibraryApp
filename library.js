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
        //assign array to the variable books
        const books = Store.getBooks();
        //loop through the array of books as each gets added to the library list
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        //get list from the DOM
        const list = document.querySelector('#book-list');

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

    //book delete
    static deleteBook(el) {
        //first check if element has the delete class
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();     //parentElement twice so that the entire book details row can be targeted from the table data
        }
    }

    //alert message when some fields have not been filled when adding book
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);    //so that the div appears before the form
        //make alert message disappear after a few seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    //to clear fields after submit
    static clearFields() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}

/*
Class to handle storage (localStorage on the browser)
so that content doesn't disappear when the browser is closed/refreshed
*/
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            //pass through the JSON.parse method so that books can be passed as a JS array of objects, instead of as a string
            books = JSON.parse(localStorage.getItem(books));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        //loop through the books
        books.forEach((book, index) => {
            //check if the ISBN of the book being looped through matches the ISBN being passed
            if(books.isbn === isbn) {
                books.splice(index, 1);
            }
        }); 
        localStorage.setItem('books', JSON.stringify(books));
    }
}

/*
Book display event
Call the displayBooks() function once the DOM loads
*/
document.addEventListener('DOMContentLoaded', UI.displayBooks);


/*
Book adding event
*/
document.querySelector('#book-form').addEventListener('submit', (e) => {     //arrow function with event parameter
    //prevent default form submittion action (entered values just quickly flash on the console screen)
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //check for empty fields
    if(title === "" || author === "" || isbn === "") {
        UI.showAlert("Please fill in all fields", 'alert-danger');
    }
    else {
        //instantiate book
        const book = book(title, author, isbn);

        //add book to UI
        UI.addBookToList(book); 

        //add book to localstorage (Store())
        Store.addBook(book);

        //show success message after adding a book
        UI.showAlert("Book added successfully", "alert-success");

        //clear fields after submit
        UI.clearFields();
    }
});

/*
Book removal event
Uses event propagation that will enable targeting specific events inside the book list element
*/
document.querySelector('#book-list').addEventListener('click', (e) => {
    //delete book from UI
    UI.deleteBook(e.target);
    //delete book from localStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show success message after deleting a book
    UI.showAlert("Book deleted succesfully", "alert-success");
});