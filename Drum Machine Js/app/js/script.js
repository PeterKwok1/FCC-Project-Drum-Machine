// to do's

// display
const display = document.querySelector('#display')

// audio context
const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()

// audio sources
const audioElems = document.querySelectorAll('.clip')
const tracks = []
for (let i = 0; i < audioElems.length; i++) {
    tracks.push(audioCtx.createMediaElementSource(audioElems[i]))
}

// gain
const gain = audioCtx.createGain()
const volume = document.querySelector('#volume')

volume.addEventListener('input', () => {
    gain.gain.value = volume.value

    display.textContent = `Volume: ${Math.round(volume.value * 100)}%`
})

// destination
const destination = audioCtx.destination

// connect
for (let i = 0; i < tracks.length; i++) {
    tracks[i].connect(gain).connect(destination)
}

// pads 
const drumPads = document.querySelectorAll('.drum-pad')

for (let i = 0; i < drumPads.length; i++) {
    drumPads[i].addEventListener('click', () => {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume()
        }

        audioElems[i].load()
        audioElems[i].play()

        display.textContent = drumPads[i].dataset.description
    })
}

const pads = document.querySelectorAll('.pad')
for (let i = 0; i < drumPads.length; i++) {
    window.addEventListener('keydown', (e) => {
        if (e.which === pads[i].textContent.charCodeAt(0)) {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume()
            }

            audioElems[i].load()
            audioElems[i].play()

            display.textContent = drumPads[i].dataset.description
        }
    })
}






