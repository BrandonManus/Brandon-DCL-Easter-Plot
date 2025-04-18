import {
  engine,
  Entity,
  Transform,
  GltfContainer,
  Tween,
  EasingFunction,
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

// Optional: importing math (placeholder, if needed later)
import {} from '@dcl/sdk/math'

// External modules
import { LSCQuesting } from './questing'

let time = 0
let DROID_IS_MOVING: Record<number, boolean> = {}

export function main() {
  LSCQuesting()

  // Initialize In-World Builder if needed
  // initializeIWB(engine) // Uncomment if you plan to use IWB

  const droneCount = 5
  for (let i = 0; i < droneCount; i++) {
    spawnRandomDrone(i)
  }

  spawnCircularDrone()
}

function spawnRandomDrone(index: number) {
  const drone = engine.addEntity()

  const initialPosition = Vector3.create(
    Math.random() * 10 + 1,
    2,
    Math.random() * 10 + 1
  )

  Transform.create(drone, {
    position: initialPosition,
    scale: Vector3.create(0.75, 0.75, 0.75),
  })

  GltfContainer.create(drone, {
    src: 'assets/scene/qxg_drone.glb',
  })

  DROID_IS_MOVING[index] = false

  utils.triggers.addTrigger(
    drone,
    utils.LAYER_1,
    utils.LAYER_1,
    [{ type: 'box', scale: Vector3.create(3, 3, 3) }],
    () => {
      if (DROID_IS_MOVING[index]) return
      moveDroneToRandomPos(drone, index)
      DROID_IS_MOVING[index] = true
    }
  )
}

function moveDroneToRandomPos(drone: Entity, index: number) {
  const startPos = Transform.get(drone).position
  const endPos = Vector3.create(
    Math.random() * 10 + 1,
    2,
    Math.random() * 10 + 1
  )

  const startRot = Transform.get(drone).rotation
  const endRot = Quaternion.fromLookAt(startPos, endPos)

  Tween.createOrReplace(drone, {
    mode: Tween.Mode.Rotate({ start: startRot, end: endRot }),
    duration: 2000,
    easingFunction: EasingFunction.EF_EASEOUTQUAD,
  })

  utils.timers.setTimeout(() => {
    Tween.createOrReplace(drone, {
      mode: Tween.Mode.Move({ start: startPos, end: endPos }),
      duration: 2000,
      easingFunction: EasingFunction.EF_EASEOUTQUAD,
    })
  }, 2000)

  utils.timers.setTimeout(() => {
    DROID_IS_MOVING[index] = false
  }, 4000)
}

function spawnCircularDrone() {
  const drone = engine.addEntity()

  Transform.create(drone, {
    position: Vector3.create(8, 6, 8),
    scale: Vector3.create(1, 1, 1),
    rotation: Quaternion.Identity(),
  })

  GltfContainer.create(drone, {
    src: 'assets/scene/qxg_drone.glb',
  })

  engine.addSystem(() => {
    const transform = Transform.getMutable(drone)

    time += 0.02

    const centerX = 8
    const centerZ = 8
    const radius = 3
    const heightVariation = 0.5 + Math.sin(time * 2) * 0.3

    transform.position.x = centerX + Math.cos(time) * radius
    transform.position.z = centerZ + Math.sin(time) * radius
    transform.position.y = 6 + heightVariation

    const angle = Math.atan2(Math.sin(time), Math.cos(time))
    transform.rotation = Quaternion.fromEulerDegrees(0, -angle * (180 / Math.PI), 0)
  })
}
