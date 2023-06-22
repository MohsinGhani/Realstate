"use client";

import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import RoomDetail from "./RoomDetail";
import { throws } from "assert";

const iconProps = {
  rev: undefined,
};

const AddRoom = ({ form, typeFields, setTypeFields, deletePhotes }: any) => {
  const type = Form.useWatch("type", form);
  const changeName = Form.useWatch(["changeName", "name"], form);

  const addField = (value: any) => {
    try {
      if (!value?.length) {
        throw new Error("Please write the field name");
      }

      const findValue = typeFields?.find(
        (x: any) => x?.name?.toLowerCase() === value?.toLowerCase()
      );

      if (!findValue?.name) {
        setTypeFields([...typeFields, { title: value, name: value }]);
        form.setFieldsValue({
          addFieldName: undefined,
        });
      } else {
        throw new Error(`${value} field name already exists`);
      }
    } catch (error: any) {
      message.error(error.message);
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
          { title: "Floor", name: "Floor" },
          { title: "Paint", name: "Paint" },
          { title: "Lighting/Fan", name: "Lighting/Fan" },
        ];
        setTypeFields(array);
        break;

      case "Garage":
        array = [
          { title: "Garage Door", name: "Garage Door" },
          { title: "Lighting", name: "Lighting" },
          { title: "Paint", name: "Paint" },
        ];

        setTypeFields(array);
        break;

      case "Kitchen":
        array = [
          { title: "Countertops", name: "Countertops" },
          { title: "Lighting", name: "Lighting" },
          { title: "Floor", name: "Floor" },
          { title: "Paint", name: "Paint" },
          { title: "Oven", name: "Oven" },
          { title: "Microwave", name: "Microwave" },
          { title: "Dishwasher", name: "Dishwasher" },
          { title: "Refrigerator", name: "Refrigerator" },
          {
            title: "Garbage Disposal",
            name: "Garbage Disposal",
          },
        ];

        setTypeFields(array);
        break;

      case "Bathroom":
        array = [
          { title: "Floor", name: "Floor" },
          { title: "Paint", name: "Paint" },
          { title: "Lighting/Fan", name: "Lighting/Fan" },
          { title: "Sink", name: "Sink" },
          { title: "Toilet", name: "Toilet" },
          { title: "Shower/Bathtub", name: "Shower/Bathtub" },
        ];
        setTypeFields(array);
        break;

      default:
        array = [{ title: "Floor", name: "Floor" }];
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

  const onChangeName = async () => {
    try {
      const {
        changeName: { name, value },
        ...rest
      } = await form.validateFields();

      if (name !== value) {
        const perValue = rest[name];

        const findValue = typeFields?.find(
          (x: any) => x?.name?.toLowerCase() === value?.toLowerCase()
        );

        if (!findValue?.name) {
          setTypeFields((pre: any) =>
            pre?.map((t: any) =>
              t.name === name ? { ...t, title: value, name: value } : t
            )
          );
          form.setFieldsValue({
            [value]: perValue,
          });
        } else {
          message.error(`${value} field name already exists`);
        }
      }
    } catch (err) {
      console.log("err:", err);
    } finally {
      form.setFieldsValue({
        changeName: { name: undefined, value: undefined },
      });
    }
  };

  return (
    <div className="overflow-y-auto h-[80vh] pr-[12px]" id="journal-scroll">
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
          typeFields={typeFields}
          removeField={removeField}
          deletePhotes={deletePhotes}
          onChangeName={onChangeName}
          changeName={changeName}
          form={form}
        />

        {!!type && (
          <div className="flex justify-between gap-4">
            <Form.Item name="addFieldName" className="w-full">
              <Input />
            </Form.Item>
            <Button
              type="primary"
              icon={<PlusOutlined {...iconProps} />}
              onClick={() => {
                const value = form.getFieldValue("addFieldName");
                addField(value);
              }}
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
