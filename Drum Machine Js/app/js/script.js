// audio context
const audioContext = new AudioContext()

// audio sources
const track_1_elem = document.querySelectorAll('.clip')[0]
const track_1 = audioContext.createMediaElementSource(track_1_elem)

// gain

// destination
const destination = audioContext.destination

// connect
track_1.connect(destination)

// play buttons
const track_1_playButton = document.querySelectorAll('.play-button')[0]

track_1_playButton.addEventListener('click', () => {
    track_1_elem.load()
    track_1_elem.play()
})

// to do's
// figure out overlapping/layered audio. test second button first.
// define listener function
// define array of elements to add event listeners in a loop
