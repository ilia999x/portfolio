import { Box, Text, useMediaQuery , Center} from "@chakra-ui/react"
import React, { Suspense, useState, useRef, useEffect, useCallback } from "react"
import { keyframes } from "@emotion/react"
import { ReactComponent as Rocket_pad } from "./icons/Rocket_pader.svg"
import Starship from "./icons/starship.png"

export function StarBace(params) {
  const [isSmallerThan800] = useMediaQuery("(max-width: 1200px)")
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event
    setMousePos({ x: clientX - 100, y: clientY - 100 })
  }
  const backgroundPosition = `${mousePos.x}px ${mousePos.y}px`

  return (
    <>
      <Box onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onMouseMove={handleMouseMove} position="relative" display={"flex"}>
        <Box
          position="relative"
          // top="0"
          display={"flex"}
          w="100%"
          h="100%">
          <FinalText />
          <RocketAnim />
        </Box>
      </Box>
    </>
  )
}
function Spriter(props) {
  const SPRITE_IMAGE = "/fire1.png"
  const SPRITE_WIDTH = 83
  const SPRITE_HEIGHT = 167
  const FRAME_RATE = 0.01
  const TOTAL_FRAMES = 3

  const SPRITE_SHEET_STYLE = {
    width: SPRITE_WIDTH,
    height: SPRITE_HEIGHT,
    backgroundImage: `url(${SPRITE_IMAGE})`,
    backgroundRepeat: "no-repeat",
  }

  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrame((frame) => (frame + 1) % TOTAL_FRAMES)
    }, FRAME_RATE)

    return () => clearInterval(intervalId)
  }, [])
  return (
    <Box w={SPRITE_WIDTH} h={SPRITE_HEIGHT} style={{ left: props.left }} position="relative">
      <Box
        sx={{
          ...SPRITE_SHEET_STYLE,
          backgroundPosition: `${-frame * SPRITE_WIDTH}px 0`,
        }}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </Box>
  )
}

export function RocketAnim(params) {
  // const [pos, setPos] = useState(0)

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setFrame((frame) => (frame + 1) % 3)
  //   }, 10)

  //   return () => clearInterval(intervalId)
  // }, [])
  const MoveUp = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(20px); }
  100% { transform: translateY(0); }
`
  const RotatePos = keyframes`
0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`
const [isLoading, setIsLoading] = useState(true);

const handleImageLoad = () => {
  setIsLoading(false);
};
const LoadingComponent = () => {
  return (
    <Center left="50%" top="50%" width={"10%"} position=" relative" bg="#ffee00ff" h="5%" color="white">
                      <Text fontWeight="bold" color="#050505ff" margin={"20px"}>
                        Loading...
                      </Text>
                    </Center>
  );
};
  return (
    <Box w={"50%"} h={"100%"} position="relative">
      <Box position="relative" top={"20%"} left={"20%"}>
        <Box
          // rocket and fire
          display={"flex"}
          position="absolute"
          animation={`${MoveUp}  10s ease-in-out infinite`}
          top={0}
          left={0}
          zIndex={3}>
          <div style={{ marginLeft: "135px", width: 300, height: 400, cursor: "pointer", zIndex: 3 }}>
            {isLoading && <LoadingComponent />}
            <img src={'https://storage.googleapis.com/internalt/starship.png'} alt="Starship" onLoad={handleImageLoad} style={{ display: isLoading ? "none" : "block" }} />
          </div>
          <Box position="absolute" top={450} left={230}>
            <Spriter />
          </Box>
          <Box position="absolute" top={450} left={260}>
            <Spriter />
          </Box>
          {/* <Box position="absolute" top={450} left={280} zIndex={6}>
            <SpriterSmoke />
          </Box> */}
        </Box>

        <Box position="absolute" top={360} left={0}>
          <Box marginLeft={"40px"} transform="rotateX(80deg)">
            <Box style={{ opacity: 0.2 }} w={500} h={500} as={Rocket_pad} animation={`${RotatePos} 15s linear infinite`} cursor="pointer" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export function FinalText({ children }) {
  const color_text = "#b3b3b3"
  return (
    <Box w="50%" h="100%" position="relative">
      <Box
        w="80%"
        h="100%"
        borderRight="1px solid #53535352"
        bg="#322c3352"
        position="relative"
        overflow="hidden"
        boxSizing="border-box"
        backdropFilter="blur(5px)"
        padding={30}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <Text
          fontSize={{ base: "sm", sm: "l", md: "2xl" }}
          padding={4}
          color={color_text}
          marginTop="30px"
          userSelect="none"
          textAlign="center"
          lineHeight="1.3"
          zIndex={999}
          fontFamily="'Exo',sans-serif"
          textTransform="uppercase"
          letterSpacing="0.05em"
          fontWeight={100}
          transition="all 0.3s ease-in-out">
          As someone who is passionate about programming, I have come to understand the incredible amount of detail that goes into developing software. It's a
          field that constantly challenges you to think critically, be creative, and continually learn new things.
        </Text>
        <Text
          fontSize={{ base: "sm", sm: "l", md: "2xl" }}
          marginTop={"30px"}
          padding={4}
          color={color_text}
          userSelect="none"
          textAlign="center"
          lineHeight="1.3"
          zIndex={999}
          fontFamily="'Exo',sans-serif"
          textTransform="uppercase"
          letterSpacing="0.05em"
          fontWeight={100}
          transition="all 0.3s ease-in-out">
          I am still exploring the many facets of programming, but I am want to becoming a skilled programmer. I have come to appreciate the importance of
          writing efficient and effective code, debugging and troubleshooting, and staying up-to-date with the latest programming languages and tools.
        </Text>
        <Text
          fontSize={{ base: "sm", sm: "l", md: "2xl" }}
          padding={4}
          color={color_text}
          userSelect="none"
          textAlign="center"
          lineHeight="1.3"
          zIndex={999}
          fontFamily="'Exo',sans-serif"
          letterSpacing="0.05em"
          textTransform="uppercase"
          marginTop={"30px"}
          fontWeight={100}
          transition="all 0.3s ease-in-out">
          Every day, I am inspired to explore more in programming, driven by the desire to create innovative solutions for complex problems. I recognize that
          the journey to becoming a great programmer is not an easy one, but it is one that I am willing to undertake.
        </Text>
        <Text
          marginTop={"30px"}
          fontSize={{ base: "sm", sm: "l", md: "2xl" }}
          padding={4}
          color={color_text}
          userSelect="none"
          textAlign="center"
          lineHeight="1.3"
          zIndex={999}
          fontFamily="'Exo',sans-serif"
          textTransform="uppercase"
          letterSpacing="0.05em"
          fontWeight={100}
          // transform={isHovered ? "scale(0.9)" : "none"}
          transition="all 0.3s ease-in-out">
          I am excited to continue to research and learn more about programming, as I know that this field holds incredible potential for me and for the world
          at large. The possibilities for what we can achieve with software are endless, and I am committed to being a part of this exciting and ever-evolving
          industry.
        </Text>
        {children}
      </Box>
    </Box>
  )
}
