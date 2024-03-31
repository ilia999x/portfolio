import React, { useRef, Suspense, useState, useEffect ,useCallback } from "react"
import * as THREE from "three"
import { OrbitControls, Environment, Loader, Outlines, Html, PerspectiveCamera } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Canvas, useLoader, useFrame, useThree, extend  } from "@react-three/fiber"
import { BlendFunction } from "postprocessing"
import { EffectComposer, Vignette , SMAA ,DepthOfField  } from "@react-three/postprocessing"
import * as rive from "@rive-app/canvas"
// import { FXAAShader } from './FXAAShader'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
const RivePortal = () => {
  useEffect(() => {
    // Create a new Rive instance
    const r = new rive.Rive({
      // Hosted .riv asset, or a local one. Uncomment line 12 to try with
      // a local basketball.riv asset, or add your own!
      src: "portal.riv",
      // src: 'basketball.riv',
      canvas: document.getElementById("canvas"),
      stateMachines: "stateMachine",
      artboard: "mainboard",
      autoplay: true,
      // onLoad: () => {
      //   r.resizeDrawingSurfaceToCanvas()
      // },
    })

    // Clean up the Rive instance when the component unmounts
    return () => {
      r?.destroy()
    }
  }, [])

  return (
    <div width={200} height={200}>
      <canvas id="canvas"></canvas>
    </div>
  )
}

export default function RickModel({ children }) {

  return (
      <Canvas 
        eventPrefix="client"
        legacy
        props={{ antialias: true}}
        camera={{ fov: 60 }} dpr={[1, 1]}
      >
     <RickModelInside />
      </Canvas>
  );
}

function Effects() {
  const { scene, gl, size, camera } = useThree()

  return (
    <EffectComposer multisampling={4} disableNormalPass={true}>
      <Vignette eskil={false} offset={0.001} darkness={0.5} />
      <SMAA />
      
    </EffectComposer>
  )
}
export function RickModelInside(props) {
  const ref = useRef()
  const groupRef = useRef()
  const fogRef = useRef()
  const EYEREF = useRef()
  const lightref = useRef()

  useThree(({ camera }) => {
    camera.position.set(8.5, 0, 0)
    // camera.rotation.y = THREE.MathUtils.degToRad (0);
    // camera.rotation.x = THREE.MathUtils.degToRad(20);
    // camera.rotation.z = THREE.MathUtils.degToRad(0);
    // Move the camera back along the y-axis
    // Look at the origin
    camera.lookAt(new THREE.Vector3(0, -1, -1))
  })

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 8
    const y = (mouse.y * viewport.height) / 8
    const rotationX = ((y / viewport.height) * Math.PI) % (2 * Math.PI)
    const rotationY = ((x / viewport.width) * Math.PI) % (2 * Math.PI)
    groupRef.current.rotation.set(0, rotationY, rotationX)
    lightref.current.rotation.set(0, rotationY, rotationX)
    lightref.current.lookAt(new THREE.Vector3(0, -1, -1))
    fogRef.current.far=15/Math.abs(rotationY)
    fogRef.current.near=Math.abs(rotationX)*22
  })

  return (
    <>
      <Effects />
      
      <spotLight angle={0.2} intensity={10} castShadow position={[5, 10, 5]} />
      <pointLight ref={lightref} position={[100, 100, 100]} intensity={5} />
      <fog ref={fogRef} attach="fog" args={["#9bfa0d", 0, 60]} />
      <ambientLight intensity={3} />
      <Suspense fallback={null}>
        <RickModelLoad groupRef={groupRef} EYEREF={EYEREF} />
      </Suspense>
      <Html style={{ userSelect: 'none' }} position={new THREE.Vector3(-10, -2, 0)} rotation={[THREE.MathUtils.degToRad (0),THREE.MathUtils.degToRad (90),THREE.MathUtils.degToRad (0)]} castShadow receiveShadow occlude="blending" transform >
            <RivePortal />
          </Html>
      <PerspectiveCamera makeDefault fov={35} />
      {/* <axesHelper args={[5]} /> */}
      <Environment preset="city" blur={1} />
    </>
  )
}

export function RickModelLoad({ outlines, groupRef, EYEREF, ...props }) {
  const [OutlinesObj, setOutlinesObj] = useState({ thickness: 0.01, angle: 0 })
  const [hovered, setHovered] = useState(false)
  const [colorModified, setColorModified] = useState(false)

  // Ensure color modification is applied only once
  const { nodes, materials } = useLoader(GLTFLoader, "./rick_optimized_2.glb")
  console.log(nodes, materials, "imports")

  const EyeMesh = ({ position, scale, angle, thickness, tiltFactor = 0.03 }) => {
    const eyeRef = useRef()

    // Tilt effect based on mouse movement
    useFrame(({ mouse, viewport }) => {
      const x = (mouse.x * viewport.width) / 10
      const y = (mouse.y * viewport.height) / 10

      const tiltX = x * tiltFactor
      const tiltY = y * tiltFactor

      eyeRef.current.position.x = position[0] + tiltX + 0.05
      eyeRef.current.position.y = position[1] + tiltY
    })
    return (
      <mesh castShadow receiveShadow geometry={nodes.Sphere004.geometry} material={materials.eyedark} position={position} scale={scale} ref={eyeRef}>
        <Outlines thickness={thickness} angle={angle} />
      </mesh>
    )
  }
  if (!colorModified) {
    // Iterate through all materials and set light to 0
    Object.keys(materials).forEach((materialName) => {
      if (materials[materialName]) {
        const matcolor = materials[materialName].color
        // Convert RGB to HSL
        const hslColor = new THREE.Color().setRGB(matcolor.r, matcolor.g, matcolor.b).getHSL(new THREE.Vector3())
        // Modify the HSL values as needed
        const newH = hslColor.h // Hue (0.0 to 1.0)
        // Increase the saturation by a certain amount
        const increaseAmount = 0.25 // Adjust this value based on your desired increase
        let newS = hslColor.s + increaseAmount
        newS = Math.min(1, newS)
        const increaseAmountl = 0.01
        let newL = hslColor.l - increaseAmountl
        newL = Math.min(1, newL)
        materials[materialName] = new THREE.MeshToonMaterial({ color: new THREE.Color().setHSL(newH, newS, newL) })
      }
    })
    // Set the flag to true to avoid continuous modification
    setColorModified(true)
    console.log(materials, "rematerials")
  }

  return (
    <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <group {...props} dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.Cube001.geometry} material={materials.manty} position={[0, -0.821, -0.128]}>
          <Outlines thickness={0.005} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials["RICK SKIN"]}
          position={[-0.014, 0.417, -0.306]}
          scale={[0.171, 0.535, 0.337]}>
          <Outlines thickness={0.03} angle={OutlinesObj.angle} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials.rickhair} position={[-0.145, 0.123, -0.135]}>
          <Outlines thickness={0.01} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body.geometry}
          material={materials["Material.004"]}
          position={[0, -0.522, -0.429]}
          scale={[0.171, 0.535, 0.337]}>
          <Outlines thickness={0.04} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials["Morty skin"]}
          position={[0.025, -0.159, 0.37]}
          scale={[0.191, 0.422, 0.326]}>
          <Outlines thickness={0.03} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials["Material.006"]}
          position={[-0.101, -0.037, 0.433]}
          scale={[0.191, 0.422, 0.337]}>
          <Outlines thickness={0.02} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.legs.geometry}
          material={materials["rick pants"]}
          position={[-0.01, -1.283, -0.523]}
          scale={[0.171, 0.535, 0.25]}>
          <Outlines thickness={0.04} angle={OutlinesObj.angle} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Cube005.geometry} material={materials["Material.008"]} position={[0.059, -0.878, 0.569]}>
          <Outlines thickness={0.01} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={materials["Morty skin"]}
          position={[0.04, -1.157, 1.284]}
          rotation={[-0.873, 0, 0]}
          scale={0.046}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials["Morty skin"]}
          position={[0.078, -1.428, 0.35]}
          rotation={[-0.145, 0, 0]}
          scale={0.048}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials["RICK SKIN"]}
          position={[0.323, 0.609, 0.661]}
          rotation={[0.624, -0.004, 0.06]}
          scale={0.046}>
          <Outlines thickness={0.15} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={materials["RICK SKIN"]}
          position={[0.477, -0.773, -0.034]}
          rotation={[-2.108, 0, 0]}
          scale={0.046}>
          <Outlines thickness={0.15} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MORTYlegs001.geometry}
          material={materials.mortyunder}
          position={[0.026, -1.594, 0.851]}
          rotation={[-0.429, 0, 0]}
          scale={[0.171, 0.535, 0.253]}>
          <Outlines thickness={0.04} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials["morty socks"]}
          position={[0.042, -2.681, 1.529]}
          rotation={[-Math.PI / 6, 0, 0]}
          scale={[-0.041, -0.144, -0.046]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials["morty socks"]}
          position={[-0.168, -2.666, 1.246]}
          rotation={[-Math.PI / 6, 0, 0]}
          scale={[-0.04, -0.142, -0.045]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          material={materials["morty boots"]}
          position={[0.034, -2.833, 1.617]}
          rotation={[-0.595, -0.63, -0.121]}
          scale={[-0.07, -0.122, -0.078]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          material={materials["morty boots"]}
          position={[-0.182, -2.813, 1.327]}
          rotation={[-0.564, -0.394, -0.168]}
          scale={[-0.07, -0.122, -0.078]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          material={materials["morty socks"]}
          position={[-0.113, -2.711, -0.48]}
          rotation={[0.909, 0.11, -0.318]}
          scale={[-0.051, -0.179, -0.057]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015.geometry}
          material={materials["morty socks"]}
          position={[0.159, -2.885, -1.535]}
          rotation={[0.518, 0, 0.103]}
          scale={[-0.051, -0.179, -0.057]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          material={materials["ricky boots"]}
          position={[-0.153, -2.897, -0.575]}
          rotation={[-3.115, -0.355, -3.11]}
          scale={[-0.07, -0.122, -0.078]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017.geometry}
          material={materials["ricky boots"]}
          position={[0.159, -3.09, -1.589]}
          rotation={[-0.03, -0.549, 0.007]}
          scale={[-0.07, -0.122, -0.078]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials.eyeball}
          position={[0.165, 0.517, -0.19]}
          rotation={[0, -0.351, 0.183]}
          scale={[0.098, 0.134, 0.134]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere002.geometry}
          material={materials.mortyeyes}
          position={[0.33, -0.09, 0.182]}
          rotation={[0, 0.153, 0]}
          scale={[0.065, 0.11, 0.11]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere003.geometry}
          material={materials.mortyeyes}
          position={[0.343, -0.149, 0.486]}
          rotation={[0, -0.186, 0]}
          scale={[0.071, 0.114, 0.114]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials.eyeeeeeee}
          position={[0.337, -0.132, 0.477]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.245}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <EyeMesh position={[0.253, 0.505, -0.452]} scale={0.017} angle={OutlinesObj.angle} thickness={0.1} />;
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001.geometry}
          material={materials.eyeball}
          position={[0.151, 0.526, -0.474]}
          rotation={[-0.064, 0.48, 0.139]}
          scale={[0.098, 0.134, 0.134]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={materials["eyeeeeeee.001"]}
          position={[0.297, -0.073, 0.136]}
          rotation={[0.104, 0.865, -Math.PI / 2]}
          scale={[0.239, 0.242, 0.243]}>
          <Outlines thickness={0.01} angle={OutlinesObj.angle} />
        </mesh>
        <EyeMesh position={[0.261, 0.501, -0.2]} scale={0.017} angle={OutlinesObj.angle} thickness={0.1} />;
        {/* <mesh
        castShadow
        receiveShadow
       
        geometry={nodes.Sphere005.geometry}
        material={materials["eyedark.001"]}
        position={[0.261, 0.501, -0.253]}
        scale={0.017}
      >
        <Outlines thickness={ 0.1} angle={OutlinesObj.angle} />
      </mesh> */}
        <EyeMesh position={[0.415, -0.142, 0.459]} scale={0.017} angle={OutlinesObj.angle} thickness={0.1} />;
        <EyeMesh position={[0.397, -0.097, 0.194]} scale={0.017} angle={OutlinesObj.angle} thickness={0.1} />;
        {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere006.geometry}
        material={materials["eyedark.002"]}
        position={[0.415, -0.142, 0.439]}
        scale={0.017}
      >
        <Outlines thickness={ 0.1} angle={OutlinesObj.angle} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere007.geometry}
        material={materials["eyedark.003"]}
        position={[0.397, -0.097, 0.194]}
        scale={0.017}
      >
        <Outlines thickness={ 0.1} angle={OutlinesObj.angle} />
      </mesh> */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={materials.line}
          position={[0.21, 0.144, -0.325]}
          rotation={[0, -0.039, -0.258]}
          scale={[1, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019.geometry}
          material={materials["line.001"]}
          position={[0.155, 0.13, -0.51]}
          rotation={[-1.71, -0.158, 1.125]}
          scale={[1, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020.geometry}
          material={materials["line.002"]}
          position={[0.176, 0.131, -0.143]}
          rotation={[1.387, 0.114, 0.803]}
          scale={[1, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube021.geometry}
          material={materials["line.003"]}
          position={[0.194, 0.364, -0.465]}
          rotation={[-0.009, -0.035, -0.481]}
          scale={[0.505, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube022.geometry}
          material={materials["line.004"]}
          position={[0.393, -0.288, 0.244]}
          rotation={[-2.973, -0.044, 0.004]}
          scale={[0.496, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube023.geometry}
          material={materials.rickhair}
          position={[0.151, 0.782, -0.31]}
          rotation={[-3.054, 0, 0]}
          scale={[0.444, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube024.geometry}
          material={materials["line.006"]}
          position={[0.178, 0.654, -0.257]}
          rotation={[2.343, 0.162, 0.164]}
          scale={[0.618, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube025.geometry}
          material={materials["line.007"]}
          position={[0.174, 0.67, -0.437]}
          rotation={[2.851, -0.147, -0.217]}
          scale={[0.618, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube026.geometry}
          material={materials.line}
          position={[0.148, 0.782, -0.31]}
          rotation={[-3.054, 0, 0]}
          scale={[0.091, 1.474, 1.113]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube027.geometry}
          material={materials["belt yellow"]}
          position={[0.104, -1.24, -0.452]}
          rotation={[0.025, -0.158, 0.16]}
          scale={[0.007, 0.095, 0.095]}>
          <Outlines thickness={0.02} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube028.geometry}
          material={materials["Material.002"]}
          position={[0.102, -1.24, -0.452]}
          rotation={[0.025, -0.158, 0.16]}
          scale={[0.007, 0.095, 0.095]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube029.geometry}
          material={materials["line.005"]}
          position={[0.095, -1.253, -0.559]}
          rotation={[1.285, -0.273, -0.078]}
          scale={[0.401, 0.531, 0.401]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube030.geometry}
          material={materials["line.008"]}
          position={[0.082, -1.254, -0.414]}
          rotation={[2.14, -0.273, -0.078]}
          scale={[0.688, 0.911, 0.688]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube031.geometry}
          material={materials["line.009"]}
          position={[0.062, -1.278, -0.404]}
          rotation={[2.14, -0.273, -0.078]}
          scale={[0.688, 0.911, 0.688]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube032.geometry}
          material={materials["line.010"]}
          position={[0.248, 0.294, -0.346]}
          rotation={[0.082, -0.044, 0.004]}
          scale={[0.496, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube033.geometry}
          material={materials["line.011"]}
          position={[0.393, -0.364, 0.227]}
          rotation={[-2.973, -0.044, 0.004]}
          scale={[0.252, 0.673, 0.508]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube034.geometry}
          material={materials["line.012"]}
          position={[0.422, -0.284, 0.231]}
          rotation={[1.084, -0.044, 0.004]}
          scale={[0.496, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube035.geometry}
          material={materials["line.013"]}
          position={[0.372, -0.407, 0.336]}
          rotation={[-1.597, -0.044, 0.004]}
          scale={[0.252, 0.673, 0.508]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube036.geometry}
          material={materials["line.014"]}
          position={[0.063, -1.425, -0.544]}
          rotation={[3.058, -0.273, -0.078]}
          scale={[0.688, 0.911, 0.688]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube037.geometry}
          material={materials["line.015"]}
          position={[0.197, 0.35, -0.186]}
          rotation={[0.037, -0.377, -0.048]}
          scale={[0.505, 1.324, 1.206]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube038.geometry}
          material={materials["line.016"]}
          position={[0.433, 0.371, 0.534]}
          rotation={[0.984, 0, 0]}
          scale={[0.197, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube039.geometry}
          material={materials.line}
          position={[0.434, 0.394, 0.424]}
          rotation={[0.984, 0.018, 0.012]}
          scale={[0.197, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube040.geometry}
          material={materials["line.018"]}
          position={[0.419, 0.395, 0.359]}
          rotation={[0.984, 0, 0]}
          scale={[0.197, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube041.geometry}
          material={materials.redline}
          position={[0.357, -0.063, 0.442]}
          rotation={[1.26, 0.703, 1.407]}
          scale={[0.618, 1.324, 1]}>
          <Outlines thickness={0.0001} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube042.geometry}
          material={materials.redline}
          position={[0.35, -0.052, 0.511]}
          rotation={[1.865, 0.703, 1.407]}
          scale={[0.618, 1.324, 1]}>
          <Outlines thickness={0.0001} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube043.geometry}
          material={materials.redline}
          position={[0.33, -0.08, 0.556]}
          rotation={[2.398, 0.703, 1.407]}
          scale={[0.618, 1.324, 1]}>
          <Outlines thickness={0.0001} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube044.geometry}
          material={materials.redline}
          position={[0.346, -0.242, 0.45]}
          rotation={[-1.589, 0.722, 1.114]}
          scale={[0.618, 1.324, 1]}>
          <Outlines thickness={0.0001} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube045.geometry}
          material={materials.redline}
          position={[0.346, -0.242, 0.516]}
          rotation={[-1.586, 0.427, 1.108]}
          scale={[0.618, 1.324, 1]}>
          <Outlines thickness={0.0001} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube046.geometry}
          material={materials.redline}
          position={[0.34, -0.029, 0.113]}
          rotation={[1.26, 0.703, 1.407]}
          scale={[0.618, 1.324, 1]}>
          <Outlines thickness={0.0001} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube047.geometry}
          material={materials.redline}
          position={[0.34, -0.005, 0.155]}
          rotation={[1.326, 0.276, 1.27]}
          scale={[0.618, 1.324, 1]}>
          <Outlines thickness={0.0001} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube048.geometry}
          material={materials.redline}
          position={[0.34, -0.004, 0.217]}
          rotation={[1.514, 0.53, 1.567]}
          scale={[0.618, 1.324, 1]}>
          <Outlines thickness={0.0001} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube049.geometry}
          material={materials.redline}
          position={[0.336, -0.155, 0.123]}
          rotation={[-1.188, 0.427, 1.573]}
          scale={[0.618, 1.324, 1]}>
          <Outlines thickness={0.0001} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube050.geometry}
          material={materials.redline}
          position={[0.337, -0.184, 0.171]}
          rotation={[-1.306, 0.385, 1.078]}
          scale={[0.618, 1.324, 1]}>
          <Outlines thickness={0.0001} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube051.geometry}
          material={materials.redline}
          position={[0.335, -0.18, 0.219]}
          rotation={[-1.424, 0.602, 1.381]}
          scale={[0.618, 1.324, 1]}>
          <Outlines thickness={0.0001} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={materials.line}
          position={[0.346, -0.132, 0.464]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.232}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane004.geometry}
          material={materials["line.017"]}
          position={[0.316, -0.072, 0.147]}
          rotation={[0, 0.714, -Math.PI / 2]}
          scale={[0.244, 0.19, 0.19]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube052.geometry}
          material={materials["line.020"]}
          position={[0.333, 0.029, 0.26]}
          rotation={[-2.87, 0, 0]}
          scale={[0.618, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube053.geometry}
          material={materials["line.021"]}
          position={[0.333, -0.081, 0.589]}
          rotation={[-2.87, 0, 0]}
          scale={[0.618, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube054.geometry}
          material={materials["line.022"]}
          position={[0.351, 0.025, 0.418]}
          rotation={[0.984, 0, 0]}
          scale={[0.618, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube055.geometry}
          material={materials["line.023"]}
          position={[0.335, 0.081, 0.335]}
          rotation={[0.984, 0, 0]}
          scale={[0.618, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube056.geometry}
          material={materials["line.024"]}
          position={[0.244, -0.067, 0.677]}
          rotation={[0.984, 0, 0]}
          scale={[0.618, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube057.geometry}
          material={materials["line.025"]}
          position={[0.365, -0.342, 0.431]}
          rotation={[-0.879, 0, 0]}
          scale={[0.618, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube058.geometry}
          material={materials["line.026"]}
          position={[0.358, -0.323, 0.054]}
          rotation={[-0.879, 0, 0]}
          scale={[0.618, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube059.geometry}
          material={materials["line.027"]}
          position={[0.387, -0.336, 0.387]}
          rotation={[-0.463, -0.501, -0.289]}
          scale={[0.431, 0.923, 0.697]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube060.geometry}
          material={materials["line.028"]}
          position={[0.311, -0.349, 0.542]}
          rotation={[-1.794, -0.459, -0.583]}
          scale={[0.431, 0.923, 0.697]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube061.geometry}
          material={materials.greenthing}
          position={[0.214, 0.106, -0.328]}
          rotation={[-0.034, -0.302, -0.432]}
          scale={[0.505, 1.324, 1]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube062.geometry}
          material={materials.greenthing}
          position={[0.179, 0.03, -0.387]}
          rotation={[0.535, -0.823, -0.637]}
          scale={[0.334, 0.433, 0.17]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube063.geometry}
          material={materials.greenthing}
          position={[0.187, 0.046, -0.263]}
          rotation={[1.549, -1.074, -0.043]}
          scale={[0.433, 0.362, 0.183]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube064.geometry}
          material={materials.line}
          position={[0.187, 0.047, -0.263]}
          rotation={[1.338, -1.201, -0.106]}
          scale={[0.459, 0.386, 0.143]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube065.geometry}
          material={materials["line.032"]}
          position={[0.181, 0.03, -0.386]}
          rotation={[1.139, -1.143, -0.608]}
          scale={[0.459, 0.386, 0.143]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube066.geometry}
          material={materials.line}
          position={[0.214, 0.105, -0.328]}
          rotation={[-0.034, -0.302, -0.432]}
          scale={[0.583, 1.343, 1.132]}></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube067.geometry}
          material={materials.handers}
          position={[0.533, -0.826, -0.078]}
          rotation={[1.159, 0.249, -0.14]}
          scale={[-0.054, -0.189, -0.06]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube068.geometry}
          material={materials["morty socks.002"]}
          position={[0.384, 0.617, 0.693]}
          rotation={[0.706, 0.249, -0.14]}
          scale={[-0.051, -0.179, -0.057]}>
          <Outlines thickness={0.1} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane005.geometry}
          material={materials.manty}
          position={[0.135, -0.491, -0.176]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.326, 1, 0.056]}>
          <Outlines thickness={0.01} angle={OutlinesObj.angle} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane006.geometry}
          material={materials.manty}
          position={[0.182, -0.491, -0.47]}
          rotation={[Math.PI, 0, Math.PI / 2]}
          scale={[0.326, 1, 0.056]}>
          <Outlines thickness={0.01} angle={OutlinesObj.angle} />
        </mesh>
      </group>
    </group>
  )
}
