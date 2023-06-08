"use client";

import React from "react";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <nav className="block w-full shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border border-white/80 bg-white sticky inset-0 h-max max-w-full rounded py-2 px-4 lg:px-8 lg:py-4 mb-8 z-50">
      <div className="flex items-center justify-between">
        <img
          src="https://cdn.dribbble.com/users/1070235/screenshots/5325568/lightning_sewer.png"
          alt="Logo"
          width={50}
        />

        <Space>
          <Button>Log in</Button>
          <Button
            onClick={() => {
              router.push("/registration");
            }}
            type="primary"
          >
            Sign up
          </Button>
        </Space>
      </div>
    </nav>
  );
};

export default Header;
