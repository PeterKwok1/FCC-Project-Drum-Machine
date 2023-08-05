// to do's


// audio context
const audioContext = new AudioContext()

// audio sources
const audioElems = document.querySelectorAll('.clip')
const tracks = []
for (let i = 0; i < audioElems.length; i++) {
    tracks.push(audioContext.createMediaElementSource(audioElems[i]))
}

// gain

// destination
const destination = audioContext.destination

// connect
for (let i = 0; i < tracks.length; i++) {
    tracks[i].connect(destination)
}

// pads
const drumPads = document.querySelectorAll('.drum-pad')

for (let i = 0; i < drumPads.length; i++) {
    drumPads[i].addEventListener('click', () => {
        audioElems[i].load()
        audioElems[i].play()
    })
}

const pads = document.querySelectorAll('.pad')
for (let i = 0; i < drumPads.length; i++) {
    window.addEventListener('keydown', (e) => {
        if (e.which === pads[i].textContent.charCodeAt(0)) {
            audioElems[i].load()
            audioElems[i].play()
        }
    })
}



