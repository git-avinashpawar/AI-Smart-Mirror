function searchNewsQuery(query) {
  fetch(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=97172c30bd7c4ec982f6e2c007d43399`
  )
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      init(res);
    });
}
function searchNews() {
  fetch(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=97172c30bd7c4ec982f6e2c007d43399`
  )
    .then((newsresult) => {
      return newsresult.json();
    })
    .then((newsres) => {
      init1(newsres);
      fade();
    });
  //fade();
}

function init1(resultFromServer) {
  console.log(resultFromServer);
  document.getElementById("news").textContent = "";

  //adds Divs Dynamically
  function createDiv(i) {
    var boardDiv = document.createElement("div");

    boardDiv.className = "news" + i;
    boardDiv.id = "up" + i;
    boardDiv.innerText = "";
    boardDiv.style.display = "none";

    return boardDiv;
  }
  function createDiv1(i) {
    var boardDiv = document.createElement("div");

    boardDiv.className = "newshead";
    boardDiv.innerText = "";

    return boardDiv;
  }
  function createDiv2(i) {
    var boardDiv = document.createElement("div");

    boardDiv.className = "newsdesc";
    boardDiv.innerText = "";

    return boardDiv;
  }

  var newsDiv = document.getElementById("news"),
    myDivs = [],
    news1 = [],
    news2 = [],
    j = 0,
    numOfDivs = resultFromServer.articles.length;

  // Puts Data Into Divs Dynamically
  let i = 0;
  for (i = 0; i < resultFromServer.articles.length; i++) {
    myDivs.push(createDiv(i));
    newsDiv.appendChild(myDivs[i]);

    var no = "up" + i;
    var news = document.getElementById(no);

    news1.push(createDiv1(i));
    news.appendChild(news1[i]);

    news2.push(createDiv2(i));
    news.appendChild(news2[i]);

    var element = resultFromServer.articles[i].title;
    var source = resultFromServer.articles[i].source.name;
    var news = element.split(" - ")[0];

    var today = new Date(
      Date.now() - Date.parse(resultFromServer.articles[i].publishedAt)
    );

    var hour = ("0" + today.getHours()).slice(-2);
    var min = ("0" + today.getMinutes()).slice(-2);
    var sec = ("0" + today.getSeconds()).slice(-2);

    news1[i].innerText =
      source +
      " : Updated " +
      hour +
      " Hours " +
      min +
      " Minute " +
      sec +
      " Seconds ago";
    news2[i].innerText = news;
  }
}
/*
   document.getElementById("searchBtn").addEventListener("click", () => {
    let searchTerm = document.getElementById("searchInput").value;
    if (searchTerm) searchNewsQuery(searchTerm);
  });
  */
