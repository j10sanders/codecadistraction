/*global chrome*/

import React, { useState } from "react";

import { FlexGrid, Row, Col, CTAButton, StrokeButton } from "@codecademy/gamut";
import { createEmotionCache, theme } from "@codecademy/gamut-styles";
import { ThemeProvider, CacheProvider } from "@emotion/react";
import "./index.scss";
import "./App.css";

const App = ({ toggle }) => {
  const [codeLater, setCodeLater] = useState();
  return (
    <CacheProvider value={createEmotionCache()}>
      <ThemeProvider theme={theme}>
        <div
          className="App"
          style={{ display: `${codeLater ? "none" : "block"}` }}
        >
          <FlexGrid fluid>
            <Row center="xs">
              <Col xs="6">Test</Col>
              <Col xs="6">
                <StrokeButton mode="light" onClick={() => setCodeLater{!codeLater}}>
                  I'll code later
                </StrokeButton>
              </Col>
              <Col xs="6">
                <CTAButton href="https://codecademy.com/learn" mode="light">
                  Code First :)
                </CTAButton>
              </Col>
            </Row>
          </FlexGrid>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
