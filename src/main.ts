const numberFormater = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
})

const state = {
  honey: 0,
  worker: 0,
  flowers: 5,
  prices: {
    honey: 0,
    worker: 0,
    flowers: 0,
  },
  setHoneyValue() {
    const newValue = 1 + state.worker * state.flowers
    this.prices.honey = newValue
  },
  setWorkerPrice() {
    const newPrice = 10 + ~~(0.1 * this.worker ** 2 + this.worker)
    this.prices.worker = newPrice
  },
  setFlowersPrice() {
    const newPrice = 100 + ~~(Math.exp(this.flowers) + this.flowers)
    this.prices.flowers = newPrice
  }
}

function init() {
  state.setHoneyValue()
  state.setWorkerPrice()
  state.setFlowersPrice()
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

  state.setWorkerPrice()
  state.setHoneyValue()
}

function addFlowerEventListener() {
  if (state.honey < state.prices.flowers) return

  state.honey -= state.prices.flowers
  state.flowers += 1

  state.setFlowersPrice()
  state.setHoneyValue()
}

function gameLogic() {
  state.honey += Math.max(state.worker * state.flowers, state.worker)

  drawTextInElement(honeyCounterElement, scientificFormat(state.honey))
  // console.log(state)
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
