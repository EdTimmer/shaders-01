import * as THREE from 'three'
import Experience from '../Experience'
import testVertexShader from '../shaders/test/vertex.glsl'
import testFragmentShader from '../shaders/test/fragment.glsl'

export default class SurfaceOne {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.elapsedTime = this.experience.elapsedTime;
    this.showWireframe = true;

    this.setMaterial()
    this.setGeometry()
    this.setMesh()
    this.update()
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      uniforms: {
          u_Frequency: { value: new THREE.Vector2(10, 5) },
          u_Time: { value: 0 },
          u_Color: { value: new THREE.Color('orange') },
          // uTexture: { value: flagTexture },
      }, 
      side: THREE.DoubleSide,
    })
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(100, 100, 32, 32);
    // this.geometry = new THREE.SphereGeometry(36, 8, 8);
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 0);

    this.meshPosition = this.mesh.position;
    this.meshQuaternion = this.mesh.quaternion;
    this.scene.add(this.mesh);
  } 

  setWireframe(value) {
    this.material.wireframe = value;
    this.material.opacity = value ? 1 : 0;
  }

  update() {    
    // this.mesh.position.x = 430 * Math.cos(this.experience.time.getElapsedTime() * 0.0005);
    // this.mesh.position.y = 0; // Keep it on the horizontal plane
    // this.mesh.position.z = 430 * Math.sin(-this.experience.time.getElapsedTime() * 0.0005);
    // this.mesh.rotation.y = -this.experience.time.getElapsedTime() * 0.1;
    // this.mesh.rotation.z += 0.01
    // this.mesh.rotation.x += 0.01
  }
}