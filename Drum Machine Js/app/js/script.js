// to do's


// audio context
const audioContext = new AudioContext()

// audio sources
const audioElems = document.querySelectorAll('.clip')
const tracks = []
for (let i = 0; i < 1; i++) {
    tracks.push(audioContext.createMediaElementSource(audioElems[i]))
}

// gain

// destination
const destination = audioContext.destination

// connect
for (let i = 0; i < 1; i++) {
    tracks[i].connect(destination)
}

// play buttons
const playButtons = document.querySelectorAll('.play-button')

for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', () => {
        audioElems[i].load()
        audioElems[i].play()
    })
}



