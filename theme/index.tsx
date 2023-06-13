import React from "react";
import { ConfigProvider } from "antd";

const withTheme = (node: JSX.Element) => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#52c41a",
          },
        }}
      >
        {node}
      </ConfigProvider>
    </>
  );
};

export default withTheme;
