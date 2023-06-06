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
  Space,
} from "antd";
import { useRouter } from "next/navigation";

const initialData = [
  {
    id: 1,
    name: "Floor 1",
  },
  {
    id: 2,
    name: "Floor 2",
  },
  {
    id: 3,
    name: "Floor 3 ",
  },
  {
    id: 4,
    name: "Floor 4",
  },
  {
    id: 5,
    name: "Floor 5",
  },
];

const TableComponent = () => {
  const [data, setData] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const confirm = (record: any) => {
    deleteItem(record);
    message.success("Click on Yes");
  };
  const cancel = () => {
    message.error("Click on No");
  };

  const columns: any = [
    {
      title: <span className="font-extrabold text-18">House Levels</span>,
      dataIndex: "name",
      key: "name",
      render: (row: any) => (
        <Space
          onClick={() => {
            router.push("/levels/123");
          }}
        >
          {row}
        </Space>
      ),
    },
    {
      key: "action",
      align: "right",

      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => editItem(record)}>
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
        </Space>
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

  const handleAddModalOpen = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalVisible(false);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={handleAddModalOpen}>
          Add Level
        </Button>
      </div>

      <Table dataSource={data} columns={columns} />

      <Modal open={isAddModalVisible} onCancel={handleAddModalClose}>
        <Typography className="fw-800 text-2xl">Add House Level</Typography>
        <Input type="text" name="name" placeholder=" Add House Level" />
      </Modal>

      <Modal
        title={selectedItem ? "Edit Item" : "Add Item"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      >
        <ItemForm item={selectedItem} onSave={handleSave} />
      </Modal>
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
