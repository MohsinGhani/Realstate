import React from "react";
import { DatePicker, Form, Input, Space, Upload } from "antd";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
const iconProps = {
  rev: undefined,
};

const ExteriorDetail = ({ typeFields, removeField, deletePhotes }: any) => {
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
          name={[name, "RoofMaterial"]}
          label={`${title} Roof Material`}
          rules={[{ required: true }]}
        >
          <Input placeholder={`${title} Roof Material`} />
        </Form.Item>

        <Form.Item
          name={[name, "ShingleBrand"]}
          label={`${title} Shingle Brand`}
          rules={[{ required: true }]}
        >
          <Input placeholder={`${title} Shingle Brand`} />
        </Form.Item>

        <Form.Item
          name={[name, "Color"]}
          label={`${title} Color`}
          rules={[{ required: true }]}
        >
          <Input placeholder={`${title} Color`} />
        </Form.Item>

        <Form.Item
          name={[name, "Underlayment"]}
          label={`${title} Underlayment`}
          rules={[{ required: true }]}
        >
          <Input placeholder={`${title} Underlayment`} />
        </Form.Item>

        <Form.Item
          name={[name, "RoofSize"]}
          label={`${title} Roof Size`}
          rules={[{ required: true }]}
        >
          <Input placeholder={`${title} Roof Size`} />
        </Form.Item>

        <Form.Item
          name={[name, "EdgeMetalColor"]}
          label={`${title} Edge Metal Color`}
          rules={[{ required: true }]}
        >
          <Input placeholder={`${title} Edge Metal Color`} />
        </Form.Item>

        <Form.Item
          name={[name, "Cost"]}
          label={`${title} Cost`}
          rules={[{ required: true }]}
        >
          <Input placeholder={`${title} Cost`} />
        </Form.Item>

        <Form.Item
          name={[name, "ContractorName"]}
          label={`${title} Contractor Name`}
          rules={[{ required: true }]}
        >
          <Input placeholder={`${title} Contractor Name`} />
        </Form.Item>

        <Form.Item
          name={[name, "InstallDate"]}
          label={`${title} Install Date`}
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" format={"YYYY-MM-DD"} />
        </Form.Item>

        <Form.Item
          name={[name, "Warranty"]}
          label={`${title} Warranty`}
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" format={"YYYY-MM-DD"} />
        </Form.Item>

        <Form.Item
          name={[name, "ProjectPhotos"]}
          label={`${title} Project Photos`}
          rules={[{ required: true }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            maxCount={3}
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
          name={[name, "WarrantyPhotos"]}
          label={`${title} Warranty Photos`}
          rules={[{ required: true }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            maxCount={3}
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

export default ExteriorDetail;
