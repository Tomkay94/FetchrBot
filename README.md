# FetchrBot

A web service which lets users without Internet access retrieve information from the internet. Utilizes the Twilio API to allow incoming text requests, which are then passed to a web server, parsed and responded to with a text containing the relevant requested information.

#### Install

`git clone https://github.com/Tomkay94/fetchr-bot`

Run `npm install` to install the necessary dependencies.

Obtain your Twilio number from [`twilio.com`](https://twilio.com) and point your Twilio app to the route you want to receive and parse requests on (Twilio details how to configure this setup on their developer API pages).

Run `node index.js` to start the web server.

#### How it Works

When you text the FetchrBot Twilio phone number with your desired information using the formatting FetchrBot understands, FetchrBot will retrieve the information from `data.json` and text the information back to you.

**Example:**

If you text `learn array methods` to the FetchrBot Twilio number, FetchrBot will text you back with the following information from `data.json`:

```
append(newItem)
remove(item)
index(index)
makeArray(size)
```

It should be noted that the request body is case-insensitive. Fetchr-Bot would have texted back the same information
had the user texted `LEARN ARRAY METHODS` instead.

If a request with a text body to FetchrBot is not well-formed (does not conform to the data's retrieval case),
FetchrBot will text back the user saying that the query was invalid and present the user with the command `help`
which will text back the user a short tutorial on valid FetchrBot queries.

#### Feature Roadmap

Currently, FetchrBot is being extended to retrieve dynamic data via web crawling. This involves designing
more generalized queries which users can make and is currently in progress.
