"use client";
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Typography,
  message,
  Popconfirm,
  Input,
} from "antd";

const initialData = [
  {
    id: 1,
    name: "Room 1",
    tags: "Bed Room",
  },
  {
    id: 2,
    name: "Room 2",
    tags: "Bathroom",
  },
  {
    id: 3,
    name: "Room 3 ",
    tags: "Other",
  },
  {
    id: 4,
    name: "Room 4",
    tags: "Garage",
  },
];

const TableComponent: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const confirm = (record: any) => {
    deleteItem(record);
    message.success("Click on Yes");
  };
  const cancel = () => {
    message.error("Click on No");
  };

  const columns = [
    {
      title: <span className="font-extrabold text-18">Rooms</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span className="font-extrabold text-18">Tags</span>,
      dataIndex: "tags",
      key: "tags",
    },
    {
      key: "action",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button className="text-black mr-1" onClick={() => editItem(record)}>
            Edit
          </Button>

          <Popconfirm
            className="text-black"
            title="Are you sure to delete this task?"
            onConfirm={() => confirm(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const editItem = (item: any) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const deleteItem = (item: any) => {
    const updatedData = data.filter((d: any) => d.id !== item.id);
    setData(updatedData);
  };

  const handleSave = (editedItem: any) => {
    if (selectedItem) {
      const updatedData = data.map((d: any) =>
        d.id === selectedItem.id ? { ...d, ...editedItem } : d
      );
      setData(updatedData);
    } else {
      const newItem = {
        ...editedItem,
        id: data.length + 1,
      };
      setData([...data, newItem]);
    }
    setIsModalVisible(false);
    setSelectedItem(null);
  };
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // Rest of the code...

  const handleAddModalOpen = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalVisible(false);
  };

  return (
    <div>
      <div className="flex text-black w-3/4 justify-end items-end mt-40">
        <Button
          className="text-black w-100 h-30 rounded-md text-center"
          onClick={handleAddModalOpen}
        >
          ADD
        </Button>

        <Modal open={isAddModalVisible} onCancel={handleAddModalClose}>
          <Typography className="fw-800 text-2xl">Add House Level</Typography>
          <div className="flex w-full">
            <Input type="text" name="name" placeholder=" Add House Level" />
          </div>
        </Modal>
      </div>
      <div className="">
        <Table dataSource={data} columns={columns} />
        <Modal
          title={selectedItem ? "Edit Item" : "Add Item"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
        >
          <ItemForm item={selectedItem} onSave={handleSave} />
        </Modal>
      </div>
    </div>
  );
};

const ItemForm: React.FC<any> = ({ item, onSave }) => {
  const [formData, setFormData] = useState(item || {});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="flex  justify-center flex-col" onSubmit={handleSubmit}>
      <div className="flex w-100%">
        <Input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default TableComponent;
