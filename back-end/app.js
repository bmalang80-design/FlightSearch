const express = require("express");
const Amadeus = require("amadeus");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
//app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());
var amadeus = new Amadeus({
  clientId: "A78ZacmHb0NI86GTD3hOncuDH5faJfZx",
  clientSecret: "GX55MzLJmsubX5gm",
});
app.post("/", (req, res) => {
  if (req.body.return === null || req.body.return === "") {
    amadeus.shopping.flightOffersSearch
      .get({
        originLocationCode: req.body.from.substring(0, 3).toUpperCase(),
        destinationLocationCode: req.body.to.substring(0, 3).toUpperCase(),
        departureDate: req.body.departure,
        adults: req.body.adult,
      })
      .then(function (response) {
        return amadeus.shopping.flightOffers.pricing.post(
          JSON.stringify({
            data: {
              type: "flight-offers-pricing",
              flightOffers: [response.data[0]],
            },
          })
        );
      })
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (responseError) {
        res.json(responseError);
      });
  }else{
    amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: req.body.from.substring(0, 3).toUpperCase(),
      destinationLocationCode: req.body.to.substring(0, 3).toUpperCase(),
      departureDate: req.body.departure,
      returnDate: req.body.return,
      adults: req.body.adult,
    })
    .then(function (response) {
      return amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
          data: {
            type: "flight-offers-pricing",
            flightOffers: [response.data[0]],
          },
        })
      );
    })
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (responseError) {
      res.json(responseError);
    });
  }
});

app.listen(3000, () => console.log("Server is connected"));
