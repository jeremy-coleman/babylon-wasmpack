import "@babylonjs/inspector"
import { Engine, Scene, Vector3 } from "@babylonjs/core"
import { codes } from "keycode"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { interpret } from "xstate"
import { CameraType, setupCamera } from "./camera"
import { Root } from "./Root"
import { pauseMachine } from "./machine"
import { setupScene } from "./scene"
import { Nullable, State } from "./types"

export const pauseService = interpret(pauseMachine, { devTools: true })
pauseService.start()

ReactDOM.render(React.createElement(Root, {}), document.getElementById("root"))

const canvas = document.getElementById("main-canvas") as HTMLCanvasElement

const antialias = true
let baby = new Engine(canvas, antialias)

let scene: Nullable<Scene> = null

const init = (state: State) => {
  scene = setupScene(baby)
  //if (state.inspector) scene.debugLayer.show();

  //setupCamera(state, scene).attachControl(canvas);
  setupCamera(state, scene).attachControl(true)

  baby.runRenderLoop(() => scene!.render())
}

const getState = (scene: Scene): State => {
  const camera = scene.activeCamera as CameraType
  return {
    camera: {
      position: camera.position,
      target: camera.getTarget(),
    },
    inspector: scene?.debugLayer.isVisible(),
  }
}

init({
  camera: {
    position: new Vector3(0, 2, -8),
    target: new Vector3(0, 0, 0),
  },
})

if (module.hot) {
  module.hot.accept("./scene", () => {
    const state = getState(scene!)
    baby.dispose()
    baby = new Engine(canvas, antialias)
    init(state)
  })
  module.hot.accept("./camera", () => {
    const state = getState(scene!)
    scene!.activeCamera!.dispose()
    //setupCamera(state, scene!).attachControl(canvas, true);
    setupCamera(state, scene!).attachControl(true)
  })
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode === codes["\\"] && scene) {
    if (scene.debugLayer.isVisible()) {
      scene.debugLayer.hide()
    } else {
      scene.debugLayer.show()
    }
  }
})

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  baby.resize
})
