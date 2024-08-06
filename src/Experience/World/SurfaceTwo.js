import * as THREE from 'three'
import Experience from '../Experience'
import twoVertexShader from '../shaders/two/vertexTwo.glsl'
import twoFragmentShader from '../shaders/two/fragmentTwo.glsl'

export default class SurfaceTwo {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.instance;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    this.setMaterial()
    this.setGeometry()
    this.setMesh()
    this.addMouseListener()
    this.update()
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: twoVertexShader,
      fragmentShader: twoFragmentShader,
      uniforms: {
          u_Time: { value: 0.0 },
          u_Mouse: { value: new THREE.Vector2(0, 0) }
      }, 
      side: THREE.DoubleSide,
    })
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(50, 50, 32, 32);
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 30, 0);

    this.meshPosition = this.mesh.position;
    this.meshQuaternion = this.mesh.quaternion;
    this.scene.add(this.mesh);
  } 

  addMouseListener() {
    window.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.updateMouseUniform();
    });
  }

  updateMouseUniform() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.mesh);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const localPoint = intersect.point.clone().sub(this.mesh.position);
      this.material.uniforms.u_Mouse.value.set(localPoint.x / 50 + 0.5, localPoint.y / 50 + 0.5);
    }
  }

  update() {    
    this.material.uniforms.u_Time.value = this.experience.time.getElapsedTime().toFixed(2);
  }
}