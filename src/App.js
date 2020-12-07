/*global chrome*/

import React from "react";

import { CTAButton, StrokeButton } from "@codecademy/gamut";
import { createEmotionCache, theme } from "@codecademy/gamut-styles";
import { ThemeProvider, CacheProvider } from "@emotion/react";
import Streak from "./streak.png";
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

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
`;

const Col = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
`;

const StreakContainer = styled.div`
  /* border-radius: 2px; */
  /* box-shadow: 0 2px 8px 0 lightgray; */
  padding: 1rem;
  justify-content: center;
  display: flex;
  position: relative; // for easy absolute placement of child elements
`;

const TopHalf = styled.div`
  background-color: #381f73;
`;

const App = ({ codeLater, setCodeLater, data }) => {
  const formatData = () => {
    const { daysCompleted, weeklyStreakCompleted } = data;
    const daysSpelled = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    const message = daysCompleted.length
      ? `You haven't coded since ${
          daysSpelled[daysCompleted[daysCompleted.length - 1]]
        }.`
      : "Time to start your streak!";
    return <>{message}</>;
  };
  return (
    <CacheProvider value={createEmotionCache()}>
      <ThemeProvider theme={theme}>
        <div
          className="App"
          style={{ display: `${codeLater ? "none" : "block"}` }}
        >
          <TopHalf>
            <Flex>
              <Row>
                <Col style={{ fontSize: "24px", color: "white" }}>
                  {formatData()}
                </Col>
                <StreakContainer>
                  <img src={Streak} alt="streak" />
                </StreakContainer>
              </Row>
            </Flex>
          </TopHalf>
          <div style={{ paddingTop: "1rem" }}>
            <BottomRow>
              <Col>
                <StrokeButton
                  mode="light"
                  onClick={() => setCodeLater(!codeLater)}
                >
                  Snooze for an hour
                </StrokeButton>
              </Col>
              <Col>
                <CTAButton href="https://codecademy.com/learn" mode="light">
                  I'll Code First ❤️
                </CTAButton>
              </Col>
            </BottomRow>
          </div>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
