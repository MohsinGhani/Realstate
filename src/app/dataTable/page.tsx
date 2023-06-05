"use client";
import React, { useState } from "react";
import { Table, Button, Modal, Typography, message, Popconfirm } from "antd";

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

const TableComponent: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const confirm = (record: any) => {
    console.log("🚀  record:", record);
    deleteItem(record);
    message.success("Click on Yes");
  };
  const cancel = () => {
    message.error("Click on No");
  };

  const columns = [
    {
      title: <span className="font-extrabold text-18">House Levels</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      key: "action",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            className="bg-yellow-400 border-none text-black mr-1"
            onClick={() => editItem(record)}
          >
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
            <Button className="bg-red-900 text-white" href="#">
              Delete
            </Button>
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
          className="bg-yellow-400 border-none text-black w-100 h-30 rounded-md text-center"
          onClick={handleAddModalOpen}
        >
          ADD
        </Button>

        <Modal
          open={isAddModalVisible}
          onCancel={handleAddModalClose}
          footer={null}
        >
          <form
            className="flex justify-center flex-col"

            // onSubmit={handleSubmit}
          >
            <Typography className="fw-800 text-2xl">Add House Level</Typography>
            <div className="flex w-full">
              <input
                className="w-full h-6 mb-4 mt-5  border-2 rounded-md px-1.5   pb-px"
                type="text"
                name="name"
                // value={formData.name || ""}
                // onChange={handleChange}
                placeholder=" Add House Level"
              />
            </div>

            <div className="flex  justify-end  bg-maroon-800">
              <button
                className="bg-red-900  text-slate-50 border-none w-1/5 rounded-md h-8 mr-2"
                onClick={handleAddModalClose}
                type="submit"
              >
                Close
              </button>
              <button
                className="bg-yellow-400 border-none text-slate-950 w-1/5 rounded-md h-8 "
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <div className="mt-100 flex justify-center  flex-row mt-12">
        <Table
          className=""
          style={{
            width: "50%",
          }}
          dataSource={data}
          columns={columns}
          pagination={false}
        />
        <Modal
          title={selectedItem ? "Edit Item" : "Add Item"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
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
        <input
          className="w-full h-6 mb-4  border-2 rounded-md px-1.5   pb-px"
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex  justify-end">
        <button
          className="bg-yellow-400 border-none  text-slate-950  w-1/5 rounded-md h-8"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TableComponent;
