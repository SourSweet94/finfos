import { Breadcrumb as BSBreadcrumb } from "react-bootstrap";

const Breadcrumb = () => {
  return (
    <BSBreadcrumb>
      <BSBreadcrumb.Item href="#">Home</BSBreadcrumb.Item>
      <BSBreadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </BSBreadcrumb.Item>
      <BSBreadcrumb.Item active>Data</BSBreadcrumb.Item>
    </BSBreadcrumb>
  );
};

export default Breadcrumb;
