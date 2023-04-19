//treti ukol
var slova = {
  rainbow: 3,
  sun: 2,
  flower: 1,
};

var fs = require("fs");
var data = fs.readFileSync("file.json");
var words = JSON.parse(data);
console.log(words);

const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.static("public"));

//setup route
app.get("/flower", sendFlower);

function sendFlower(request, response) {
  //vse na internetu je request a response
  response.send("Kvetiny krasne voni");
}

app.get("/search/:flower/:num", searchFlower);

function searchFlower(request, response) {
  var data = request.params;
  var num = data.num;
  var reply = "";
  for (var i = 0; i < num; i++) {
    reply += data.flower + " krasne voni ";
  }
  response.send(reply);

  //response.send(data.flower + " krasne voni");
}

//treti ukol k poli slova
app.get("/all", sendAll);

function sendAll(request, response) {
  //response.send(slova);
  response.send(words);
}

app.get("/add/:word/:score?", addWord);
//pokud chceme mit score optional, tak to musime napsat takto score?

function addWord(request, response) {
  var data = request.params;
  var word = data.word;
  var score = data.score;
  //var score = Number(data.score);

  //osetrime, ze score je prazdne
  if (!score) {
    reply = {
      msg: "Score is required.",
    };
  } else {
    slova[word] = score;
    reply = {
      msg: "Thank you for your word.",
      // status: "success",
      // word: word,
      // score: score,
    };
  }
  //   slova[word] = score;

  //   var reply = {
  //     msg: "Thank you for your word.",
  //   };
  response.send(reply);
}

//vyhledani slova
app.get("/search/:word/", searchWord);

function searchWord(request, response) {
  var word = request.params.word;
  var reply;
  if (slova[word]) {
    reply = {
      status: "found",
      word: word,
      score: slova[word],
    };
  } else {
    reply = {
      status: "not found",
      word: word,
    };
  }
  response.send(reply);
}

//JSON

app.get("/addjson/:word/:score?", addJson);
//pokud chceme mit score optional, tak to musime napsat takto score?

function addJson(request, response) {
  var data = request.params;
  var word = data.word;
  var score = Number(data.score);

  //osetrime, ze score je prazdne
  if (!score) {
    reply = {
      msg: "Score is required.",
    };
  } else {
    words[word] = score;
    //fs.writeFile("file.json", JSON.stringify(slova), finished);
    //v json souboru neni formatovani v poradku proto
    fs.writeFile("file.json", JSON.stringify(words, null, 2), finished);
    function finished(err) {
      console.log("all set.");
    }
    reply = {
      msg: "Thank you for your word.",
      // status: "success",
      // word: word,
      // score: score,
    };
  }
  //   slova[word] = score;

  //   var reply = {
  //     msg: "Thank you for your word.",
  //   };
  response.send(reply);
}
