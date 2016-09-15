#!/usr/bin/env node

const async = require('async');
const web = require('fuzzy.ai-web');

if (process.argv.length != 5) {
  console.error("USAGE: node fuzzy.ai-web-siege.js <times> <concurrency> <url>");
  process.exit(-1);
}

let times = parseInt(process.argv[2], 10);
let concurrency = parseInt(process.argv[3], 10);
let url = process.argv[4];

let successes = 0, failures = 0;

fetchURL = (i, callback) => {
  web.get(url, (err, response, body) => {
    if (err) {
      failures += 1;
    } else {
      successes += 1;
    }
    callback(null);
  });
};

async.timesLimit(times, concurrency, fetchURL, (err) => {
  if (err) {
    console.error("Unexpected error from timesLimit()");
  } else {
    console.log(`Fetched ${url} ${times} times, concurrency ${concurrency}`);
    console.log(`Successes: ${successes}`);
    console.log(`Failures: ${failures}`);
  }
});
