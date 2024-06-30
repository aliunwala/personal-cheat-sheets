import axios from "axios";

//----------------QUICK SAMPLES GET/POST---------------------------

let promiseVersion = function () {
  axios
    .get("https://famous-quotes4.p.rapidapi.com/random")
    .then((response) => {
      // Handle response
      console.log(response.data);
    })
    .catch((err) => {
      // Handle errors
      console.error(err);
    });
};

let asyncVersion = async function () {
  const response = await axios.get(
    `https://famous-quotes4.p.rapidapi.com/random`
  );
  console.log(response.data);
};

let asyncVersionWTry = async function () {
  try {
    const response = await axios.get(
      `https://famous-quotes4.p.rapidapi.com/random`
    );
    console.log(response.data);
  } catch (error) {
    console.log("error in axios call:", error);
  }
};

// promiseVersion();
// asyncVersion();
// asyncVersionWTry();

//----------------FROM THE OFFICIAL WEBSITE--------------------------

// https://axios-http.com/docs/post_example

// Send a POST request
axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone",
  },
});

// GET request for remote image in node.js
axios({
  method: "get",
  url: "http://bit.ly/2mTM3nY",
  responseType: "stream",
}).then(function (response) {
  response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
});

/**
 * REQUEST
 *
 * For convenience aliases have been provided for all supported request methods.
 * When using the alias methods url, method, and data properties don't need to be specified in config.
 *
 * All configs are located here:
 * https://axios-http.com/docs/req_config
 */
// axios.get(url[, config])
// axios.post(url[, data[, config]])
// axios.delete(url[, config])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])
// axios.request(config)
// axios.head(url[, config])
// axios.options(url[, config])
// axios.postForm(url[, data[, config]])
// axios.putForm(url[, data[, config]])
// axios.patchForm(url[, data[, config]])

/**
 * RESPONSE
 *
 * All configs are located here:
 * https://axios-http.com/docs/res_schema
 */
// {
//   data: {}, // Most important
//   status: 200, // Also important
//   statusText: 'OK',
//   headers: {},
//   config: {},
//   request: {}
// }

{
  /**
   * You can create a new instance of axios with a custom config.
   */
  const instance = axios.create({
    baseURL: "https://some-domain.com/api/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });
}
{
  /**
   * You can specify config defaults that will be applied to every request.
   */
  axios.defaults.baseURL = "https://api.example.com";
  axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  // Alter defaults after instance has been created
  instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
}
{
  /**
   * You can intercept requests or responses before they are handled by then or catch.
   * https://axios-http.com/docs/interceptors
   * If you need to remove an interceptor later you can.
   * You can add interceptors to a custom instance of axios.
   */
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
}
{
  /**
   * Cancelling requests
   * Setting the timeout property in an axios call handles response related timeouts.
   * Combining timeout and cancellation method (e.g. signal) should cover response related timeouts AND connection related timeouts.
   * https://axios-http.com/docs/cancellation
   */
}
{
  /**
   * URL-Encoding Bodies
   * By default, axios serializes JavaScript objects to JSON. To send data in the application/x-www-form-urlencoded format instead, you can use one of the following approaches.
   */

  // In a browser, you can use the URLSearchParams API as follows:
  const params = new URLSearchParams();
  params.append("param1", "value1");
  params.append("param2", "value2");
  axios.post("/foo", params);

  // In Nodejs
  const querystring = require("querystring");
  axios.post("http://something.com/", querystring.stringify({ foo: "bar" }));
  // In Nodejs another way:
  const url = require("url");
  const params = new url.URLSearchParams({ foo: "bar" });
  axios.post("http://something.com/", params.toString());
}
