import { Tabs as BSTabs, Tab } from "react-bootstrap";

interface TabsProps {
  tabsData : any[];
}

const Tabs = ({ tabsData  }: TabsProps) => {
  return (
    <BSTabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      {tabsData .map((tab) => (
        <Tab eventKey="home" title={tab.title}>
          {tab.content}
        </Tab>
      ))}
    </BSTabs>
  );
};

export default Tabs;
