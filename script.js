// variables
const API_KEY = config.API_KEY;
const fetchBooks = document.getElementById('fetchBooks');
const randomBookContainer = document.getElementById('random-book-container');
const findListsContainer = document.querySelector('.find-lists-container');
let lists = [];

// variable for getting random list
const getRandomItemFromList = (list => list[Math.floor(Math.random() * list.length)]) 

// fetch calls return promises
// current best seller list
const bookPromise = fetch (
    "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=" + API_KEY
);

// when the promise gets resolved find the list
bookPromise
    .then((result) => result.json())
    .then(({results}) => {
        const lists = results.lists;
        renderBooks(lists[0].books);
        addToSelectOptions(lists);
    });

// Rendering books into the html
function addToSelectOptions(lists) {
    const selectEl = document.getElementById('findList');
    // when clickin on select find the list id
    selectEl.addEventListener('change', (e) => {
        const selectedListId = e.target.value;
        // here I use the find method to return the value of the first element in that matches the array
        const selectedList = lists.find(list => list.list_id == selectedListId);
        // displaying the list in renderbooks function
        renderBooks(selectedList.books);
    });

    // The map() method creates a new array by calling a function on every element in the calling array.
    const listOptions = lists.map((list) => {
        // returning the list name on each option
        return `<option value="${list.list_id}">${list.list_name}</option>`
    })

    selectEl.innerHTML = listOptions.join('');
}

// rendering the books div in the html
function renderBooks(books) {
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = "";

    // The forEach() method executes a provided function once for each array element.
    books.forEach(book => {
        bookContainer.innerHTML += `
        <div class="book">
            <div class="book-cover">
                <a href="${book.amazon_product_url} title="Find book on Amazon"><img src="${book.book_image}" alt=""></a>
            </div>
            <div class="book-info">
                <span class="rank">${book.rank}</span>
                <h3>${book.title}</h3>
                <h4>By ${book.author}</h4>
            </div>
        </div>
        `;
    });


}

function reduceBooks(renderBooks) {
    const book = books.reduce((book, returnedBook) => {
       return book + returnedBook
    }, 3);
    document.querySelector(".book-container").innerHTML = results.reduce(-4);
}



// Getting a random book from a random list

// async means the functon returns a promise
const getRandomBook = async () => {
    let url = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key= ${API_KEY}`;
    // await makes JavaScript wait until that promise settles and returns its result.
    const response = await fetch(url);
    try {
        const json = await response.json();
        // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
        const lists = json.results.lists.filter(list => list.books && list.books.length > 0)
        const randomList = getRandomItemFromList(lists);
        const randomBook = getRandomItemFromList(randomList.books);
        return randomBook;
    } catch(error) {
        console.log('Failed to fetch the books!', error.message)
    }
}


// event listening for click on random book button
fetchBooks.addEventListener('click', async () => {
    const randomBook = await getRandomBook();
    // rendering random book in html
    randomBookContainer.innerHTML = `
    <div class="new-book">
        <div class="book-cover">
            <a href="${randomBook.amazon_product_url} title="Find book on Amazon"><img src="${randomBook.book_image}" alt=""></a>
        </div>
        <div class="book-info">
            <h3>${randomBook.title}</h3>
            <h4>By ${randomBook.author}</h4>
            <p>${randomBook.description}</p>
        </div>
    </div>
    `;
});
