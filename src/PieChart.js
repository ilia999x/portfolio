import { Box, Center, Text, Flex, Heading, Tooltip, Button, Icon } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import { debounce } from "lodash";

const PieChart = ({ data, data_central, shine, chartdata, outerRadius, boxwidth, boxheight, width, height, strokeWidth, innerRadius }) => {
  const total = data.reduce((sum, { value }) => sum + value, 0)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  let centerX = windowSize.width / 2
  let centerY = windowSize.height / 2
  const centerperx = windowSize.width / width
  const LabelcenterX = windowSize.width / 2 - width / 2
  const LabelcenterY = windowSize.height / 2 - height / 2
  const resistantOne = windowSize.width / windowSize.width
  let innerRadiusZ = innerRadius * resistantOne
  let outerRadiusZ = outerRadius * resistantOne
  if (windowSize.width / 2 < outerRadius + 30) {
    let scalled = windowSize.width / 2 / outerRadius
    outerRadiusZ = outerRadius * scalled
    innerRadiusZ = innerRadiusZ * scalled
  }
  // if (outerRadius>centerY){
  //   centerY = windowSize.height  - (innerRadius+outerRadius)
  // }
  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 200); // Adjust the debounce delay (in milliseconds) as needed

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel(); // Cancel the debounced function
    };
  }, []);


  const IconWidth = 30
  const IconHeight = 30
  // Calculate the arc angles for each data item
  let angle = -90
  const arcs = data.map((item) => {
    const arc = (item.value / total) * 360

    const endAngle = angle + arc
    const lArcFlag1 = arc > 180 ? 1 : 0
    const lArcFlag2 = 0
    const x1 = centerX + Math.cos((angle * Math.PI) / 180) * innerRadiusZ
    const y1 = centerY + Math.sin((angle * Math.PI) / 180) * innerRadiusZ

    const x2 = centerX + Math.cos((angle * Math.PI) / 180) * outerRadiusZ
    const y2 = centerY + Math.sin((angle * Math.PI) / 180) * outerRadiusZ

    const x3 = centerX + Math.cos((endAngle * Math.PI) / 180) * outerRadiusZ
    const y3 = centerY + Math.sin((endAngle * Math.PI) / 180) * outerRadiusZ

    const x4 = centerX + Math.cos((endAngle * Math.PI) / 180) * innerRadiusZ
    const y4 = centerY + Math.sin((endAngle * Math.PI) / 180) * innerRadiusZ

    // Calculate the distance between the center point and the point on the outer surface
    const midX = (x2 + x3) / 2
    const midY = (y2 + y3) / 2

    // const midX = ((2 * centerX) + Math.cos((angle * Math.PI) / 180) * outerRadius + Math.cos((endAngle * Math.PI) / 180) * outerRadius) / 2;
    // const midY = ((2 * centerY) + Math.sin((angle * Math.PI) / 180) * outerRadius + Math.sin((endAngle * Math.PI) / 180) * outerRadius) / 2;

    const distance = Math.sqrt((midX - centerX) ** 2 + (midY - centerX) ** 2)
    const angleToMid = Math.atan2(midY - centerX, midX - centerX)

    // let pointX = LabelcenterX + Math.cos(angleToMid) * (distance  );
    // let pointY = LabelcenterY + Math.sin(angleToMid) * (distance );

    let pointX = centerX + Math.cos(((angle + arc / 2) * Math.PI) / 180) * outerRadiusZ * strokeWidth - 150
    let pointY = centerY + Math.sin(((angle + arc / 2) * Math.PI) / 180) * outerRadiusZ * strokeWidth - 150

    const dotX = centerX + Math.cos(((angle + arc / 2) * Math.PI) / 180) * outerRadiusZ
    const dotY = centerY + Math.sin(((angle + arc / 2) * Math.PI) / 180) * outerRadiusZ

    if (pointX < 0) {
      pointX = 50
    }
    if (pointY < 0) {
      pointY = 50
    }
    if (pointX > windowSize.width) {
      pointX = windowSize.width - 150
    }
    if (pointY > windowSize.height) {
      pointY = windowSize.height - 40
    }
    const text = item.name
    angle = endAngle
    return { x1, y1, x2, y2, x3, y3, x4, y4, pointX, pointY, dotX, dotY, lArcFlag1, lArcFlag2, text }
  })

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const handleMouseEnter = (index) => {
    setHoveredIndex(index)
  }
  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }
  const [hoveredC, setHoveredC] = useState(false)
  const defender = windowSize.width / width

  return (
    <>
      <svg viewBox={`0 0 ${windowSize.width} ${windowSize.height}`} style={{ maxWidth: `90%`, zIndex: 999 }}>
        {/* <svg viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', zIndex: 999 }}> */}
        {arcs.map(({ pointX, pointY, dotX, dotY, x1, y1, x2, y2, x3, y3, x4, y4, lArcFlag1, lArcFlag2, text }, index) => {
          const resistant = width / 500
          let pointxx = pointX + 15 * defender
          let value = 40
          let DistanceTextvalue = 20
          let downValue = 50
          let Left = windowSize.width / 2 > pointxx ? true : false
          let stroke_width = "10"
          if (!Left) {
            value = -value
          }
          const colorLine = "#1e14257a"
          return (
            <>
              <>
                <path
                  d={`M ${pointxx} ${pointY + DistanceTextvalue} 
            L ${dotX} ${dotY} `}
                  stroke={colorLine}
                  strokeWidth={stroke_width}
                  filter={
                    hoveredIndex === index
                      ? "drop-shadow(0 0 80px #ffdcfdfb) brightness(120%) saturate(200%)"
                      : "drop-shadow(0 0 5px #31113aff) brightness(100%) saturate(100%)"
                  }>
                  {hoveredIndex === index ? (
                    <animate attributeName="stroke" dur="8s" values="#4e2f482c" repeatCount="indefinite" />
                  ) : (
                    <></>
                  )}
                </path>
                <text
                  fill={hoveredIndex === index ? "#c493ff" : "#ffffff"}
                  filter={
                    hoveredIndex === index
                      ? "drop-shadow(0 0 10px #ff03bcc1) brightness(100%) saturate(110%)"
                      : "drop-shadow(0 0 5px #cd03ff64) brightness(100%) saturate(100%)"
                  }
                  x={pointxx}
                  y={pointY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={`${7 * defender}px`}>
                  {data[index].name}
                </text>
              </>
              <g
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{ position: "relative", right: "400px", zIndex: 999 }}
                filter={
                  hoveredC ? "drop-shadow(0 0 2px #ff03bc12) brightness(100%) saturate(110%)" : "drop-shadow(0 0 0px #cd03ff00) brightness(100%) saturate(100%)"
                }>
                <path
                  // backdropFilter="blur(60px)" 
                  fill={hoveredIndex === index ? "#44444d" : data[index].color}
                  fillOpacity={hoveredIndex === index || hoveredC ? 0.2 : 0.5}
                  strokeOpacity={hoveredIndex === index ? 0.2 : hoveredC ? 0.9 : 0.5}
                  filter={hoveredIndex === index ? "drop-shadow(0 0 20px #0000ffff)" : "drop-shadow(0 0 8px #8000ffdb)"}
                  d={`
              M ${x1}, ${y1}
              L ${x2},${y2}
              A ${outerRadiusZ},${outerRadiusZ} 0 ${lArcFlag1} 1 ${x3},${y3}
              L ${x4},${y4}
              A ${innerRadiusZ},${innerRadiusZ} 0 ${lArcFlag2} 0 ${x1} ${y1} 
              Z
              `}
                  stroke={hoveredIndex === index ? "#44444d" : hoveredC ? "#000000ff" : "#6363eb"}
                  strokeWidth={hoveredIndex === index ? 0.8 : 0.2}
                />

                {/* <text x={pointX} y={pointY} fill="#f5f5fd" textAnchor="middle" dominantBaseline="middle" fontSize="5px">
                TEST
              </text> */}
                {data[index].icons.map((IconEach, iconIndex) => {
                  const isShine = shine.includes(IconEach.text)
                  return (
                    <g key={iconIndex}>
                      <Tooltip
                        fontFamily="'Exo', sans-serif"
                        backdropFilter="blur(6px)"
                        bgColor={"#161024a9"}
                        border="5 solid #12123dff"
                        // borderWidth={'1px'}
                        borderRadius={"5px"}
                        padding={"20px"}
                        key={iconIndex}
                        label={
                          <>
                            {IconEach.text}
                            {IconEach.comp}
                          </>
                        }
                        closeDelay={100000}
                        offset={{ x: IconEach.x + 10, y: IconEach.y + 10 }}>
                        <Icon
                          _hover={{
                            boxShadow: "x2",
                            transition: "box-shadow 0.2s ease-in-out",
                            color: "red.500",
                          }}
                          cursor="pointer"
                          key={iconIndex}
                          viewBox={`${-(IconEach.x * resistant)} ${-(IconEach.y * resistant)} ${width} ${height}`}
                          color="red.500"
                          filter={
                            isShine
                              ? "drop-shadow(0px 0px 10px #ffffffff) brightness(160%) saturate(200%)"
                              : hoveredIndex === index
                              ? "drop-shadow(0px 0px 40px #ff6dd1c7)"
                              : "drop-shadow(0px 0px 20px #eb333349)"
                          }>
                          <IconEach.icon width={IconWidth} height={IconHeight} />
                        </Icon>
                      </Tooltip>
                    </g>
                  )
                })}
              </g>
            </>
          )
        })}

        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadiusZ}
          fill={hoveredC ? "#682ac4ff" : "#281d39ff"}
          onMouseOver={() => setHoveredC(true)}
          onMouseOut={() => setHoveredC(false)}
          fillOpacity={hoveredC ? 0.3 : 1}
          stroke={hoveredC ? "#ff0088" : "#000000"}
          strokeWidth={hoveredC ? 1.5 : 0}
          strokeOpacity={hoveredC ? 0.1 : 0}
          filter={
            hoveredC ? "drop-shadow(0 0 70px #ff1cc3ff) brightness(100%) saturate(200%)" : "drop-shadow(0 0 200px #a12cbeff) brightness(100%) saturate(200%)"
          }
        />

        {data_central.icons.map((IconEach, iconIndex) => {
          return (
            <>
              <Tooltip
                fontFamily="'Exo', sans-serif"
                backdropFilter="blur(6px)"
                bgColor={"#161024a9"}
                border="5 solid #12123dff"
                // borderWidth={'1px'}
                borderRadius={"5px"}
                padding={"20px"}
                label={
                  <>
                    {IconEach.text}
                    {IconEach.comp}
                  </>
                }
                closeDelay={1000}>
                <Icon
                  _hover={{
                    boxShadow: "xl",
                    transition: "box-shadow 0.2s ease-in-out",
                    color: "red.500",
                  }}
                  onMouseOver={() => setHoveredC(true)}
                  onMouseOut={() => setHoveredC(false)}
                  filter={hoveredC ? "drop-shadow(0 0 20px #f3f3ffff)" : "drop-shadow(0 0 20px #dd00ffff)"}
                  cursor="pointer"
                  key={iconIndex}
                  viewBox={`${-IconEach.x} ${-IconEach.y} ${width} ${height}`}
                  color="red.500">
                  <IconEach.icon width={IconWidth} height={IconHeight} />
                </Icon>
              </Tooltip>
            </>
          )
        })}
      </svg>
      {/* </svg> */}
    </>
  )
}
export default PieChart
