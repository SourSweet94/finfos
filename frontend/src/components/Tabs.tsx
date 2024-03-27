import React, { useEffect, useState } from "react";
import { Tab as BSTab, Tabs as BSTabs } from "react-bootstrap";
import "../styles/tabs.css"

interface Tab {
  _id: string;
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveKey: string;
}

const Tabs = ({ tabs, defaultActiveKey }: TabsProps) => {
  const [activeKey, setActiveKey] = useState<string>('');

  useEffect(() => {
      setActiveKey(defaultActiveKey);
  }, [defaultActiveKey]);

  return (
    <BSTabs
      className="tabs mt-3"
      activeKey={activeKey}
      onSelect={(key: string | null) => setActiveKey(key || "")}
      defaultActiveKey={defaultActiveKey}
    >
      {tabs.map((tab: Tab) => (
        <BSTab
          className="tab"
          eventKey={tab.title}
          title={tab.title}
          key={tab._id}
        >
          {tab.content}
        </BSTab>
      ))}
    </BSTabs>
  );
};

export default Tabs;
