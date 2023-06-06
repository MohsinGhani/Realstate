import React from "react";
import { Form, Input, Select } from "antd";

const AddRoom = () => {
  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select
            placeholder="Select a option and change input text above"
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
      </Form>
    </div>
  );
};

export default AddRoom;
