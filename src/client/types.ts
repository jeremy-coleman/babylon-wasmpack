import { Vector3 } from "@babylonjs/core"

//export type {Nullable} from "@babylonjs/core/types"
export declare type Nullable<T> = T | null

/** The number of particles in the universe. */
export const N = 800

/** The index offset for the x dimension. */
export const DIM_X = 0

/** The index offset for the y dimension. */
export const DIM_Y = 1

/** The total number of spatial dimensions. */
export const DIM_N = 2

export type State = {
  camera: {
    position: Vector3
    target: Vector3
  }
  inspector?: boolean
}

/** Vector in the xz plane. */
export class WorldVector extends Vector3 {
  constructor(x?: number, z?: number) {
    super(x, 0, z)
  }
}

export type World = {
  positions: WorldVector[]
}

export type Update = {
  deltaTime: number
}
