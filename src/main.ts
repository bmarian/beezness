const numberFormater = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
})

let state = {
  honey: 0,
  worker: 0,
  flowers: 0,
  prices: {
    honey: 0,
    worker: 0,
    flowers: 0,
  },
}

function setHoneyValue() {
  const newValue = 1 + state.worker * state.flowers
  state.prices.honey = newValue
}
function setWorkerPrice() {
  const newPrice = 10 + ~~(0.1 * state.worker ** 2 + state.worker)
  state.prices.worker = newPrice
}
function setFlowersPrice() {
  const newPrice = 100 + ~~(Math.exp(state.flowers) + state.flowers)
  state.prices.flowers = newPrice
}

function loadStateFromStorage() {
  const storageState = localStorage.getItem('state')

  if (storageState) {
    state = JSON.parse(storageState)
  }
}

function saveStateToStorage() {
  localStorage.setItem('state', JSON.stringify(state))
}

function init() {
  loadStateFromStorage()
  setHoneyValue()
  setWorkerPrice()
  setFlowersPrice()
}
init()

const honeyCounterElement = document.querySelector("#honey-counter") as HTMLElement
const workerCounterElement = document.querySelector("#worker-counter") as HTMLElement
const flowerCounterElement = document.querySelector("#flower-counter") as HTMLElement

const honeyValueElement = document.querySelector("#honey-value") as HTMLElement
const workerPriceElement = document.querySelector("#worker-price") as HTMLElement
const flowerPriceElement = document.querySelector("#flower-price") as HTMLElement

const addHoneyButton = document.querySelector("#add-honey-button")
const addWorkerButton = document.querySelector("#add-worker-button")
const addFlowerButton = document.querySelector("#add-flower-button")

addHoneyButton?.addEventListener("click", addHoneyEventListener)
addWorkerButton?.addEventListener("click", addWorkerEventListener)
addFlowerButton?.addEventListener("click", addFlowerEventListener)

function addHoneyEventListener() {
  state.honey += state.prices.honey
}

function addWorkerEventListener() {
  if (state.honey < state.prices.worker) return

  state.honey -= state.prices.worker
  state.worker += 1

  setWorkerPrice()
  setHoneyValue()
}

function addFlowerEventListener() {
  if (state.honey < state.prices.flowers) return

  state.honey -= state.prices.flowers
  state.flowers += 1

  setFlowersPrice()
  setHoneyValue()
}

function gameLogic() {
  state.honey += Math.max(state.worker * state.flowers, state.worker)
  drawTextInElement(honeyCounterElement, scientificFormat(state.honey))
  // console.log(state)

  saveStateToStorage()
}

function drawTextInElement(htmlElement: HTMLElement, text: string) {
  if (htmlElement.innerText === text) return
  htmlElement.innerText = text
}

function scientificFormat(value: number): string {
  if (value < 1000000) return numberFormater.format(value)
  return value.toExponential(2)
}

function draw() {
  drawTextInElement(honeyCounterElement, scientificFormat(state.honey))
  drawTextInElement(honeyValueElement, scientificFormat(state.prices.honey))

  drawTextInElement(workerCounterElement, scientificFormat(state.worker))
  drawTextInElement(workerPriceElement, scientificFormat(state.prices.worker))

  drawTextInElement(flowerCounterElement, scientificFormat(state.flowers))
  drawTextInElement(flowerPriceElement, scientificFormat(state.prices.flowers))
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
