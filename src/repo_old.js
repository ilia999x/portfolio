import { Box, Grid, Text, UnorderedList, ListItem, Link, Flex } from "@chakra-ui/react"

import { useState, useEffect, useRef } from "react"

export const RepoCard = ({ repoData, handleRepoSelect }) => {
    const containerRef = useRef(null);
    const [centerIndex, setCenterIndex] = useState(null);
    const selectedRef = useRef(null);
  
    useEffect(() => {
      const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;
  
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const height = container.clientHeight;
  
        // Calculate the index of the centered card based on scroll position
        const newIndex = Math.round((scrollTop / (scrollHeight - height)) * (repoData.length - 1) * 1);
        setCenterIndex(newIndex);
      };
  
      const container = containerRef.current;
      if (container) {
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
      }
    }, [containerRef, repoData]); 
  
    useEffect(() => {
      if (centerIndex != null) {
        const selected = selectedRef.current;
        if (selected) {
          selected.scrollIntoView({  behavior: "smooth", block: "end", inline: "nearest" });
        }
      }
    }, [centerIndex]);

    return (
        <Box height="80%" overflowY="scroll" css={{ "&::-webkit-scrollbar": { display: "none" } }} ref={containerRef}>
        <Grid templateColumns="1fr" gap={6}>
          {repoData.map((repo, index) => {
            const languageColor = repo.language ? `#${repo.language.color}` : "gray.500"
            const isCenter = index === centerIndex
            const isCenterMinus = index === centerIndex-1
            const isCenterPlus = index === centerIndex+1
            const opacity = isCenter ? 1 : ( isCenterMinus || isCenterPlus? 0.1:0)
            const scale = isCenter ? 0.8 : ( isCenterMinus || isCenterPlus? 0.7:0.6) // Scale non-centered items down
            const boxShadow = isCenter
              ? "0 16px 70px -18.125px rgb(255, 255, 255)"
              : "0 8px 40px -12px rgba(0,0,0,0.3)"
            const transition =
              "opacity 0.3s ease-in-out, flex-grow 0.3s ease-in-out, transform 0.3s ease-in-out"
  
            return (
              <Flex
                key={index}
                onClick={() => setCenterIndex(index)}
                direction="column"
                display={"inline-flex"}
                alignItems="stretch"
                bg="white"
                // width={isCenter ? "100%" : "90%"} // Adjust width based on whether item is centered
                maxWidth="100%"
                boxShadow={boxShadow}
                borderRadius=".625rem!important"
                transition={transition}
                minHeight="270px"
                opacity={opacity}
                flexGrow={isCenter ? 0.9 : 0.7} // Adjust flexGrow based on whether item is centered
                transform={`scale(${scale})`} // Scale non-centered items down
                _hover={{ boxShadow: "0 16px 70px -18.125px rgb(255, 255, 255)" }}
              >
              <Box p={4}>
                
                <Link href={repo.html_url} color="purple.500" isExternal>
                  <Text fontWeight="bold" mb={2}>
                    {repo.name}
                  </Text>
                </Link>
                <Text fontSize="sm" color={languageColor} mb={2}>
                  {repo.language || "Unknown"}
                </Text>
                <Text fontSize="md">{repo.description || "No description."}</Text>
              </Box>
              <Box borderTop="1px solid" borderColor="gray.200" p={4}>
            <UnorderedList listStyleType="none" p={0} m={0} display="flex" justifyContent="space-between">
              <ListItem>
                <i className="far fa-star" style={{ marginRight: "4px" }} />
                {repo.stargazers_count}
              </ListItem>
              <ListItem>
                <i className="far fa-code-branch" style={{ marginRight: "4px" }} />
                {repo.forks_count}
              </ListItem>
              <ListItem>
                <i className="far fa-eye" style={{ marginRight: "4px" }} />
                {repo.watchers_count}
              </ListItem>
            </UnorderedList>
          </Box>
        </Flex>
      )
    })}
  </Grid>
</Box>)
}

// <Canvas>
//                   <color attach="background" args={["black"]} />

//                   <CameraMove />
//                   {/* <PerspectiveCamera makeDefault fov={70} position={[0, 0, 800]} /> */}

//                   <AccumulativeShadows temporal frames={100} alphaTest={0.9} color="#3ead5d" colorBlend={1} opacity={0.8} scale={20}>
//                     <RandomizedLight radius={10} ambient={0.5} intensity={1} position={[2.5, 8, -2.5]} bias={0.001} />
//                   </AccumulativeShadows>

//                   <CenterY rotation={[0, 0, 0]}>
//                     <Get3dText />
//                   </CenterY>
//                   <Environment
//                     excludeFromPostProcessing={true}
//                     background={false}
//                     files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
//                     blur={1}
//                   />
//                   <AsciiRenderer fgColor="#000000" bgColor="transparent" />
//                 </Canvas>
