// this is a library we use to show shit on a computer
const notifier = require('node-notifier');

// This is a library that we use to fetch shit from sites
const fetch = require('node-fetch')

// This i the site we're checking
// In this case, we're just going to a google page that'll give us the time
const siteToCheckForShit = 'https://www.google.com/search?q=what+time+is+it'

// This is what you're looking for in a page
// In this case, it'll check to see the time
// At which point, once it hits the time, we'll get an alert
const shitYoureCheckingFor = '6:33 PM'

// we use notifier library to send a notification 
function sendNotification(title, message){
  // Object
  notifier.notify({
    title,
    message
  });
}

// This function runs every X, based on setInterval below
async function checkSiteForShit(){
  // this console log is just how you write info to your console (for you, it'll be in terminal)
  console.log('checkSiteForShit:starting')
  
  // Fetch shit from the website
  const response = await fetch(siteToCheckForShit)
  const data = await response.text()

  // Check to see if the data from the webpage includes the shit we're looking for
  const hasWhatWeAreLookingFor = data.includes(shitYoureCheckingFor)

  // Does it have what we're looking for?
  if(hasWhatWeAreLookingFor){
    // yes
    console.log( 'hasWhatWeAreLookingFor', hasWhatWeAreLookingFor) // log to console
    sendNotification('checkSiteForShit', "FOUND WHAT WE ARE LOOKING FOR!") // show notification
  } else {
    // no
    console.log( 'hasWhatWeAreLookingFor', hasWhatWeAreLookingFor) // log to console
    sendNotification('checkSiteForShit', "does NOT have what we are looking for :(") // show notification
  }

  // all done, this log doesn't mean shit, just good to know 
  // our check has finished if we look at terminal
  console.log('checkSiteForShit:starting')
}

// setInterval is a function that repeats another function every x milliseconds
// here, we use it to repeat checkSiteForShit every 10000 milliseconds, which = 10 seconds
// more info on setInterval https://www.w3schools.com/jsref/met_win_setinterval.asp
setInterval(checkSiteForShit, 10000)