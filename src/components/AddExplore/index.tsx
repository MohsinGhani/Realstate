"use client";

import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ExploreDetail from "./ExploreDetail";
import { typeDetailExterior, typeDetailRoom } from "@/services/constant";

const iconProps = {
  rev: undefined,
};

const AddExplore = ({
  form,
  typeFields,
  setTypeFields,
  deletePhotes,
  role,
}: any) => {
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
        setTypeFields([
          ...typeFields,
          { name: value, typeDetail: typeDetailRoom },
        ]);
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
          {
            name: "Floor",
            typeDetail: typeDetailRoom,
          },
          {
            name: "Paint",
            typeDetail: typeDetailRoom,
          },
          { name: "Lighting/Fan", typeDetail: typeDetailRoom },
        ];
        break;

      case "Garage":
        array = [
          { name: "Garage Door", typeDetail: typeDetailRoom },
          { name: "Lighting", typeDetail: typeDetailRoom },
          { name: "Paint", typeDetail: typeDetailRoom },
        ];
        break;

      case "Kitchen":
        array = [
          { name: "Countertops", typeDetail: typeDetailRoom },
          { name: "Lighting", typeDetail: typeDetailRoom },
          { name: "Floor", typeDetail: typeDetailRoom },
          { name: "Paint", typeDetail: typeDetailRoom },
          { name: "Oven", typeDetail: typeDetailRoom },
          { name: "Microwave", typeDetail: typeDetailRoom },
          { name: "Dishwasher", typeDetail: typeDetailRoom },
          { name: "Refrigerator", typeDetail: typeDetailRoom },
          {
            name: "Garbage Disposal",
            typeDetail: typeDetailRoom,
          },
        ];
        break;

      case "Bathroom":
        array = [
          { name: "Floor", typeDetail: typeDetailRoom },
          { name: "Paint", typeDetail: typeDetailRoom },
          { name: "Lighting/Fan", typeDetail: typeDetailRoom },
          { name: "Sink", typeDetail: typeDetailRoom },
          { name: "Toilet", typeDetail: typeDetailRoom },
          { name: "Shower/Bathtub", typeDetail: typeDetailRoom },
        ];
        break;

      case "Roof":
        array = [{ name: "Roof", typeDetail: typeDetailExterior }];
        break;

      case "Siding":
        array = [{ name: "Siding", typeDetail: typeDetailExterior }];
        break;

      case "Windows":
        array = [{ name: "Windows", typeDetail: typeDetailExterior }];
        break;

      case "Doors":
        array = [{ name: "Doors", typeDetail: typeDetailExterior }];
        break;

      case "Gutters":
        array = [{ name: "Gutters", typeDetail: typeDetailExterior }];
        break;

      case "Driveway":
        array = [{ name: "Driveway", typeDetail: typeDetailExterior }];
        break;

      default:
        array = [
          {
            name: "Floor",
            typeDetail: typeDetailRoom,
          },
        ];
        break;
    }

    setTypeFields(array);
  };

  const typeSelectoptions: any = {
    room: [
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
    ],
    exterior: [
      {
        value: "Roof",
      },
      {
        value: "Siding",
      },
      {
        value: "Windows",
      },
      {
        value: "Doors",
      },
      {
        value: "Gutters",
      },
      {
        value: "Driveway",
      },
    ],
  };

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
            pre?.map((t: any) => (t.name === name ? { ...t, name: value } : t))
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
        {role !== "utilitie" && (
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select
              placeholder="Select a Type"
              onChange={OnTypeChange}
              options={typeSelectoptions[role]}
            />
          </Form.Item>
        )}

        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>

        {role === "utilitie" && (
          <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
            <Input placeholder="Brand Name" />
          </Form.Item>
        )}

        {role === "room" && (
          <Form.Item label="Room Level" name="roomLevel">
            <Input placeholder="Room Level" />
          </Form.Item>
        )}

        <ExploreDetail
          typeFields={typeFields}
          removeField={removeField}
          deletePhotes={deletePhotes}
          onChangeName={onChangeName}
          changeName={changeName}
          form={form}
        />

        {!!type && role === "room" && (
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

export default AddExplore;
