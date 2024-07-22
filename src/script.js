import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {RGBELoader} from "three/addons/loaders/RGBELoader.js"
console.log(RGBELoader)


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// debug
const gui = new GUI()

// texture

const texture = new THREE.TextureLoader()

const doorColorTexture = texture.load('/textures/door/color.jpg')
const doorAlphaTexture = texture.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = texture.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = texture.load('/textures/door/height.jpg')
const doorMetalnessTexture = texture.load('/textures/door/metalness.jpg')
const doorNormalTexture = texture.load('/textures/door/normal.jpg')
const doorRoughnessTexture = texture.load('/textures/door/roughness.jpg')
const matcapTexture = texture.load('/textures/matcaps/3.png')
const gradientTexture = texture.load('/textures/gradients/5.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color("green")
// material.transparent = true
// material.opacity = 0.3
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// Mesh Normal Material

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// Mesh Matcap Material

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// Mesh Depth Material
// const material = new THREE.MeshDepthMaterial()
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100

// Mesh PhonToonMaterial
// const material = new THREE.MeshToonMaterial()
// material.specular = new THREE.Color(0X1199ff)
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

// Mesh PhonToonMaterial
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.02
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.1,0.2)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// Mesh Physcial MAterail
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.02
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.1,0.2)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

gui.add(material,'metalness').min(0).max(1).step(0.0001)
gui.add(material,'roughness').min(0).max(1).step(0.0001)

// // Clear Coat
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material,'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material,'clearcoatRoughness').min(0).max(1).step(0.0001)

// gui.add(material,'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material,'clearcoatRoughness').min(0).max(1).step(0.0001)


// // Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1,1,1)

// gui.add(material, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material, 'sheenColor')

// Iridescence

// material.iridescence = 1
// material.iridescenceIOR = 0.25
// material.iridescenceThicknessRange = [100, 800]

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

// Transmission

material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission')
.min(0).max(1).step(0.001)

gui.add(material, 'ior')
.min(1).max(10).step(0.001)

gui.add(material, 'thickness')
.min(0).max(1).step(0.001)

material.gradientMap = gradientTexture
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64.),
    material
)
sphere.position.x = -1.5
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100,100),
    material
)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 120),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

// lights

// const ambientLight = new THREE.AmbientLight(0xffffff,1)
// scene.add(ambientLight)
// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4

// scene.add(pointLight)

// Environment Maps
const rgbeLoader = new RGBELoader()
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environment) => {
    environment.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environment
    scene.environment = environment
})
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects

    sphere.rotation.y = elapsedTime * 0.1
    plane.rotation.y = elapsedTime * 0.1
    torus.rotation.y = elapsedTime * 0.1

    sphere.rotation.x = elapsedTime * -0.15
    plane.rotation.x = elapsedTime * -0.15
    torus.rotation.x = elapsedTime * -0.15

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()