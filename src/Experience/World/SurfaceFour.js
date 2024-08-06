import * as THREE from 'three'
import Experience from '../Experience'
import fourVertexShader from '../shaders/four/vertexFour.glsl'
import fourFragmentShader from '../shaders/four/fragmentFour.glsl'

export default class SurfaceFour {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.instance;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    this.setMaterial()
    this.setGeometry()
    this.setMesh()
    this.update()
  }

  setMaterial() {
    this.material = new THREE.RawShaderMaterial({
      vertexShader: fourVertexShader,
      fragmentShader: fourFragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        u_Time: { value: 0.0 },
      }
    })
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(50, 50, 32, 32);

    const count = this.geometry.attributes.position.count;
    this.randoms = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      this.randoms[i] = Math.random();
    }

    this.geometry.setAttribute('a_Random', new THREE.BufferAttribute(this.randoms, 1));
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(-60, -30, 0);

    this.meshPosition = this.mesh.position;
    this.meshQuaternion = this.mesh.quaternion;
    this.scene.add(this.mesh);
  } 

  update() {
    const elapsedTime = this.experience.time.getElapsedTime().toFixed(2);
    this.material.uniforms.u_Time.value = this.experience.time.getElapsedTime().toFixed(2);
    
    for (let i = 0; i < this.randoms.length; i++) {
      this.randoms[i] -= Math.sin(this.randoms[i] * elapsedTime * 0.5) * 0.007;
    }
    this.geometry.attributes.a_Random.needsUpdate = true;

  }
}