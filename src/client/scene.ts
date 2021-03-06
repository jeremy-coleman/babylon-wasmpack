import {
  Color3,
  Color4,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Observer,
  Scene,
  Vector3,
} from "@babylonjs/core"
import { range } from "ramda"
import { pauseService } from "./main"
import { N, Nullable } from "./types"

let obs: Nullable<Observer<Scene>>

export const setupScene = (baby: Engine): Scene => {
  const scene = new Scene(baby)
  scene.useRightHandedSystem = true
  scene.clearColor = Color4.FromColor3(Color3.Black())

  new HemisphericLight("light", new Vector3(0, 1, -1), scene)

  const point = MeshBuilder.CreateSphere("point", { diameter: 0.05 }, scene)
  const points = range(0, N).map((i) => point.createInstance(i.toString()))
  point.scaling = new Vector3(0, 0, 0)

  import("./broker").then((broker) => {
    obs = scene.onBeforeRenderObservable.add(({ deltaTime }) => {
      if (pauseService.state.value !== "paused") {
        broker.nextUpdate({ deltaTime })
      }
    })
    broker.worldStream.run(
      {
        event: (_, { positions }) => {
          positions.forEach((p, i) => {
            points[i].position = p
          })
        },
        end: () => {},
        error: () => {},
      },
      broker.scheduler
    )
  })

  return scene
}

if (module.hot) {
  module.hot.addDisposeHandler(() => {
    if (obs) obs.unregisterOnNextCall = true
  })
}
