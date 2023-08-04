document.querySelector('.random-1').addEventListener('click', () => {
    createBooks(1);
})

document.querySelector('.random-5').addEventListener('click', () => {
    createBooks(5);
})

document.querySelector('.random-10').addEventListener('click', () => {
    createBooks(10);
})

class Library {
    myLibrary = []

    addBookToLibrary(bk) {
        this.myLibrary.push(bk);
        this.drawLibrary();
    }
    
    removeBookFromLibrary(index) {
        this.myLibrary.splice(index, 1);
        this.drawLibrary();
    }

    drawLibrary() {
        const container = document.querySelector('.container');
    
        // remove previous books
        while(container.firstChild) {
            container.removeChild(container.firstChild)
        }
    
        // draw all books
        for(let i = 0; i < this.myLibrary.length; i++)
        {
            let bk = this.myLibrary[i];
    
            // create book container
            const book = document.createElement('div');
            book.classList.add('book');
    
            // add title element to book container
            const title = document.createElement('p');
            title.classList.add('title');
            title.innerText = `Title: ${bk.title}`;
            book.appendChild(title);
    
            // add author element to book container
            const author = document.createElement('p');
            author.classList.add('author');
            author.innerText = `Author: ${bk.author}`;
            book.appendChild(author);
    
            // add pages element to book container
            const pages = document.createElement('p');
            pages.classList.add('pages');
            pages.innerText = `Pages: ${bk.pages}`;
            book.appendChild(pages);
    
            // add whether or not the book has been read, which is just a checkbox
            // the user may check and uncheck.
            const div = document.createElement('div');
            book.appendChild(div);
            const read_text = document.createElement('p');
            read_text.classList.add('read-text');
            read_text.innerText = 'Read?';
            div.appendChild(read_text);
            const read = document.createElement('input')
            read.setAttribute('type', 'checkbox');
            if (bk.read)
            {
                read.checked = true;
            }
            read.setAttribute('data-index', i.toString());
            read.addEventListener('click', (e) => this.readBookHandler(e));
            div.appendChild(read);
    
            // button for deleting the book
            const delete_button = document.createElement('button');
            delete_button.innerText = `delete`;
            delete_button.setAttribute('data-index', i.toString());
            delete_button.addEventListener('click', (e) => this.deleteBookHandler(e));
            book.appendChild(delete_button);
    
            container.appendChild(book);
        }
    }

    deleteBookHandler(event) {
        let index = Number(event.target.getAttribute('data-index'));
        this.removeBookFromLibrary(index);
    }
    
    readBookHandler(event) {
        let index = Number(event.target.getAttribute('data-index'));
        this.myLibrary[index].read = !this.myLibrary[index].read;
    }
}

var library = new Library();

// create a random book
let titles = ['To Kill a Mockingbird', '1984', 'The Lord of the Rings', 'The Catcher in the Rye',
'The Great Gatsby', 'The Lion, the Witch and the Wardrobe', 'Lord of the Flies', 'Animal Farm',
'Catch-22', 'The Grapes of Wrath', 'Gone with the Wind', 'Slaughterhouse-Five']
let authors = ['Harper Lee', 'George Orwell', 'J.R.R Tolkien', 'J.D. Salinger', 'F. Scott Fitzgerald', 'C.S. Lewis', 'William Golding', 'George Orwell', 'Joseph Heller', 'John Steinbeck', 'Margaret Mitchell']
function createBooks(x = 1) {
    while(x > 0)
    {
        let index = Math.floor(Math.random() * titles.length);
        let read = index % 2 == 0 ? true : false;
        let pages = Math.floor(Math.random() * 999) + 1; // 0 - 999
        let bk = new Book(titles[index], authors[index], pages, read);
        library.addBookToLibrary(bk);
        x--;
    }
}

// get data from form when submitted. Then clear the form
// and create a new book entry. 
const submit = document.querySelector('#submit');
submit.addEventListener('click', (event) => {
    event.preventDefault();

    // get form data
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    const book = new Book(title, author, pages, read);

    // reset form data
    document.querySelector('#form').reset()

    // add book to library
    library.addBookToLibrary(book);
})

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages; // no made is made for a number
        this.read = read;
    }
}