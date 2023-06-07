import React from "react";
import { Button, DatePicker, Form, Input, Space, Upload } from "antd";
import { UploadOutlined, DeleteTwoTone } from "@ant-design/icons";

interface RoomDetailProps {
  array: any;
  form: any;
  removeField: (name: string) => void;
}

const iconProps = {
  rev: undefined,
};

const RoomDetail: React.FC<RoomDetailProps> = ({
  array,
  form,
  removeField,
}) => {
  const handleOnRemove = async (event: any) => {
    const value = form.getFieldsValue();
    const [find]: any = Object.entries(value).find(
      ([_, value]: any) => value?.file?.uid === event?.uid
    );

    form.setFieldsValue({
      [find]: null,
    });
  };

  return array?.map(({ title, name, isDeleted }: any) => (
    <div key={name}>
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
          name={`${name}InstallDate`}
          label={`${title} Install Date`}
          className="mb-1"
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          name={`${name}Warranty`}
          label={`${title} Warranty`}
          className="mb-1"
        >
          <Input placeholder={`${title} Warranty`} />
        </Form.Item>
        <Form.Item name={`${name}Picture`} label={`${title} Picture`}>
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
        <Form.Item name={`${name}Receipt`} label={`${title} Receipt`}>
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
      </div>
    </div>
  ));
};

export default RoomDetail;
