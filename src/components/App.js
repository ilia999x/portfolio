import * as THREE from "three"
import { Canvas, extend, useFrame, useThree, useLoader } from "@react-three/fiber"
import {
  Sky,
  Environment,
  AccumulativeShadows,
  PerspectiveCamera,
  OrthographicCamera,
  AsciiRenderer,
  RandomizedLight,
  useGLTF,
  Center as CenterY,
  Text3D,
  useTexture,
  Edges,
  OrbitControls,
} from "@react-three/drei"
import { SSAOPass } from "three-stdlib"
import { motion } from "framer-motion"
import React, { Suspense, useState, useRef, useEffect, useCallback, useLayoutEffect, useMemo } from "react"
import { Kubernetes } from "./icons"
import Axios from "axios"
import { RepoCard } from "./repo"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { EffectComposer, Glitch, SSR, GodRays, DepthOfField, Bloom, Noise, Vignette, Outline } from "@react-three/postprocessing"
import { LayerMaterial, Depth, Fresnel, Matcap, Noise as Noises } from "lamina/vanilla"
import { GlitchMode, BlendFunction, Resizer, KernelSize } from "postprocessing" // import { Fade } from 'react-postprocessing'
import { useSpring, animated } from "react-spring"
// import { LightEffectBio, LightEffectBox } from "./box"
import { debounce } from "lodash"
import { Gradient } from "../lib/Gradient"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"
import { StarBace, FinalText } from "./starbace"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import { Engine } from "tsparticles-engine"
import { Main } from "tsparticles"
import { loadLinksPreset } from "tsparticles-preset-links"

extend({ SSAOPass })

export function Overlay() {
  useLayoutEffect(() => {
    const gradient = new Gradient()
    gradient.initGradient("#gradient-canvas")
  }, [])

  return <canvas id="gradient-canvas" data-transition-in />
}

function LanguageBox({ props }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  return (
    <>
      <Box
        justifyContent="center"
        position={"relative"}
        alignItems="center"
        justify="center"
        paddingTop={"40px"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Flex alignItems="center" justify="center">
          <Text
            // top={"50px"}
            position={"relative"}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="0.05em"
            style={{ wordSpacing: "0.1em" }}
            color="white"
            marginLeft={"20px"}>
            Programming Languages
          </Text>
          <Box top={"70px"} position={"absolute"} display={"flex"} w={"25em"} alignItems="center" justify="center">
            <Box
              h={"0.05em"}
              w={isHovered ? "25em" : "3em"}
              bg={isHovered ? "#ffffffff" : "#fa0808ff"}
              transition="width 0.2s ease-in-out,background 0.9s ease-in-out"
              // transform ="rotate(-20deg)"
            />
          </Box>
        </Flex>

        <Flex alignItems="center" justify="center" paddingTop={"10px"}>
          <Box display={"flex"} h={"10em"} alignItems="center" justify="center">
            <Box
              marginLeft={"40px"}
              w={"0.05em"}
              h={isHovered ? "3em" : "0em"}
              bg={isHovered ? "#571b68de" : "#ff0000ff"}
              transition="height 0.2s ease-in-out,background 0.9s ease-in-out"
            />
          </Box>
          {props.map((each) => {
            return (
              <>
                <Tooltip
                  fontFamily="'Exo', sans-serif"
                  backdropFilter="blur(6px)"
                  bgColor={"#38285a71"}
                  border="1 solid #4a4a7cff"
                  // borderWidth={'1px'}
                  borderRadius={"10px"}
                  padding={"20px"}
                  label={
                    <>
                      {each.name}
                      {each.comp}
                    </>
                  }
                  closeDelay={500}>
                  <Box
                    marginLeft={"40px"}
                    w={10}
                    h={10}
                    as={each.icon}
                    color="gray.500"
                    _hover={{
                      boxShadow: "xl",
                      transition: "box-shadow 0.2s ease-in-out",
                      color: "red.500",
                    }}
                    cursor="pointer"
                  />
                </Tooltip>
              </>
            )
          })}
          <Box display={"flex"} h={"10em"} alignItems="center" justify="center">
            <Box
              marginLeft={"40px"}
              w={"0.05em"}
              h={isHovered ? "3em" : "0em"}
              bg={isHovered ? "#571b68de" : "#ff0000ff"}
              transition="height 0.2s ease-in-out,background 0.9s ease-in-out"
            />
          </Box>
        </Flex>

        {/* add more language boxes here */}
      </Box>
    </>
  )
}

function DevBox({ props }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  return (
    <Box position={"absolute"} right={0} justify="center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Box position={"relative"} alignItems="center" justify="center" paddingTop={"10px"}>
        <Flex alignItems="center" justify="center">
          <Text
            // top={"10px"}
            position={"absolute"}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="0.05em"
            style={{ wordSpacing: "0.1em" }}
            color="white"
            marginLeft={"20px"}>
            tools
          </Text>

          <Box top={"30px"} position={"absolute"} display={"flex"} w={"20em"} alignItems="center" justify="center">
            <Box
              h={"0.05em"}
              w={isHovered ? "20em" : "3em"}
              bg={isHovered ? "#ffffffff" : "#fa0808ff"}
              transition="width 0.2s ease-in-out,background 0.9s ease-in-out"
              // transform ="rotate(-20deg)"
            />
          </Box>
        </Flex>

        <Flex alignItems="center" justify="center" paddingTop={"10px"}>
          <Box display={"flex"} h={"10em"} alignItems="center" justify="center">
            <Box
              marginLeft={"10px"}
              marginRight={"10px"}
              w={"0.05em"}
              h={isHovered ? "4em" : "0em"}
              bg={isHovered ? "#571b68de" : "#ff0000ff"}
              transition="height 0.2s ease-in-out,background 0.9s ease-in-out"
              // transform ="rotate(-20deg)"
            />
          </Box>
          {props.map((each) => {
            return (
              <Tooltip
                fontFamily="'Exo', sans-serif"
                backdropFilter="blur(6px)"
                bgColor={"#38285a71"}
                border="1 solid #4a4a7cff"
                // borderWidth={'1px'}
                borderRadius={"10px"}
                padding={"20px"}
                label={
                  <>
                    {each.name}
                    {each.comp}
                  </>
                }>
                <Box
                  marginLeft={"40px"}
                  w={10}
                  h={10}
                  as={each.icon}
                  color="gray.500"
                  _hover={{
                    boxShadow: "xl",
                    transition: "box-shadow 0.2s ease-in-out",
                    color: "red.500",
                  }}
                  cursor="pointer"
                />
              </Tooltip>
            )
          })}
          <Box display={"flex"} h={"10em"} alignItems="center" justify="center">
            <Box
              marginLeft={"40px"}
              marginRight={"10px"}
              w={"0.05em"}
              h={isHovered ? "5em" : "0em"}
              bg={isHovered ? "#571b68de" : "#ff0000ff"}
              transition="height 0.2s ease-in-out,background 0.9s ease-in-out"
              // transform ="rotate(-20deg)"
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
const repos = [
  { name: "React-Graphene-Django-Boilerplate", array: ["Django", "Graphql", "React"] },
  // { name: "Full-stack-React-django-boilerplate", array: ["Django"] },
  // { name: "Full-stack-React-django-boilerplate", array: ["Django"] },
  // add more repositories here #3d585a62 #4e2f482c #1a333562 #532248f #b0f8ff62
]

async function fetchGithubData() {
  const baseURL = (repo) => `https://api.github.com/repos/elijah999x/${repo}`
  const requests = repos.map((repo) => Axios.get(baseURL(repo.name)))
  const responses = await Promise.all(requests)
  const data = responses.map((res) => res.data)
  return data
}

const customFonts = {
  fonts: {
    heading: "'Azonix', monospace",
    body: "'Roboto', sans-serif",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  // Import the custom font here
  styles: {
    global: {
      "@font-face": [
        {
          fontFamily: "'Get Schwifty'",
          src: "url('/fonts/get_schwifty.ttf') format('truetype')",
          fontStyle: "normal",
          // fontDisplay: "swap",
        },
        {
          fontFamily: "'Azonix'",
          src: "url('/fonts/Azonix.otf') format('truetype')",
          fontWeight: "normal",
          fontStyle: "normal",
          fontDisplay: "swap",
        },
        {
          fontFamily: "'Exo'",
          src: "url('/fonts/Exo-Regular.ttf') format('truetype')",
          // fontWeight: "normal",
          fontStyle: "normal",
          // fontDisplay: "swap",
        },
        {
          fontFamily: "'Intro Inline'",
          src: "url('/fonts/Intro-inline.otf') format('truetype')",
          fontWeight: "normal",
          fontStyle: "normal",
          fontDisplay: "swap",
        },
        ,
        {
          fontFamily: "'Intro'",
          src: "url('/fonts/Intro.otf') format('truetype')",
          fontWeight: "normal",
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      ],
      body: {
        overflow: "hidden",
        backgroundColor: "#4c434d",
      },
    },
  },
}

const theme = extendTheme(customFonts)

const App = () => {
  const screenHeight = window.innerHeight
  const screenWidth = window.innerWidth

  const [texts, settexts] = useState([])
  const [Repo, setRepo] = useState("")
  const [getoptions, setOptions] = useState()
  const TotalPage = 5
  const [page, setPage] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingwroclaw, setIsLoadingwroclaw] = useState(true)

  const handleRepoSelect = (name) => {
    if (!name) {
      setRepo([])
      return
    }
    const repo = repos.find((r) => r.name === name)
    if (repo) {
      setRepo(repo.array)
    } else {
      console.log(`No repository found with name "${nameToFind}"`)
    }
  }

  const chartdata = {
    left: 120,
  }

  const bgColor = {
    light: "gray.100",
    dark: "gray.800",
  }
  const backcolor = "#1a2026 "

  const [repoData, setRepoData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const data = await fetchGithubData()
      setRepoData(data)
    }

    if (repoData.length === 0) {
      fetchData()
    }
  }, [])

  function ScrollBox() {
    const setvalue = screenHeight
    const [isHovered, setIsHovered] = useState("")

    const handleMouseEnter = (id) => {
      setIsHovered(id.target.id)
      // console.log(id.target.id)
    }

    const handleMouseLeave = (id) => {
      setIsHovered("")
    }
    const handleScrollUp = () => {
      if (page != 1) {
        window.scrollBy(0, -setvalue) // adjust the scroll amount as needed
        const currentPage = page - 1
        setPage(currentPage)
        setIsLoading(true)
      }
    }

    const handleScrollDown = () => {
      if (TotalPage > page) {
        window.scrollBy(0, setvalue) // adjust the scroll amount as needed
        const currentPage = page + 1
        setPage(currentPage)
        setIsLoading(true)
      }
    }
    const HoverColor = "#313035"
    return (
      <Box position="fixed" bottom="0" right="0" display="flex" flexDirection="column" alignItems="center" zIndex="1">
        <IconButton
          height="90px"
          width="100px"
          id="upper"
          icon={<FaArrowUp size={isHovered === "upper" ? "30px" : "15px"} color={page == 1 ? "#a0a0a0" : isHovered == "upper" ? "#ececec" : "#000000"} />}
          aria-label="Scroll up"
          onClick={handleScrollUp}
          onMouseEnter={(e) => handleMouseEnter(e)}
          onMouseLeave={(e) => handleMouseLeave(e)}
          // mb={20}
          border={isHovered === "upper" ? "2px solid #26292bff" : "none"}
          _hover={{
            boxShadow: "xl",
            transition: "box-shadow 0.2s ease-in-out",
            bg: HoverColor,
          }}
          borderRadius={"0"}
          opacity={page == 1 ? "0.2" : "1"}
          bg={page == 1 ? "#6d6161" : "#ffffff"}
          backdropFilter="blur(10px)"
        />

        <IconButton
          height="90px"
          width="100px"
          borderRadius={0}
          id="lower"
          opacity={page == 5 ? "0" : "1"}
          onMouseEnter={(e) => handleMouseEnter(e)}
          onMouseLeave={(e) => handleMouseLeave(e)}
          border={isHovered === "lower" ? "2px solid #26292bff" : "none"}
          _hover={{
            boxShadow: "xl",
            transition: "box-shadow 0.2s ease-in-out",
            color: "red.500",
            bg: HoverColor,
          }}
          icon={<FaArrowDown size={isHovered === "lower" ? "30px" : "15px"} color={page == 5 ? "#c4c4c4" : isHovered == "lower" ? "#ececec" : "#000000"} />}
          aria-label="Scroll down"
          onClick={handleScrollDown}
          bg={page == 5 ? "#6d6161" : "#ffffff"}
          backdropFilter="blur(10px)"
        />
      </Box>
    )
  }

  function onLoad(spline) {
    console.log("loaded")
    setIsLoading(false)
  }
  function onLoadwroclaw(spline) {
    console.log("loaded")
    setIsLoadingwroclaw(false)
  }

  useLayoutEffect(() => {
    const gradient = new Gradient()
    gradient.initGradient("#gradient-canvas")
  }, [])

  function CameraMove() {
    const camera = useRef()
    return <PerspectiveCamera makeDefault ref={camera} fov={2} position={[0, 0, 1100]} />
  }

  function Get3dText(props) {
    const refGlub = useRef()
    const reftext = useRef()
    const [isHovered, setIsHovered] = useState(false)
    var calsize = 2 * (screenWidth / screenHeight)

    return (
      <group ref={refGlub} {...props} dispose={null}>
        <Text3D
          ref={reftext}
          curveSegments={2}
          bevelEnabled
          bevelSize={0.1}
          bevelThickness={0.1}
          height={1}
          lineHeight={4}
          letterSpacing={1}
          size={calsize}
          font={`${process.env.PUBLIC_URL}/fonts/Azonix_Regular.json`}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}>
          {`Hello World\n`}
          {`I'AM ELIJAH`}
          <meshPhysicalMaterial
            color="white"
            roughness={0.3}
            ior={1.8}
            metalness={1}
            transparent
            opacity={1}
            transmission={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Text3D>
      </group>
    )
  }

  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  return (
    <Box overflow="hidden">
      <ChakraProvider theme={theme}>
        <ScrollBox />
        <Box direction="column" height="100%" position={"relative"}>
          <Box width={"100%"} height={screenHeight}>
            <canvas id="gradient-canvas" data-transition-in style={{ width: "101%", height: screenHeight + 10, top: -10 }} />

            {page == 1 ? (
              <>
                <Canvas>
                  <color attach="background" args={["black"]} />

                  <CameraMove />
                  {/* <PerspectiveCamera makeDefault fov={70} position={[0, 0, 800]} /> */}

                  <AccumulativeShadows temporal frames={100} alphaTest={0.9} color="#3ead5d" colorBlend={1} opacity={0.8} scale={20}>
                    <RandomizedLight radius={10} ambient={0.5} intensity={1} position={[2.5, 8, -2.5]} bias={0.001} />
                  </AccumulativeShadows>

                  <CenterY rotation={[0, 0, 0]}>
                    <Get3dText />
                  </CenterY>
                  <Environment
                    excludeFromPostProcessing={true}
                    background={false}
                    files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
                    blur={1}
                  />
                  <AsciiRenderer fgColor="#31d100" bgColor="transparent" />
                </Canvas>
              </>
            ) : (
              <></>
            )}
          </Box>
          <Box bg={backcolor} width={"100%"} height={screenHeight}>
            {page == 2 ? (
              <Flex display="flex" flexDirection="row" width={"100%"} height={screenHeight}>
                <Box bg={backcolor} width={"50%"} paddingTop={"10%"} paddingBottom={"5%"}>
                  {isLoading ? (
                    // show loading screen while content is loading
                    <Center left="50%" top="50%" width={"10%"} position=" relative" bg="#ffee00ff" h="5%" color="white">
                      <Text fontWeight="bold" color="#050505ff" margin={"20px"}>
                        Loading...
                      </Text>
                    </Center>
                  ) : (
                    <></>
                  )}
                </Box>
                {/* <LightEffectBio /> */}
              </Flex>
            ) : (
              <></>
            )}
          </Box>
          <Box display={"flex"} bg={backcolor} width={"100%"} height={screenHeight}>
            {page == 3 ? (
              <>
                  {isLoadingwroclaw ? (
                    // show loading screen while content is loading
                    <Center left="50%" top="50%" width={"10%"} position=" relative" bg="#ffee00ff" h="5%" color="white">
                      <Text fontWeight="bold" color="#050505ff" margin={"20px"}>
                        Loading...
                      </Text>
                    </Center>
                  ) : (
                    <Box position="absolute" left="5%" height="200px" padding="30px">
                      {/* <LightEffectBox /> */}
                    </Box>
                  )}
              </>
            ) : (
              <></>
            )}
          </Box>
          <Box
            // bg={"#0f1113"}
            bg={`linear-gradient(
              90deg,
              #0f1113 ,
              #1a1d20 50%,
              #0f1113 
            )`}
            // css={{ filter: `blur(${90})` }}
            // animation={`${gradientAnimation} 10s linear infinite`}
            backgroundSize={"200% 100%"}
            width={"100%"}
            height={screenHeight}>
            {page == 4 ? (
              <>

                <Flex mt={"150px"} w="100%" justifyContent="space-between">
                  <Flex justify="left" w={"100%"}>
                  </Flex>
                  <Flex justify="right" marginRight={"50px"} width="60%" marginTop={"40px"}>
                    <Box bgColor={bgColor} p={4} borderRadius="md">
                      <Text fontWeight="bold" textTransform="uppercase" letterSpacing="0.05em" style={{ wordSpacing: "0.1em" }} color={"pink.500"} mb={2}>
                        Github Repositories
                      </Text>
                      <RepoCard handleRepoSelect={handleRepoSelect} repoData={repoData} />
                    </Box>
                  </Flex>
                </Flex>
              </>
            ) : (
              <></>
            )}
          </Box>

          <Box
            display={"flex"}
            // bg={`linear-gradient(0deg, #070709 53%,#0d0c10 69.71%,#0e0d17 70.71%    )`}
            width={"100%"}
            height={screenHeight}>
            {page == 5 ? (
              <>
                <StarBace />
                <Particles
                  id="tsparticles"
                  init={particlesInit}
                  options={{
                    fullScreen: {
                      enable: true,
                      zIndex: -1,
                    },
                    particles: {
                      number: {
                        value: 50,
                        density: {
                          enable: true,
                          value_area: 800,
                        },
                      },
                      color: {
                        value: "#ffffff",
                      },
                      shape: {
                        type: "circle",
                        stroke: {
                          width: 0,
                          color: "#000000",
                        },
                        polygon: {
                          nb_sides: 6,
                        },
                        image: {
                          src: "img/github.svg",
                          width: 100,
                          height: 100,
                        },
                      },
                      opacity: {
                        value: 0.8,
                        random: false,
                        anim: {
                          enable: false,
                          speed: 1,
                          opacity_min: 0.1,
                          sync: false,
                        },
                      },
                      size: {
                        value: 2,
                        random: true,
                        anim: {
                          enable: false,
                          speed: 20,
                          size_min: 0.1,
                          sync: false,
                        },
                      },
                      line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ff94fa",
                        opacity: 1,
                        width: 0.2,
                      },

                      move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        attract: {
                          enable: true,
                          rotateX: 600,
                          rotateY: 1200,
                        },
                      },
                    },

                    interactivity: {
                      events: {
                        onHover: {
                          enable: true,
                          mode: "attract",
                        },
                      },
                      modes: {
                        attract: {
                          distance: 200,
                          speed: 0.8,
                        },
                      },
                    },
                    retina_detect: true,
                    background: {
                      color: "rgb(14, 14, 20)",
                      image: "",
                      position: "50% 50%",
                      repeat: "no-repeat",
                      size: "cover",
                    },
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </ChakraProvider>
    </Box>
  )
}
export default App();