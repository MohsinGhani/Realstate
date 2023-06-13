import React from "react";
import { Button, DatePicker, Form, Input, Upload } from "antd";
import { UploadOutlined, DeleteTwoTone } from "@ant-design/icons";
const iconProps = {
  rev: undefined,
};

const RoomDetail = ({ typeFields, form, removeField }: any) => {
  const handleOnRemove: any = async (event: any) => {
    const value = form.getFieldsValue();
    const [find]: any = Object.entries(value).find(
      ([_, value]: any) => value?.file?.uid === event?.uid
    );

    form.setFieldsValue({
      [find]: null,
    });
  };

  return typeFields?.map(({ title, name, isDeleted }: any, i: any) => (
    <div key={i}>
      <div className="flex justify-between">
        <h4>{title}</h4>
        {isDeleted && (
          <DeleteTwoTone
            {...iconProps}
            twoToneColor="#FF0000"
            className="cursor-pointer"
            onClick={() => removeField(name)}
          />
        )}
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
        >
          <Upload
            listType="picture"
            className="upload-list-inline"
            maxCount={1}
            onPreview={() => null}
          >
            <Button icon={<UploadOutlined {...iconProps} />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name={[name, "Receipt"]}
          label={`${title} Receipt`}
          rules={[{ required: true }]}
        >
          <Upload
            listType="picture"
            className="upload-list-inline"
            maxCount={1}
            onPreview={() => null}
          >
            <Button icon={<UploadOutlined {...iconProps} />}>Upload</Button>
          </Upload>
        </Form.Item>
      </div>
    </div>
  ));
};

export default RoomDetail;
