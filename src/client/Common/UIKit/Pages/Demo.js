import React from 'react';
import Box from '../Components/Containers/Box/Box';
import Tab from '../Components/Navigation/Tabs/Tab';
import Pill from '../Components/Navigation/Pills/Pill';
import Card from '../Components/Containers/Card/Card';
import Section from '../Components/Containers/Section/Section';
import Stat from '../Components/Stats/Stat';
import { CenteredHeader } from '../Components/Typography/Headers';

const DemoPage = () => (
  <div>
    <h2>Box</h2>
    <h3>Box - Normal</h3>
    <Box>Box: Normal</Box>

    <h3>Box - Small</h3>
    <Box size="small">Box: Small</Box>

    <h2>Navigation</h2>

    <h3>Tab Navigation</h3>
    <Tab size="small">
      <Tab.Item>
        <p>Testing</p>
      </Tab.Item>
      <Tab.Item active="true">
        <p>Testing</p>
      </Tab.Item>
    </Tab>

    <h3>Pill Navigation</h3>
    <Pill size="small">
      <Pill.Item>
        <p>Testing</p>
      </Pill.Item>
      <Pill.Item active="true">
        <p>Testing</p>
      </Pill.Item>
    </Pill>

    <h2>Cards</h2>
    <Card>
      <Card.Position position="header">
        <Tab size="small">
          <Tab.Item>
            <p>Testing</p>
          </Tab.Item>
          <Tab.Item active="true">
            <p>Testing</p>
          </Tab.Item>
        </Tab>
        <Pill size="small">
          <Pill.Item>
            <p>Testing</p>
          </Pill.Item>
          <Pill.Item active="true">
            <p>Testing</p>
          </Pill.Item>
        </Pill>
      </Card.Position>

      <Card.Position position="content">
        <p>This is the content</p>
      </Card.Position>
    </Card>

    <h2>Sections</h2>
    <Section title="Test Section">
      <p>Section content here.</p>
    </Section>

    <Section title="Test Section">
      <CenteredHeader>
        <h6>User Stats</h6>
      </CenteredHeader>
      <Stat label="Users" value={22} highlight />
      <Stat label="Users" value={22} highlight size="large" />
    </Section>
  </div>
);

export default DemoPage;
