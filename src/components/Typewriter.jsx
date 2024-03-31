import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TypewriterContainer = styled.div`
  overflow: hidden;
  border-right: .15em solid rgba(0, 250, 133, 0.505);
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: .15em;
`;

const TypewriterText = styled.h1`
  width: ${(props) => props.width};
  animation: typing ${(props) => props.animationDuration}s steps(40, end),
    blink-caret .75s step-end infinite;
`;

const Typewriter = ({ lines, animationDuration }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [typedWidth, setTypedWidth] = useState('0%');

  useEffect(() => {
    let currentWidth = 0;
    const intervalId = setInterval(() => {
      currentWidth += 2.5; // Adjust as needed for the typing speed
      setTypedWidth(`${currentWidth}%`);

      if (currentWidth >= 100) {
        clearInterval(intervalId);

        // Move to the next line after the animation completes
        setCurrentLine((prevLine) => prevLine + 1);

        // Reset width for the next line
        setTypedWidth('0%');
      }
    }, 100); // Adjust as needed for the interval duration

    return () => clearInterval(intervalId);
  }, [currentLine]);

  return (
    <TypewriterContainer>
      <TypewriterText width={typedWidth} animationDuration={animationDuration}>
        {lines[currentLine]}
      </TypewriterText>
    </TypewriterContainer>
  );
};

export default Typewriter;