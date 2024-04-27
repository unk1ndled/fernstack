import { Card, CardBody, CircularProgress } from "@nextui-org/react";
import React, { useState } from "react";

const Toast = ({ value }) => {
  value = Math.floor(value);
  return (
    <>
      <Card className="fixed   bottom-10 right-10 max-w-[600px] ">
        <CardBody className="flex flex-row">
          <CircularProgress
            aria-label="uploading..."
            label="uploading..."
            classNames={{
              svg: "w-24 h-24 drop-shadow-md",
              indicator: "stroke-warning",
              track: "stroke-warning/10",
              value: "text-2xl font-semibold text-warning",
            }}
            value={value}
            color="warning"
            showValueLabel={true}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Toast;
