 {/* <Suspense fallback={null}>
            <Canvas shadows dpr={[1, 2]}>
              <ambientLight intensity={1} />
              <EffectComposer> */}
                {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
                {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
                {/* <Noise opacity={0.01} /> */}
                {/* <Outline blur edgeStrength={100} /> */}
                {/* <SSR /> */}
                {/* <Glitch
    delay={[4.5, 15.5]} // min and max glitch delay
    duration={[0.1, 0.5]} // min and max glitch duration
    strength={[0.3, 1.0]} // min and max glitch strength
    mode={GlitchMode.SPORADIC} // glitch mode
    active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
    ratio={0.5} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
  /> */}
  <Vignette eskil={false} offset={0.1} darkness={0.5} />
  </EffectComposer>
  {/* <Environment files="/adamsbridge.hdr" preset="warehouse" strength={0.2} /> */}
  <fog attach="fog" color={backcolor} near={0.1} far={10} />
  <directionalLight intensity={5} angle={0.6} penumbra={10} castShadow shadow-mapSize={[4096, 4096]} position={[0, 1, 1]} />
  <WroclawModel />
  
  {/* <perspectiveCamera makeDefault position={[100, 100,10]} near={0.001} fov= {100} far={1000000}  ref={cameraRef} /> */}
  <CameraAnimation cameraRef={cameraRef} />
  <perspectiveCamera
    position={[-5, 10, 10]}
    fov={35}
    near={1}
    far={100000}
    ref={cameraRef}
    // rotation={[Math.PI / 4, Math.PI / 8, 0]}
    lookAt={[0, 0, 0]}
  />

  {/* <Effects /> */}
  <OrbitControls />
  {/* <color attach="background" args={["#1a202c"]} /> */}
</Canvas>
</Suspense>