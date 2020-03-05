//Weather aop code goes here
const https = require("https");
const http = require("http");

const api = require("./api.json");

//print Error message
function printError(error) {
  console.error(error.message);
}

//print weather details
function printMessage() {
  const message = ``;
  console.log(message);
}

function get(query) {
  // Connect to API Url ()
  let apiCall;
  if (isNaN(query)) {
    apiCall = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${api.key}`;
  } else {
    apiCall = `http://api.openweathermap.org/data/2.5/weather?zip=${query}&units=imperial&appid=${api.key}`;
  }
  try {
    const request = http.get(apiCall, response => {
      if (response.statusCode === 200) {
        let body = "";
        //Read the data
        response.on("data", data => {
          body += data.toString();
        });
        //when all the data has been passed in
        response.on("end", () => {
          try {
            //Parse that data
            const appData = JSON.parse(body);
            console.log(`${appData.name}: ${appData.main.temp}`);

            //Print the data
            // printMessage(appData.main.temp)

            // );

            //   printMessage2(username, profile)
          } catch (error) {
            printError(error);
          }
        });
      } else {
        const message = `There was an error getting the weather for ${query} (${
          http.STATUS_CODES[response.statusCode]
        })`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    });
    request.on("error", error =>
      console.error(`Problem with request: ${printError(error)};`)
    );
  } catch (error) {
    printError(error);
  }
}

module.exports.get = get;
