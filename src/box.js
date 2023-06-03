import { Box, Flex, UnorderedList, Center, Text, useMediaQuery } from "@chakra-ui/react"
import React, { Suspense, useState, useRef, useEffect, useCallback } from "react"

export function LightEffectBio({ children }) {
  const [isSmallerThan800] = useMediaQuery("(max-width: 1200px)")

  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event
    setMousePos({ x: clientX - 100, y: clientY - 100 })
  }

  return (
    <Box
      maxWidth="40%"
      h="100%"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}>
      <Flex
        css={{ cursor: "default" }}
        direction="column"
        display={"inline-flex"}
        alignItems="stretch"
        // width={isCenter ? "100%" : "90%"} // Adjust width based on whether item is centered
        maxWidth="100%"
        minHeight="270px"
        border="1px solid #35586a55"
        borderRadius="4px"
        top={"30%"}
        position="relative">
          <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          // filter={'blur(3px)'}
          backgroundClip={"padding-box"}
        >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          borderRadius="4px"
          style={{
            border: `1px solid transparent`,
            backgroundImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(24, 93, 120, 0.377) 0%, rgba(255, 255, 255, 0) 80%)`,
            backgroundClip: "padding-box",
            transition: "border 0.3s ease-in-out",
            opacity: isHovered ? 1 : 0.7,
          }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          borderRadius="4px"
          h="100%"
          style={{
            border: `1px solid transparent`,
            backgroundImage: `radial-gradient(circle at ${mousePos.x - 500}px ${
              mousePos.y - 700
            }px, rgba(250, 0, 250, 0.364) 0%, rgba(255, 255, 255, 0) 80%)`,
            backgroundClip: "padding-box",
            transition: "border 0.3s ease-in-out",
            opacity: isHovered ? 1 : 0.7,
          }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          borderRadius="4px"
          h="100%"
          style={{
            border: `1px solid transparent`,
            backgroundImage: `radial-gradient(circle at ${mousePos.x - 600}px ${mousePos.y - 900}px, rgba(6, 252, 80, 0.404) 0%, rgba(255, 255, 255, 0) 100%)`,
            backgroundClip: "padding-box",
            transition: "border 0.3s ease-in-out",
            opacity: isHovered ? 1 : 0.7,
          }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          borderRadius="4px"
          h="100%"
          style={{
            border: `1px solid transparent`,
            backgroundImage: `radial-gradient(circle at ${mousePos.x - 800}px ${
              mousePos.y + 200
            }px, rgba(79, 0, 116, 0.171) 0%, rgba(4, 126, 14, 0.548) 130%)`,
            backgroundClip: "padding-box",
            transition: "border 0.3s ease-in-out",
            opacity: isHovered ? 1 : 0.7,
          }}
        />
        </Box>
        
        <Box position="relative" top="0" left="0" w="100%" h="100%" 
        // backdropFilter="blur(60px)" 
        p={4} border="1px solid #1e2224ff" borderRadius="4px">
          <Text fontFamily="'Get Schwifty', sans-serif" fontSize={{ base: "sm", sm: "xl", md: "4xl" }} color="#1add62" textAlign="center" lineHeight="1.5">
            Welcome to my portfolio!
          </Text>
          <br />
          <Text
            lineHeight="2"
            userSelect="none"
            fontSize={isSmallerThan800 ? "xl" : "2xl"}
            letterSpacing="0.05em"
            color="white"
            textAlign="center"
            fontFamily="'Exo',sans-serif">
            I am a 24-year-old Full Stack Developer with a passion for creating innovative solutions <br /> with 2+ years of experience in the
            industry, Proficient in Front End and client-side development <br />I have gained valuable skills and knowledge in a range of technologies, fimilar with Desktop or mobile application development, good knowledge in 3D or 2D graphics.
            <br /> I am constantly inspired to work with new technologies, gain a better understanding of them to create high-quality products
            that meet business standards.
          </Text>
          <br />
          
        </Box>
      </Flex>
    </Box>
  )
}
export function LightEffectBox({ children }) {
  const [isSmallerThan800] = useMediaQuery("(max-width: 1200px)")
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event
    setMousePos({ x: clientX - 100, y: clientY - 100 })
  }
  const backgroundPosition = `${mousePos.x}px ${mousePos.y}px`
  return (
    <Box
      w="100%"
      h="100%"
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      _hover={{
        border: "1px solid ",
        borderRadius: "80px",
        borderImage: `radial-gradient(circle at ${backgroundPosition}, rgba(194, 255, 255, 0.664) 0%, rgba(255, 255, 255, 0) 50%)`,
        borderImageSlice: "1",
        transition: "border 0.3s ease-in-out;",
      }}
      // transition="all 0.3s ease-in-out"
      // transform={isHovered ? "scale(0.95)" : "none"}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        // filter={`blur(${15})`}
        style={{
          border: `1px solid transparent`,
          backgroundImage: `radial-gradient(circle at ${backgroundPosition}, rgba(69, 162, 199, 0.192) 0%, rgba(255, 255, 255, 0) 70%)`,
          backgroundClip: "padding-box",
          transition: "border 0.3s ease-in-out",
          opacity: isHovered ? 1 : 0,
        }}
      />
      <Text
        fontSize="3xl"
        padding={10}
        color="white"
        userSelect="none"
        textAlign="center"
        lineHeight="1.5"
        zIndex={999}
        textTransform="uppercase"
        fontFamily="'Courier New', monospace"
        transform={isHovered ? "scale(0.9)" : "none"}
        transition="all 0.3s ease-in-out">
        my currently living place is wroclaw ❤️
      </Text>
      {children}
    </Box>
  )
}
