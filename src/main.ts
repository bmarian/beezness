import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <span id="honey-counter">0</span> 🍯<br/>
    <span id="worker-counter">0</span> 🐝<br/>
    <span id="flower-counter">0</span> 🌺<br/>

    <button id="add-honey-button">
      <span id="honey-value">1</span>
      Harvest honey 🍯
    </button><br/>
    <button id="add-worker-button">
      $<span id="worker-price">10</span>
      Buy worker bee 🐝
    </button><br/>
    <button id="add-flower-button">
      $<span id="flower-price">100</span>
      Plant flower 🌺
    </button><br/>
  </div>
`

const state = {
  honey: 111,
  worker: 0,
  flowers: 0,
}

const honeyCounterElement = document.querySelector("#honey-counter") as HTMLElement
const workerCounterElement = document.querySelector("#worker-counter") as HTMLElement
const flowerCounterElement = document.querySelector("#flower-counter") as HTMLElement

const honeyValueElement = document.querySelector("#honey-value") as HTMLElement
const workerPriceElement = document.querySelector("#worker-price") as HTMLElement
const flowerPriceElement = document.querySelector("#flower-price") as HTMLElement

const addHoneyButton = document.querySelector("#add-honey-button")
const addWorkerButton = document.querySelector("#add-worker-button")
const addFlowerButton = document.querySelector("#add-flower-button")

function addHoneyEventListener() {
  state.honey += 1 + state.worker * state.flowers
}

function addWorkerEventListener() {
  if (state.honey < 10 + state.worker ** 2) return

  state.honey -= (10 + state.worker ** 2)
  state.worker += 1
}

function addFlowerEventListener() {
  if (state.honey < 100 + state.flowers ** 2) return

  state.honey -= (100 + state.flowers ** 2)
  state.flowers += 1
}

addHoneyButton?.addEventListener("click", addHoneyEventListener)
addWorkerButton?.addEventListener("click", addWorkerEventListener)
addFlowerButton?.addEventListener("click", addFlowerEventListener)

function gameLogic() {
  state.honey += Math.max(state.worker * state.flowers, state.worker)

  honeyCounterElement.innerText = state.honey.toString()
  console.log(state)
}

function draw() {
  honeyCounterElement.innerText = state.honey.toString()
  honeyValueElement.innerText = (1 + state.worker * state.flowers).toString()

  workerCounterElement.innerText = state.worker.toString()
  workerPriceElement.innerText = (10 + state.worker ** 2).toString()

  flowerCounterElement.innerText = state.flowers.toString()
  flowerPriceElement.innerText = (100 + state.flowers ** 2).toString()
}

let delta: number, oldTimeStamp: number, timePassed: number = 0

function gameLoop(timeStamp: number) {
  delta = (timeStamp - oldTimeStamp) / 1000
  oldTimeStamp = timeStamp
  timePassed += Number.isNaN(delta) ? 0 : delta

  if (timePassed >= 1) {
    gameLogic()
    timePassed = 0
  }

  draw()
  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
