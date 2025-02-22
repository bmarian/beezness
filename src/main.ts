import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <span id="honey-counter">0</span> 🍯<br/>
    <span id="worker-counter">0</span> 🐝<br/>
    <span id="flower-counter">0</span> 🌺<br/>

    <button id="add-honey-button">Harvest honey 🍯</button><br/>
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
  honey: 0,
  worker: 0,
  flowers: 0,
}

const honeyCounterElement = document.querySelector("#honey-counter") as HTMLElement
const workerCounterElement = document.querySelector("#worker-counter") as HTMLElement
const workerPriceElement = document.querySelector("#worker-price") as HTMLElement

const addHoneyButton = document.querySelector("#add-honey-button")
const addWorkerButton = document.querySelector("#add-worker-button")

function addHoneyEventListener() {
  honeyCounterElement.innerText = (state.honey += 1).toString()
}

if (addHoneyButton)
  addHoneyButton.addEventListener("click", addHoneyEventListener)

function addWorkerEventListener() {
  if (state.honey < 10 + state.worker ** 2) return

  honeyCounterElement.innerText = (state.honey -= (10 + state.worker ** 2)).toString()

  workerCounterElement.innerText = (state.worker += 1).toString()
  workerPriceElement.innerText = (10 + state.worker ** 2).toString()
}

if (addWorkerButton)
  addWorkerButton.addEventListener("click", addWorkerEventListener)

setInterval(() => {
  state.honey += 1 * state.worker

  honeyCounterElement.innerText = state.honey.toString()
  console.log(state)
}, 1000)
