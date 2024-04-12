import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const BreadCrumb = ({folder}) => {
  return (
    <Breadcrumbs color="secondary" variant="light">
      <BreadcrumbItem href="/treasure">root</BreadcrumbItem>

      {folder != null &&
        folder.path !== undefined &&
        folder.path.map((fold, index) => (
          <BreadcrumbItem index={index}>{fold.name}</BreadcrumbItem>
        ))}
      {folder && folder.name !== "Root" && (
        <BreadcrumbItem href="/treasure">{folder.name}</BreadcrumbItem>
      )}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
