"use client";
import React, { useState } from "react";
import { Table, Button, Modal, Typography } from "antd";

const initialData = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    address: "123 Main Street",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 30,
    address: "456 Park Avenue",
  },
  {
    id: 3,
    name: "Jane Smith",
    age: 30,
    address: "456 Park Avenue",
  },
  {
    id: 4,
    name: "Jane Smith",
    age: 30,
    address: "456 Park Avenue",
  },
  {
    id: 5,
    name: "Jane Smith",
    age: 30,
    address: "456 Park Avenue",
  },
];

const TableComponent: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: (
        <span
          style={{
            fontWeight: "800",
            fontSize: "18px",
          }}
        >
          House Levels
        </span>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      key: "action",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{
              backgroundColor: "#F9C70C",
              border: "none",
              color: "black",
              marginRight: "5px",
            }}
            onClick={() => editItem(record)}
          >
            Edit
          </Button>
          <Button
            style={{
              backgroundColor: "#800000",
              border: "none",
              color: "white",
            }}
            onClick={() => deleteItem(record)}
          >
            Delete
          </Button>
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
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Table
          style={{
            width: "50%",
          }}
          dataSource={data}
          columns={columns}
          pagination={false}
        />
        <Modal
          title={selectedItem ? "Edit Item" : "Add Item"}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <ItemForm item={selectedItem} onSave={handleSave} />
        </Modal>
      </div>
      <div
        style={{
          display: "flex",

          color: "black",
          width: "74.555%",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginTop: "40px",
        }}
      >
        <Button
          style={{
            backgroundColor: "#F9C70C",
            border: "none",
            color: "black",
            // marginRight: "5px",
            width: "100px",
            height: "30px",
            borderRadius: "6px",
            // fontWeight: "600",
            textAlign: "center",
          }}
          onClick={handleAddModalOpen}
        >
          ADD
        </Button>

        <Modal
          visible={isAddModalVisible}
          onCancel={handleAddModalClose}
          footer={null}
        >
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
            className="w-1/4"
            // onSubmit={handleSubmit}
          >
            <Typography
              style={{
                fontWeight: "800",
                fontSize: "18px",
              }}
            >
              Add House Level
            </Typography>
            <div
              style={{
                display: "flex",
                width: "100%",
              }}
              className="flex items-center"
            >
              <input
                style={{
                  width: "100%",
                  height: "20px",
                  marginBottom: "20px",
                  marginTop: "50px",
                }}
                type="text"
                name="name"
                // value={formData.name || ""}
                // onChange={handleChange}
                placeholder=" Add House Level"
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={handleAddModalClose}
                type="submit"
                style={{
                  backgroundColor: "#800000",
                  border: "none",
                  color: "white",
                  // marginRight: "5px",
                  width: "100px",
                  height: "30px",
                  borderRadius: "6px",
                  textAlign: "center",
                }}
              >
                Close
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: "#F9C70C",
                  border: "none",
                  color: "black",
                  // marginRight: "5px",
                  width: "100px",
                  height: "30px",
                  borderRadius: "6px",
                  textAlign: "center",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

// Sample Add/Edit Form Component
const ItemForm: React.FC<any> = ({ item, onSave }) => {
  const [formData, setFormData] = useState(item || {});
  console.log("🚀 ~ formData:", formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      className="w-1/4"
      onSubmit={handleSubmit}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
        className="flex items-center"
      >
        <input
          style={{
            width: "100%",
            height: "20px",
            marginBottom: "20px",
          }}
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          type="submit"
          style={{
            backgroundColor: "#F9C70C",
            border: "none",
            color: "black",
            // marginRight: "5px",
            width: "100px",
            height: "30px",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TableComponent;
