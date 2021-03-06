function fetchBytes(fname) {
  return fetch(fname)
    .then(res => res.arrayBuffer())
    .then(buf => new Uint8Array(buf))
}

function loadGame(fname, cb) {
  return fetchBytes(fname)
    .then(data => loadRom(data))
}

function startChip(draw, buzz) {
  const loop = () => {
    cycle(draw, buzz)
    requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop)
}

window.addEventListener('load', () => {
  const canvas = document.getElementById('cvs')
  const draw = initScreen(canvas)
  const buzz = initAudio()
  initInput(setKeyPressed, setKeyReleased)

  loadGame("./roms/pong")
    .catch(err => { throw err })
    .then(() => startChip(draw, buzz))
})
