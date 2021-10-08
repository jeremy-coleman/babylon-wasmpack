import { FlyCamera, Scene, FlyCameraInputsManager } from "@babylonjs/core"
import { codes } from "keycode"
import { State } from "./types"

export type CameraType = FlyCamera

export const setupCamera = (state: State, scene: Scene): CameraType => {
  const camera = new FlyCamera("camera", state.camera.position, scene, true)

  //setup controls
  // let _inputManager = new FlyCameraInputsManager(camera)
  // _inputManager.addMouse()
  // _inputManager.addKeyboard()

  camera.keysUp = [codes.e]
  camera.keysDown = [codes.q]
  camera.keysForward = [codes.w]
  camera.keysBackward = [codes.s]
  camera.keysLeft = [codes.a]
  camera.keysRight = [codes.d]
  camera.speed = 0.1

  //set target
  camera.setTarget(state.camera.target)

  return camera
}
