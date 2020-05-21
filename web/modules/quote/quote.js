function quote() {
  var current = 0;

  let data = JSON.parse(window.localStorage.getItem("quotenum"));
  if (data == null) {
    const zero = {
      current: "0",
    };
    window.localStorage.setItem("quotenum", JSON.stringify(zero));
  }
  data = JSON.parse(window.localStorage.getItem("quotenum"));
  current = parseInt(data.current);
  console.log(current);
  printQuote(current);
}
function printQuote(num) {
  $.getJSON("modules/quote/quote.json", function (json) {
    console.log(json);
    console.log(json.quote[0].text);
    var author = document.getElementById("quoteauthor");
    var text = document.getElementById("quotetext");
    text.innerHTML = json.quote[num].text;
    if (json.quote[num].author == null) {
      author.innerHTML = "";
    } else {
      author.innerHTML = json.quote[num].author;
    }
    $("#quote1").delay("3000").fadeIn(3000);
    window.localStorage.removeItem("quotenum");
    var nex = num + 1;
    if (num == 1642) {
      nex = 0;
    }
    var nex1 = nex.toString();
    console.log(nex1);
    const next = {
      current: nex1,
    };
    window.localStorage.setItem("quotenum", JSON.stringify(next));
    //setTimeout(reQuote, 3600000);
    setTimeout(reQuote, 1800000);
    //setTimeout(reQuote, 10000);
  });
}
function reQuote() {
  $("#quote1").fadeOut(3000);
  quote();
}
