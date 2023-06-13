"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Popconfirm,
  Space,
  Form,
  Breadcrumb,
} from "antd";
import AddRoom from "@/components/AddRoom";
import withAuth from "@/components/common/withAuth";
import { useAxo } from "../../../services/helpers/api";
import { API } from "../../../services/constant";
import { useAppSelector } from "@/redux/hooks";
import { putFileToS3 } from "@/services/s3Service";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import moment from "moment";
import dayjs from "dayjs";

const RoomPage = () => {
  const [form] = Form.useForm();
  const { user } = useAppSelector((state: any) => state?.userReducer);
  const floorId = usePathname()?.split("/")[2];

  const [typeFields, setTypeFields] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState({
    modal: false,
    id: null,
  });

  const [{ loading, data }, userRoomsPost] = useAxo("post", API.USER_ROOMS);

  useEffect(() => {
    if (user?.id && floorId) {
      userRoomsPost({ floorId });
    }
  }, [user, floorId]);

  const handleAddModalOpen = (id = null) => {
    setIsModalVisible({ id, modal: true });
  };

  const handleAddModalClose = (reset = false) => {
    setIsModalVisible({ id: null, modal: false });

    if (reset) {
      form.resetFields();
      setTypeFields([]);
    }
  };

  const deleteItem = async (item: any) => {
    try {
      await userRoomsPost({ floorId, deleteId: item?.id });
    } catch (err) {
      console.log("err:", err);
    }
  };

  const editItem = (item: any) => {
    const parseData = updateDate(JSON.parse(item?.typeField));

    setTypeFields(
      Object.keys(parseData)?.map((t: any) => ({
        title: t,
        name: t,
        isDeleted: true,
      }))
    );

    form.setFieldsValue({ name: item?.name, type: item.type, ...parseData });
    handleAddModalOpen(item?.id);
  };

  const handleOnFinish = async () => {
    try {
      const { addFieldName, name, type, ...rest } = await form.validateFields();
      const updatedData = updatePic(rest);

      await userRoomsPost({
        id: isModalVisible?.id,
        userId: user.id,
        floorId,
        name,
        type,
        typeField: JSON.stringify(updatedData),
      });

      handleAddModalClose(true);
    } catch (err) {
      console.log("err:", err);
    }
  };

  const columns: any = [
    {
      title: "Rooms",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
            title="Are you sure to delete this room?"
            onConfirm={() => deleteItem(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/levels">Floor</Breadcrumb.Item>
        <Breadcrumb.Item>Room</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          onClick={() => handleAddModalOpen(null)}
          disabled={loading}
        >
          Add Room
        </Button>
      </div>

      <Table
        dataSource={(data || [])?.map((t: any, i: any) => ({ ...t, key: i }))}
        columns={columns}
        loading={loading}
      />

      <Modal
        title={!isModalVisible?.id ? "Add Room/Hallway" : "Edit Room/Hallway"}
        open={isModalVisible?.modal}
        className="top-[20px]"
        closable={false}
        width={700}
        footer={[
          <Button
            key="cancel"
            onClick={() => handleAddModalClose(!!isModalVisible?.id)}
            disabled={loading}
          >
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleOnFinish}
            loading={loading}
          >
            {!isModalVisible?.id ? "Save" : "Update"}
          </Button>,
        ]}
      >
        <AddRoom
          form={form}
          typeFields={typeFields}
          setTypeFields={setTypeFields}
        />
      </Modal>
    </div>
  );
};

export default withAuth(RoomPage);

const updatePic = (data: any) => {
  let updatedData = { ...data };
  for (const key in updatedData) {
    if (updatedData.hasOwnProperty(key)) {
      if (updatedData[key].Picture?.file?.originFileObj) {
        const keyPicture = `ROOMS/${uuidv4()}.webp`;
        putFileToS3(keyPicture, updatedData[key].Picture?.file?.originFileObj);
        updatedData[key].Picture = keyPicture;
      }

      if (updatedData[key].Receipt?.file?.originFileObj) {
        const keyReceipt = `ROOMS/${uuidv4()}.webp`;
        putFileToS3(keyReceipt, updatedData[key].Receipt?.file?.originFileObj);
        updatedData[key].Receipt = keyReceipt;
      }
    }
  }

  return updatedData;
};

const updateDate = (data: any) => {
  let updatedData = { ...data };

  for (const key in updatedData) {
    if (updatedData.hasOwnProperty(key)) {
      updatedData[key].InstallDate = dayjs(updatedData[key].InstallDate);
    }
  }

  return updatedData;
};
