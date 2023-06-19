"use client";

import React from "react";
import { Form, Input, Select } from "antd";
import ExteriorDetail from "./ExteriorDetail";

const AddExterior = ({
  form,
  typeFields,
  setTypeFields,
  deletePhotes,
}: any) => {
  const removeField = (value: any) => {
    let myArray = typeFields;
    myArray = myArray.filter((obj: any) => obj.name != value);
    setTypeFields(myArray);
  };

  const OnTypeChange = (value: any) => {
    let array = [];

    switch (value) {
      case "Roof":
        array = [{ title: "Roof", name: "Roof" }];
        break;
      case "Siding":
        array = [{ title: "Siding", name: "Siding" }];
        break;
      case "Windows":
        array = [{ title: "Windows", name: "Windows" }];
        break;
      case "Doors":
        array = [{ title: "Doors", name: "Doors" }];
        break;
      case "Gutters":
        array = [{ title: "Gutters", name: "Gutters" }];
        break;
      case "Driveway":
        array = [{ title: "Driveway", name: "Driveway" }];
        break;

      default:
        array = [{ title: "Roof", name: "Roof" }];
        break;
    }

    setTypeFields(array);
  };

  const typeSelectoptions = [
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

        <ExteriorDetail
          typeFields={typeFields}
          removeField={removeField}
          deletePhotes={deletePhotes}
        />
      </Form>
    </div>
  );
};

export default AddExterior;
