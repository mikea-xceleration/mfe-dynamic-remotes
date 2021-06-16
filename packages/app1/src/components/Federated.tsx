import React, { FC } from "react";
import { useLazyLoading } from "../hooks";

type FederatedProperties = {
  module: string;
};

const Federated: FC<FederatedProperties> = ({ module }) => {
  const { Component, error, isLoading } = useLazyLoading(module);

  if (error != null && error.trim() != "") {
    return (<h2>Failed to load dynamic script: {module}</h2>);
  }
  if (isLoading) {
    return (<h2> Loading</h2>);
  }
  return (
    <React.Suspense fallback="Loading">
      <Component />
    </React.Suspense>
  );
};

export default Federated;
