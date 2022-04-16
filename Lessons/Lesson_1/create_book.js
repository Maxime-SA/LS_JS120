function createBook(title, author, read = false) {

  return {

    title,
    author,
    read,
    
    readBook() {
      this.read = true;
    },

    getDescription() {
      return `${this.title} was written by ${this.author}. I ${this.read ? 'have' : 'haven\'t'} read it.`;
    },


  };

}

let firstBook = createBook('Mythos', 'Stephen Fry');
let secondBook = createBook('Me Talk Pretty One Day', 'David Sedaris');
let thirdBook = createBook('Aunts aren\'t Gentlemen', 'PG Wodehouse');

console.log(firstBook.getDescription());
console.log(secondBook.getDescription());
console.log(thirdBook.getDescription());