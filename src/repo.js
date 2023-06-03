import { Box, Grid, Text, UnorderedList, useBreakpointValue, ListItem, Link, Flex, useColorModeValue } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import { keyframes } from "@emotion/react"

export const RepoCard = ({ repoData, handleRepoSelect }) => {
  const containerRef = useRef(null)
  const [centerIndex, setCenterIndex] = useState(null)
  const selectedRef = useRef(null)
  const fontSize = useBreakpointValue({ base: "sm", md: "md" })

  const FunctionIndex = (index, name) => {
    if (centerIndex == index) {
      setCenterIndex(null)
      handleRepoSelect(null)
    } else {
      setCenterIndex(index)
      handleRepoSelect(name)
    }
  }
  // const handlearray = () => {
  //   handleRepoSelect(repoData.name)
  // }
  return (
    <Box height="70%" css={{ "&::-webkit-scrollbar": { display: "none" } }} ref={containerRef}>
      <Grid templateColumns="40% 40%" gap={10}>
        {repoData.map((repo, index) => {
          const languageColor = repo.language ? `#${repo.language.color}` : "#acdede69"
          const isCenter = index === centerIndex
          const isCenterMinus = index === centerIndex - 1
          const isCenterPlus = index === centerIndex + 1
          const opacity = isCenter ? 1 : isCenterMinus || isCenterPlus ? 0.1 : 0
          const scale = isCenter ? 1 : 0.9
          // Scale non-centered items down
          //   const boxShadow = isCenter ?
          // // `0px -10px 60px rgba(255, 0, 0, 0.966),
          // // //   -10px 0px 60px rgba(0, 0, 255, 0.968),
          // // //    10px 0px 60px rgba(255, 255, 0, 0.972),
          // // //    0px 10px 60px rgba(0,208,255, 0.972)`
          //     : `0px -10px 60px rgba(255, 0, 0, 0.966),
          //   -10px 0px 60px rgba(0, 0, 255, 0.968),
          //    10px 0px 60px rgba(255, 255, 0, 0.972),
          //    0px 10px 60px rgba(0,208,255, 0.972)`
          const boxShadow = isCenter ? "0 0 35px  rgba(64, 26, 147, 0.516)" : "0 0 40px  rgba(190, 59, 59, 0.046)"
          const transition = "background-color 0.5s ease-out ,opacity 0.3s ease-in-out, flex-grow 0.3s ease-in-out, transform 0.3s ease-in-out"
          const rainbowGradient = "linear-gradient(-45deg, rgba(214, 53, 0, 0.308), rgba(255, 1, 98, 0.2), rgba(0,187,255,0.2), rgba(141, 10, 255, 0.2))"
          const gradientAnimation = keyframes`
          0% { background-position: 0% 50%; }
          50% {background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        `
          return (
            <Flex
              key={index}
              css={{ cursor: "default" }}
              onClick={() => {
                FunctionIndex(index, repo.name)
              }}
              direction="column"
              display={"inline-flex"}
              alignItems="stretch"
              animation={`${gradientAnimation} 30s linear infinite, rainbow 10s infinite`}
              bg={isCenter ? rainbowGradient : "#3c49551c"}
              backgroundSize={"500% 500%"}
              //   bg={isCenter ? "#567c7c69" : "#23454569"}
              // width={isCenter ? "100%" : "90%"} // Adjust width based on whether item is centered
              maxWidth="100%"
              boxShadow={boxShadow}
              // borderRadius=".625rem!important"
              transition={transition}
              minHeight="270px"
              // opacity={opacity}
              // backdropFilter="blur(60px)"
              flexGrow={isCenter ? 1.8 : 0.8} // Adjust flexGrow based on whether item is centered
              transform={`scale(${scale})`} // Scale non-centered items down
              _hover={{
                boxShadow: `
                0px -10px 20px rgba(255, 0, 0, 0.03),
              -10px 0px 20px rgba(0, 0, 255, 0.03),
               10px 0px 20px rgba(255, 255, 0, 0.03), 
               0px 10px 20px rgba(0, 208, 255, 0.03)`,
              }}>
                 {/* <Box position={"absolute"} zIndex={1} height={"100%"} width={"100%"} bg={`0px -10px 60px rgba(255, 0, 0, 0.15),
              -10px 0px 60px rgba(0, 0, 255, 0.568),
               10px 0px 60px rgba(255, 255, 0, 0.15), 
               0px 10px 60px rgba(0, 208, 255, 0.15)`}></Box> */}
              <Box p={4}  zIndex={2}>
                <Link href={repo.html_url} color="purple.500" isExternal css={{ cursor: "default" }}>
                  <Text cursor={"pointer"} fontWeight="bold" mb={2}>
                    {repo.name}
                  </Text>
                </Link>
                <Text fontSize="sm" color={"#decc44ff"} mb={2}>
                  {repo.language || ""}
                </Text>
                <Text mb={2} cursor={"pointer"} fontSize="md" color="#c9ebecff" sx={{ userSelect: "none" }}>
                  {repo.description || "No description."}
                </Text>
              </Box>
              <Box zIndex={2} borderTop="1px solid" borderColor="purple.500" p={4} position="related" bottom={0} left={0} width="100%">
                <UnorderedList color={"#b254c4ff"} listStyleType="none" p={0} m={0} display="flex" justifyContent="space-between">
                  <ListItem>
                    <i className="far fa-star" style={{ marginRight: "4px" }} />
                    {repo.stargazers_count} Stars
                  </ListItem>
                  <ListItem>
                    <i className="far fa-code-branch" style={{ marginRight: "4px" }} />
                    {repo.forks_count} Forks
                  </ListItem>
                  <ListItem>
                    <i className="far fa-eye" style={{ marginRight: "4px" }} />
                    {repo.watchers_count} Watchers
                  </ListItem>
                </UnorderedList>
              </Box>
             
            </Flex>
          )
        })}
      </Grid>
    </Box>
  )
}
