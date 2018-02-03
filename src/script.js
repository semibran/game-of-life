const update = require("../lib/update")
const render = require("./render")

let state = {
  cache: new Array(8),
  world: {
    time: 0,
    rule: parse("B3/23"),
    size: [ 256, 256 ],
    data: new Uint8ClampedArray(256 * 256)
  }
}

reset(state.world)
let canvas = render(state)
document.body.appendChild(canvas)

requestAnimationFrame(loop)

function parse(rule) {
  return {
    birth: rule.slice(1, rule.indexOf("/")).split("").map(Number),
    survival: rule.slice(rule.indexOf("S") + 1).split("").map(Number)
  }
}

function reset(world) {
  world.time = 0
  world.data = world.data
    .fill()
    .map(_ => Math.random() < 0.5)
}

function loop() {
  let { cache, world } = state
  if (cache.length) {
    for (let i = cache.length - 1; i--;) cache[i + 1] = cache[i]
    cache[0] = world.data.join("")
  }
  update(world)
  render(state, canvas)
  requestAnimationFrame(loop)
}
