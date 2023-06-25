let myLibrary = [];
const container = document.querySelector(".container");
const button = document.querySelector(".add");
const modalBackground = document.querySelector(".modal-background");
const closeModal = document.getElementById("closeModal")
const noBooks = document.createElement("h1");
const addForm = document.querySelector(".addForm")
noBooks.textContent = "No books here yet :(";


checkBooks();

button.addEventListener("click", event=>{
    modalBackground.classList.add("active");
})

closeModal.addEventListener("click", event=>{
    exitModal();
    
})

function checkBooks(){
    if (myLibrary.length == 0) {
        container.appendChild(noBooks);
        container.classList.add("no-books");
        return false;
    } else if (container.contains(noBooks)){
        container.removeChild(noBooks);
        container.classList.remove("no-books");
        console.log("removed");
        
    }
    return true;
}


function exitModal(){
    modalBackground.classList.remove("active");
}


addForm.addEventListener("submit", event=>{
    event.preventDefault();
    addBookToLibrary(document.getElementById("author").value,
    document.getElementById("title").value, 
    document.getElementById("read").checked, 
    document.getElementById("pages").value
    )
    addForm.reset();
    exitModal();
    if (checkBooks()){
        displayBooks();
    }
    
    
    

})
function Book(author, title, read, pages) {
  this.author = author;
  this.title = title;
  this.read = read;
  this.pages = pages;
}

function addBookToLibrary(author, title, read, pages) {
  let book = new Book(author, title, read, pages);
  myLibrary.push(book);
}


function displayBooks(){
    container.innerHTML = "";
    myLibrary.forEach((element, idx) => {
        const bookCard = document.createElement("div");
        const bookBody = document.createElement("div");
        const bookButtons = document.createElement("div");
        const bookTitle = document.createElement("div");
        const bookAuthor = document.createElement("div");
        const bookPages = document.createElement("div");
        const read = document.createElement("button");
        read.classList.add("read-button");
        if (element.read) {
            read.classList.add("active");
        }
        read.addEventListener("click", event=>{
            element.read = !element.read;
            if (element.read){
                read.textContent = "Read";
                read.classList.add("active");
            } else {
                read.textContent = "Not Read";
                read.classList.remove("active");
            }
        });
        bookTitle.classList.add("book-title")
        bookTitle.textContent = element.title;
        bookAuthor.textContent = "By: " + element.author;
        bookPages.textContent = "Pages: " + element.pages;
        if (element.read){
            read.textContent = "Read";
        } else {
            read.textContent = "Not Read";
        }
        const delButton = document.createElement("button");
        delButton.setAttribute("type", button);
        delButton.textContent = "Delete";
        delButton.addEventListener("click", event=>{
            myLibrary.splice(idx, 1);
            
            displayBooks();
            checkBooks();
        });
        
        bookBody.append(bookAuthor,bookPages);
        bookButtons.append(read, delButton);
        bookBody.classList.add("book-body")
        bookButtons.classList.add("book-body")
        bookCard.classList.add("bookCard");
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookBody);
        bookCard.appendChild(bookButtons);
        container.appendChild(bookCard);
        
    })
}


