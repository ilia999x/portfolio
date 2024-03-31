import React, { useState, useEffect, useMemo } from "react"
import Basic from "./mainshader"
import styled from "styled-components"
import { cubicCoordinates, stepsCoordinates } from "easing-coordinates"
import { useSpring, animated, to as interpolate, createInterpolator } from "@react-spring/web"
import Spline from "@splinetool/react-spline"
import RickModel from "./RickModel"
import Glasser from "./Glasser"

const MainPageWrapper = ({ children }) => {
  const [from, setFrom] = useState("#e2e2e2")
  const [mid, setMid] = useState("#d4d4d4")
  const [to, setTo] = useState("#ffffff")
  const [angle, setAngle] = useState(90)
  const [stops, setStops] = useState(5)
  const [easeCustom, setEaseCustom] = useState("")
  const [easing, setEasing] = useState("ease-in-out")

  const [scrollColor, setScrollColor] = useState([69, 111, 225])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset
      let y = 1 + scrollPosition / 150
      y = y < 1 ? 1 : y

      if (scrollPosition >= window.innerHeight / 2) {
        setFrom("#ffffff") // Change color when scrolled to 500px
        setMid("#198a4c") // Change color when scrolled to 500px
        setTo("#121112") // Change color when scrolled to 500px
        setAngle(185)
      } else if (scrollPosition >= window.innerHeight * 2 - 100) {
        setFrom("#000000") // Change color when scrolled to 500px
        setMid("#0f1a1a") // Change color when scrolled to 500px
        setTo("#090909") // Change color when scrolled to 500px
        setAngle(210)
      } else {
        setFrom("#e2e2e2")
        setMid("#d4d4d4")
        setTo("#ffffff")
        setAngle(90)
      }

      const [red, green, blue] = scrollColor.map((color) => Math.round(color / y))
      setScrollColor([red, green, blue])
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrollColor])

  const { colorFrom, colorMid, colorTo } = useSpring({
    colorFrom: from,
    colorMid: mid,
    colorTo: to,
  })

  const coordinates = useMemo(() => {
    let coordinates
    const customBezier = easeCustom.split(",").map(Number)
    if (customBezier.length <= 1) {
      coordinates = cubicCoordinates(0.42, 0, 0.58, 1)
    } else {
      coordinates = cubicCoordinates(customBezier[0], customBezier[1], customBezier[2], customBezier[3], stops)
    }

    return coordinates
  }, [easing, easeCustom, stops])

  const allStops = interpolate([colorFrom, colorMid, colorTo], (from, mid, to) => {
    const blend = createInterpolator({ range: [0, 0.5, 1], output: [from, mid, to] })

    return coordinates.map(({ x, y }) => {
      const color = blend(y)

      return `${color} ${x * 100}%`
    })
  })

  return (
    <animated.div
      className="container"
      style={{
        backgroundImage: allStops.to((...args) => `linear-gradient(${angle}deg, ${args.join(", ")})`),
      }}>
      {children}
    </animated.div>
  )
}

// mainpage
export default function Mainpage() {
  const [IsloadingSpline, setIsLoading] = useState(true)
  function onLoad(spline) {
    console.log("loaded")
    setIsLoading(false)
  }
  //  if (IsloadingSpline) return(
  //   <>
  //   LOADING...
  //   </>
  //  )
  return (
    <MainPageWrapper>
      <div className="main-page_1">
        <div className="texttypo">
          Make internet more <span className="time-of-day"></span>!
        </div>
        <Basic />
      </div>
      <div className="main-page_2">
  <RickModel />
  <h3 className="ricklyfont">WELCOME TO THE WORLD OF POSSIBILITIES</h3>

</div>

      {/* <div className="main-page_2">
        <div className="texttypo">
          Make internet more <span className="time-of-day"></span>!
        </div>
      </div> */}
    </MainPageWrapper>
  )
}
