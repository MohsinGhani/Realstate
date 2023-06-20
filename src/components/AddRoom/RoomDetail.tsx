import React from "react";
import { DatePicker, Form, Input, Space, Upload } from "antd";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
const iconProps = {
  rev: undefined,
};

const RoomDetail = ({ typeFields, removeField, deletePhotes }: any) => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onRemoveHandler = (e: any) => {
    if (!e?.originFileObj) {
      deletePhotes.current.push(e.uid);
    }
  };

  return typeFields?.map(({ title, name }: any, i: any) => (
    <div key={i}>
      <div className="flex justify-between">
        <h4>{title}</h4>
        <Space>
          <DeleteTwoTone
            {...iconProps}
            twoToneColor="#FF0000"
            className="cursor-pointer"
            onClick={() => removeField(name)}
          />
        </Space>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Form.Item
          name={[name, "InstallDate"]}
          label={`${title} Install Date`}
          className="mb-1"
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" format={"YYYY-MM-DD"} />
        </Form.Item>
        <Form.Item
          name={[name, "Warranty"]}
          label={`${title} Warranty`}
          className="mb-1"
          rules={[{ required: true }]}
        >
          <Input placeholder={`${title} Warranty`} />
        </Form.Item>
        <Form.Item
          name={[name, "Picture"]}
          label={`${title} Picture`}
          rules={[{ required: true }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            maxCount={1}
            listType="picture-card"
            onPreview={() => false}
            onRemove={onRemoveHandler}
          >
            <Space>
              <PlusOutlined {...iconProps} />
              Upload
            </Space>
          </Upload>
        </Form.Item>
        <Form.Item
          name={[name, "Receipt"]}
          label={`${title} Receipt`}
          rules={[{ required: true }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            maxCount={1}
            listType="picture-card"
            onPreview={() => false}
            onRemove={onRemoveHandler}
          >
            <Space>
              <PlusOutlined {...iconProps} />
              Upload
            </Space>
          </Upload>
        </Form.Item>
      </div>
    </div>
  ));
};

export default RoomDetail;
