import React from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Space,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
const iconProps = {
  rev: undefined,
};

const ExploreDetail = ({
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

  const RenderItem = ({ field, key }: any) => {
    const { name, min, max, type, required } = field;

    switch (type) {
      case "string":
      case "number":
        return (
          <Form.Item
            name={[key, name]}
            label={`${key} ${name}`}
            rules={[
              {
                required,
              },
              {
                type,
                min,
                max,
              },
            ]}
            className="mb-1"
          >
            {type === "string" ? <Input /> : <InputNumber />}
          </Form.Item>
        );

      case "date":
        return (
          <Form.Item
            name={[key, name]}
            label={`${key} ${name}`}
            rules={[
              {
                required,
              },
            ]}
            className="mb-1"
          >
            <DatePicker className="w-full" format={"YYYY-MM-DD"} />
          </Form.Item>
        );

      case "image":
        return (
          <Form.Item
            name={[key, name]}
            label={`${key} ${name}`}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              maxCount={max}
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
        );

      default:
    }
  };

  return typeFields?.map(({ name, typeDetail }: any, i: any) => (
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
        <h4>{name}</h4>
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
        {typeDetail?.map((field: any) => RenderItem({ field, key: name }))}
      </div>
    </div>
  ));
};

export default ExploreDetail;
