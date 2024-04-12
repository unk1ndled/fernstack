import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const BreadCrumb = ({ folder }) => {
  const navigate = useNavigate();

  const navToFolder = (fd) => {
    console.log("first");
    navigate("/treasure/" + fd.id, { state: { folder: fd } });
  };

  return (
    <Breadcrumbs size="lg" className="text-xl" color="secondary" variant="light">
      <BreadcrumbItem href="/treasure">root</BreadcrumbItem>

      {folder != null &&
        folder.path !== undefined &&
        folder.path.map((fold, index) => (
          <BreadcrumbItem
            onPress={() => {
              navToFolder(fold);
            }}
            index={index}
          >
            {fold.name}
          </BreadcrumbItem>
        ))}
      {folder && folder.name !== "Root" && (
        <BreadcrumbItem href="/treasure">{folder.name}</BreadcrumbItem>
      )}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
