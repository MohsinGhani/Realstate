"use client";

import React from "react";
import { Button, Form, Input, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const iconProps = {
  rev: undefined,
};

const RoomDetail = ({ array, form }: any) => {
  console.log("🚀  array:", array);

  const handleOnRemove = async (event: any) => {
    console.log("🚀  event:", event);
    const value = form.getFieldsValue();
    console.log("🚀  value:", value);
  };

  return array?.map(({ title, name }: any) => (
    <div key={name}>
      <p>{title}</p>
      <Form.Item name={`${name}InstallDate`}>
        <Input placeholder={`${title} Install Date`} />
      </Form.Item>
      <Form.Item name={`${name}Warranty`}>
        <Input placeholder={`${title} Warranty`} />
      </Form.Item>
      <Space>
        <Form.Item name={`${name}Picture`} label="Upload Picture">
          <Upload
            listType="picture"
            className="upload-list-inline"
            maxCount={1}
            onRemove={handleOnRemove}
            onPreview={() => null}
          >
            <Button icon={<UploadOutlined {...iconProps} />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name={`${name}Receipt`} label="Upload Receipt">
          <Upload
            listType="picture"
            className="upload-list-inline"
            maxCount={1}
            onRemove={handleOnRemove}
            onPreview={() => null}
          >
            <Button icon={<UploadOutlined {...iconProps} />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Space>
    </div>
  ));
};

export default RoomDetail;
