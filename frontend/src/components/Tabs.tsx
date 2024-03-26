// TabsComponent.tsx

import React from "react";
import { Tab, Tabs as BSTabs } from "react-bootstrap";

interface TabData {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabsData: TabData[];
  activeKey: string;
  onSelectTab?: (key: string) => void;
}

const Tabs = ({ tabsData, activeKey, onSelectTab }: TabsProps) => {
  return (
    <BSTabs id="tabs-component" activeKey={activeKey} >
      {tabsData.map((tab) => (
        <Tab key={tab.title} eventKey={tab.title} title={tab.title}>
          {tab.content}
        </Tab>
      ))}
    </BSTabs>
  );
};

export default Tabs;
