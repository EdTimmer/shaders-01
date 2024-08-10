import * as THREE from 'three'
import Experience from '../Experience'
import threeVertexShader from '../shaders/three/vertexThree.glsl'
import threeFragmentShader from '../shaders/three/fragmentThree.glsl'

export default class SurfaceThree {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.instance;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.debug = this.experience.debug

    this.textureLoader = new THREE.TextureLoader();
    this.flagTexture = this.textureLoader.load('/textures/ava2.jpg');

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('frequency')
    }

    this.setMaterial()
    this.setGeometry()
    this.setMesh()
    this.update()
  }

  setMaterial() {
    if (this.flagTexture) {
      this.material = new THREE.RawShaderMaterial({
        vertexShader: threeVertexShader,
        fragmentShader: threeFragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          u_Frequency: { value: new THREE.Vector2(0.1, 0.05) },
          u_Time: { value: 0.0 },
          u_Texture: { value: this.flagTexture }
        }
      });
    }
    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.material.uniforms.u_Frequency.value, 'x').name('frequencyX').step(0.1).min(0).max(20)
      this.debugFolder.add(this.material.uniforms.u_Frequency.value, 'y').name('frequencyY').step(0.1).min(0).max(20)
    }
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(50, 50, 32, 32);
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(60, 30, 0);

    this.meshPosition = this.mesh.position;
    this.meshQuaternion = this.mesh.quaternion;
    this.scene.add(this.mesh);
  } 

  update() {
    this.material.uniforms.u_Time.value = this.experience.time.getElapsedTime().toFixed(2);
  }
}