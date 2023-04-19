const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

const url = "https://www.theguardian.com/uk-news";
const urlLabe =
  "https://hydro.chmi.cz/hppsoldv/popup_hpps_prfdyn.php?seq=307338";

axios(urlLabe).then((response) => {
  const htmlLabe = response.data;
  const $ = cheerio.load(htmlLabe);
  const teplotyLabe = [];
  $(".center_text tr", htmlLabe).each(function () {
    const datum = $(this).find("td").eq(0).text();
    const stav = $(this).find("td").eq(1).text();
    const prutok = $(this).find("td").eq(2).text();
    var teplota = $(this).find("td").eq(3).text();
    if (teplota) {
      teplotyLabe.push({
        datum,
        stav,
        prutok,
        teplota,
      });
    }
  });
  console.log(teplotyLabe);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
