/*global chrome*/

import React, { useState } from "react";

import { CTAButton, StrokeButton } from "@codecademy/gamut";
import { createEmotionCache, theme } from "@codecademy/gamut-styles";
import { ThemeProvider, CacheProvider } from "@emotion/react";
import "./index.scss";
import "./App.css";

import styled from "@emotion/styled";

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const Row = styled.div`
  padding-top: 3rem;
`;

const Col = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
`;

const StreakContainer = styled.div`
  /* background-color: red; */
  /* background: $color-white; */
  border-radius: 2px;
  box-shadow: 0 2px 8px 0 lightgray;
  padding: 1rem;
  position: relative; // for easy absolute placement of child elements
  /* transition: box-shadow $transition-time ease-in; */
`;

const App = ({ codeLater, setCodeLater, data }) => {
  const formatData = () => {
    const { daysCompleted, weeklyStreakCompleted } = data;

    return <>The last day you completed was {daysCompleted[0]}</>;
  };
  console.log(data, "data");
  return (
    <CacheProvider value={createEmotionCache()}>
      <ThemeProvider theme={theme}>
        <div
          className="App"
          style={{ display: `${codeLater ? "none" : "block"}` }}
        >
          <Flex>
            <Row>
              <Col style={{ fontSize: "30px" }}>
                Shouldn't you code instead?
              </Col>
              <StreakContainer>{formatData()}</StreakContainer>
              <Col>
                <StrokeButton
                  mode="light"
                  onClick={() => setCodeLater(!codeLater)}
                >
                  I'll code later
                </StrokeButton>
              </Col>
              <Col>
                <CTAButton href="https://codecademy.com/learn" mode="light">
                  Code First :)
                </CTAButton>
              </Col>
            </Row>
          </Flex>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
