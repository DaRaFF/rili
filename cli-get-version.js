#!/usr/bin/env node
const argv = require('yargs')
  .demandOption(['token', 'owner', 'repo', 'branch'])
  .help(false)
  .version(false)
  .argv
const getVersion = require('./get-version')

getVersion(argv)
  .then((message) => {
    console.log(message)
  })
  .catch((e) => {
    console.log(e.message)
    process.exit(1)
  })
