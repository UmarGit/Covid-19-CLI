#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const boxen = require("boxen");
const clear = require('clear');
const chalk = require("chalk");
const figlet = require('figlet');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('Covid-19 Cases', { horizontalLayout: 'full' })+'by UmarGit\n\nEnter your country code to get started'
  )
);

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "yellow",
    backgroundColor: "#555555"
};

const options = yargs
 .usage("Usage: -n <country_code>")
 .option("n", { alias: "country_code", describe: "country_code", type: "string", demandOption: true })
 .epilogue('For more information, find the documentation at https://github.com/UmarGit/Covid-19-CLI')
 .argv;

const code= `${options.country_code}`;

const url = "https://api303.herokuapp.com/get-api";

let details = ''

axios.get(url, { headers: { Accept: "application/json" } })
 .then(res => {
    const code= `${options.country_code}`;
   for (let index = 0; index < res.data.length; index++) {
       if (res.data[index].id == code) {
           details = 'Country :'+String(res.data[index].id)+' , Cases :'+String(res.data[index].value);
           const msgBox = boxen( details , boxenOptions );
           console.log(chalk.yellow(msgBox));  
       }
       else{
           continue;
       }
   }
   if(details == '')
    console.log(chalk.red("\n\nERROR (COVID_19) : Invalid Country Code"))
 });