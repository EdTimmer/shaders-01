import * as THREE from "three"
import Experience from "../Experience"
import Environment from "./Environment"
import SurfaceOne from "./SurfaceOne"
import SurfaceTwo from "./SurfaceTwo"

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.axisHelper = new THREE.AxesHelper(100)

    this.scene.add(this.axisHelper)

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('world')
    }

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      this.surfaceOne = new SurfaceOne();
      this.surfaceTwo = new SurfaceTwo();

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
    if (this.surfaceTwo) {
      this.surfaceTwo.update()
    }
  }
}