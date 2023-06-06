"use client";

import React from "react";
import { Form, Input, Select } from "antd";
import RoomDetail from "./RoomDetail";

const AddRoom = ({ form }: any) => {
  const array = [
    { title: "Floor", name: "floor" },
    { title: "Paint", name: "paint" },
    // { title: "Light/Fan", name: "light/fan" },
  ];

  return (
    <div className="overflow-y-scroll h-[80vh]" id="journal-scroll">
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

        <RoomDetail form={form} array={array} />
      </Form>
    </div>
  );
};

export default AddRoom;
