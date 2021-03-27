let hours = 0
let minutes = 0
let seconds = 0
let milliseconds = 0
let cron
let playChronometer = false

function chronometer () {
  if((milliseconds += 10) == 1000) {
    milliseconds = 0
    seconds ++
  }
  if(seconds == 60) {
    seconds = 0
    minutes ++
  }
  if(minutes == 60) {
    minutes = 0
    hours ++
  }

  document.getElementById('milliseconds').innerText = returnValueMs(milliseconds)
  document.getElementById('seconds').innerText = returnValue(seconds)
  document.getElementById('minutes').innerText = returnValue(minutes)
  document.getElementById('hours').innerText = returnValue(hours)
}

function returnValue (input) {
  let value
  if(input < 10) {
    value = `0${input}`
    return(value)
  } else {
    return(input)
  }
}

function returnValueMs (input) {
  let value
  if(input < 10) {
    value = `00${input}` 
    return(value)
  } else if(input < 100) { 
    value = `0${input}`
    return(value)
  } else if(input < 1000) {
    value = `${input}`
    return(value)
  }
}

function startStop() {
  if(document.getElementById('startStop').value == "Stop") {
    document.getElementById('startStop').setAttribute('value','Start')
    clearInterval(cron)
    playChronometer = false
  } else {
    document.getElementById('startStop').setAttribute('value','Stop')
    if(playChronometer == 0) {
      cron = setInterval(() => { chronometer() }, 10)
      playChronometer = true
    }
  }
}

function reset () {
  hours = 0
  minutes = 0
  seconds = 0
  milliseconds = 0
  playChronometer = false
  clearInterval(cron)
  document.getElementById('startStop').setAttribute('value','Start')
  document.getElementById('hours').innerText = '00'
  document.getElementById('minutes').innerText = '00'
  document.getElementById('seconds').innerText = '00'
  document.getElementById('milliseconds').innerText = '000'
  removeLaps(document.getElementById('laps'))
}

function lap () {
  if(playChronometer != 0 || (hours != 0 || minutes != 0 || seconds != 0 || milliseconds != 0)) {
    let ul = document.getElementById('laps')
    let li = document.createElement('li')
    ul.appendChild(li)

    li.appendChild(document.createTextNode(`${returnValue(hours)}:${returnValue(minutes)}:${returnValue(seconds)}:${returnValueMs(milliseconds)}`))
  }
}

function removeLaps(element) {
  element.parentNode.removeChild(element)
  let div = document.getElementById('divlaps')
  let ul = document.createElement('ul')
  ul.setAttribute('id','laps')
  div.appendChild(ul)
}