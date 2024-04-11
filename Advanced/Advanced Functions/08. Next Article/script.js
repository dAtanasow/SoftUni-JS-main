// Write a JS program that sequentially displays articles on a web page when the user clicks a button. You will receive an array of strings that will initialize the program. You need to return a function that keeps the initial array in its closure and every time it’s called, it takes the first element from the array and displays it on the web page, inside "article", in div with ID "content". If there are no more elements left, your function should do nothing.
// Your function will be called automatically, there is no need to attach any event listeners.
// Input
// You will receive an array of strings.
// Output
// Return a function that sequentially displays the array elements on the web page.


function getArticleGenerator(obj) {
  let arr = Array.from(obj);
  let output = document.getElementById("content");

  return () => {
    if (!arr.length) {
        return
    }
    let article = arr.shift();
    let newArticle = document.createElement("article");
    newArticle.textContent = article;
    output.appendChild(newArticle);
  };
}
