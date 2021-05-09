#!/usr/bin/env node
const argv = require('yargs')
  .demandOption(['token'])
  .help(false)
  .version(false)
  .argv
const getVersionFromConfig = require('./get-version-from-config')

getVersionFromConfig(argv)
  .then((message) => {
    console.log(message)
  })
  .catch((e) => {
    console.log(e.message)
    process.exit(1)
  })
