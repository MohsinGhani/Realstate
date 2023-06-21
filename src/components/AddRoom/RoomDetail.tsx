import React from "react";
import { Button, DatePicker, Form, Input, Space, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const iconProps = {
  rev: undefined,
};

const RoomDetail = ({
  typeFields,
  removeField,
  deletePhotes,
  onChangeName,
  changeName,
  form,
}: any) => {
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

  const changeNameHandler = (value: any) => {
    form.setFieldsValue({ changeName: { name: value, value } });
  };

  return typeFields?.map(({ title, name }: any, i: any) => (
    <div key={i}>
      <div
        className={`flex justify-between ${
          changeName !== name ? "hidden" : ""
        }`}
      >
        <Form.Item name={["changeName", "value"]} className="mb-1">
          <Input />
        </Form.Item>
        <Form.Item name={["changeName", "name"]} className="mb-1">
          <Button shape="round" type="primary" onClick={onChangeName}>
            Save
          </Button>
        </Form.Item>
      </div>

      <div
        className={`flex justify-between ${
          changeName !== name ? "" : "hidden"
        }`}
      >
        <h4>{title}</h4>
        <Space>
          <Button
            shape="round"
            className="w-20"
            onClick={() => changeNameHandler(name)}
          >
            Edit
          </Button>
          <Button
            className="w-20"
            shape="round"
            danger
            onClick={() => removeField(name)}
          >
            Delete
          </Button>
        </Space>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Form.Item
          name={[name, "InstallDate"]}
          label={`${title} Install Date`}
          className="mb-1"
        >
          <DatePicker className="w-full" format={"YYYY-MM-DD"} />
        </Form.Item>
        <Form.Item
          name={[name, "Warranty"]}
          label={`${title} Warranty`}
          className="mb-1"
        >
          <Input placeholder={`${title} Warranty`} />
        </Form.Item>
        <Form.Item
          name={[name, "Picture"]}
          label={`${title} Picture`}
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
