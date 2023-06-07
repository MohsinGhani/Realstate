"use client";

import React, { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import RoomDetail from "./RoomDetail";

interface Field {
  title: string;
  name: string;
  isDeleted: boolean;
}

const iconProps: { rev?: undefined } = {
  rev: undefined,
};

const array: Field[] = [
  { title: "Floor", name: "floor", isDeleted: false },
  { title: "Paint", name: "paint", isDeleted: false },
];

interface AddRoomProps {
  form: any;
}

const AddRoom: React.FC<AddRoomProps> = ({ form }: any) => {
  const [first, setfirst] = useState<Field[]>(array);

  const addField = () => {
    try {
      const value: string | undefined = form.getFieldValue("addFieldName");

      if (!value?.length) {
        return message.info("Please write the field name");
      }

      const findValue = first?.find(
        (x: Field) => x?.name?.toLowerCase() === value?.toLowerCase()
      );

      if (!findValue?.name) {
        setfirst([...first, { title: value!, name: value!, isDeleted: true }]);
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

  const removeField = (value: string) => {
    let myArray = [...first];
    myArray = myArray.filter((obj: Field) => obj.name !== value);
    setfirst(myArray);
  };

  return (
    <div className="overflow-y-auto h-[80vh]" id="journal-scroll">
      <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select
            placeholder="Select a Type"
            allowClear
            options={[
              {
                value: "livingRoom",
                label: "Living Room",
              },
              {
                value: "bedroom",
                label: "Bedroom",
              },
              {
                value: "bonusRoomHallway",
                label: "Bonus Room Hallway",
              },
              {
                value: "office",
                label: "Office",
              },
              {
                value: "kitchen",
                label: "Kitchen",
              },
              {
                value: "bathroom",
                label: "Bathroom ",
              },
              {
                value: "stairs",
                label: "Stairs",
              },
              {
                value: "garage",
                label: "Garage",
              },
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Form.Item>

        <RoomDetail form={form} array={first} removeField={removeField} />

        <div className="flex justify-between">
          <Form.Item name="addFieldName" className="w-full">
            <Input />
          </Form.Item>
          <Button
            type="primary"
            icon={<DownloadOutlined rev="" />}
            onClick={addField}
          >
            Add field
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddRoom;
