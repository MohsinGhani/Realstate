"use client";

import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import RoomDetail from "./RoomDetail";

const iconProps = {
  rev: undefined,
};

const AddRoom = ({ form, typeFields, setTypeFields }: any) => {
  const type = Form.useWatch("type", form);

  const addField = () => {
    try {
      const value = form.getFieldValue("addFieldName");

      if (!value?.length) {
        return message.info("Please write the field name");
      }

      const findValue = typeFields?.find(
        (x: any) => x?.name?.toLowerCase() === value?.toLowerCase()
      );

      if (!findValue?.name) {
        setTypeFields([
          ...typeFields,
          { title: value, name: value, isDeleted: true },
        ]);
        form.setFieldsValue({
          addFieldName: undefined,
        });
      } else {
        message.error(`${value} field name already exists`);
      }
    } catch (error) {
      console.log("🚀  error:", error);
    }
  };

  const removeField = (value: any) => {
    let myArray = typeFields;
    myArray = myArray.filter((obj: any) => obj.name != value);
    setTypeFields(myArray);
  };

  const OnTypeChange = (value: any) => {
    let array = [];

    switch (value) {
      case "Living Room":
      case "Bedroom":
      case "Bonus Room Hallway":
      case "Office":
      case "Hallway":
      case "Stairs":
      case "Other":
        array = [
          { title: "Floor", name: "Floor", isDeleted: true },
          { title: "Paint", name: "Paint", isDeleted: true },
          { title: "Lighting/Fan", name: "Lighting/Fan", isDeleted: true },
        ];
        setTypeFields(array);
        break;

      case "Garage":
        array = [
          { title: "Garage Door", name: "Garage Door", isDeleted: true },
          { title: "Lighting", name: "Lighting", isDeleted: true },
          { title: "Paint", name: "Paint", isDeleted: true },
        ];

        setTypeFields(array);
        break;

      case "Kitchen":
        array = [
          { title: "Countertops", name: "Countertops", isDeleted: true },
          { title: "Lighting", name: "Lighting", isDeleted: true },
          { title: "Floor", name: "Floor", isDeleted: true },
          { title: "Paint", name: "Paint", isDeleted: true },
          { title: "Oven", name: "Oven", isDeleted: true },
          { title: "Microwave", name: "Microwave", isDeleted: true },
          { title: "Dishwasher", name: "Dishwasher", isDeleted: true },
          { title: "Refrigerator", name: "Refrigerator", isDeleted: true },
          {
            title: "Garbage Disposal",
            name: "Garbage Disposal",
            isDeleted: true,
          },
        ];

        setTypeFields(array);
        break;

      case "Bathroom":
        array = [
          { title: "Floor", name: "Floor", isDeleted: true },
          { title: "Paint", name: "Paint", isDeleted: true },
          { title: "Lighting/Fan", name: "Lighting/Fan", isDeleted: true },
          { title: "Sink", name: "Sink", isDeleted: true },
          { title: "Toilet", name: "Toilet", isDeleted: true },
          { title: "Shower/Bathtub", name: "Shower/Bathtub", isDeleted: true },
        ];
        setTypeFields(array);
        break;

      default:
        array = [{ title: "Floor", name: "Floor", isDeleted: true }];
        setTypeFields(array);
    }
  };

  const typeSelectoptions = [
    {
      value: "Living Room",
    },
    {
      value: "Bedroom",
    },
    {
      value: "Bonus Room Hallway",
    },
    {
      value: "Office",
    },
    {
      value: "Hallway",
    },
    {
      value: "Kitchen",
    },
    {
      value: "Bathroom ",
    },
    {
      value: "Stairs",
    },
    {
      value: "Garage",
    },

    {
      value: "Other",
    },
  ];

  return (
    <div className="overflow-y-auto h-[80vh]" id="journal-scroll">
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Select
            placeholder="Select a Type"
            onChange={OnTypeChange}
            options={typeSelectoptions}
          />
        </Form.Item>

        <RoomDetail
          form={form}
          typeFields={typeFields}
          removeField={removeField}
        />

        {!!type && (
          <div className="flex justify-between gap-4">
            <Form.Item name="addFieldName" className="w-full">
              <Input />
            </Form.Item>
            <Button
              type="primary"
              icon={<PlusOutlined {...iconProps} />}
              onClick={addField}
            >
              Add field
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default AddRoom;
