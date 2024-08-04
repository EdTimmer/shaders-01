import * as THREE from "three"
import Experience from "../Experience"
import Environment from "./Environment"
import SurfaceOne from "./SurfaceOne"

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('world')
    }

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      this.surfaceOne = new SurfaceOne();

      this.environment = new Environment()
           
      // Pass engineGroup to the camera
      this.camera.setTarget(this.surfaceOne.mesh)
    })
  }

  update() {
    if (this.camera) {
      this.camera.update()
    }
    if (this.surfaceOne) { 
      this.surfaceOne.update()
    }
  }
}