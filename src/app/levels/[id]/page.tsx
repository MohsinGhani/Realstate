"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { putFileToS3, removeFileToS3 } from "@/services/s3Service";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const RoomPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state?.userReducer);
  const floorId = usePathname()?.split("/")[2];
  const deletePhotes = useRef([]);

  const [typeFields, setTypeFields] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState({
    modal: false,
    id: null,
  });

  const [{ loading, data }, userRoomsPost] = useAxo("post", API.USER_ROOMS);

  const iconProps = {
    rev: undefined,
  };

  useEffect(() => {
    if (user?.id && floorId) {
      userRoomsPost({ floorId });
    }
  }, [user?.id, floorId]);

  const handleAddModalOpen = (id = null) => {
    setIsModalVisible({ id, modal: true });

    if (!id) {
      form.setFieldsValue({ name: `room ${data?.length + 1}` });
    }
  };

  const handleAddModalClose = (reset = false) => {
    setIsModalVisible({ id: null, modal: false });

    if (reset) {
      form.resetFields();
      setTypeFields([]);
      deletePhotes.current = [];
    }
  };

  const deleteItem = async (item: any) => {
    const forImages = JSON.parse(item?.typeField);
    const deleteimages: any = [];

    Object.entries(forImages).forEach(([_, value]: any) => {
      deleteimages.push(value.Picture, value.Receipt);
    });

    try {
      await userRoomsPost({ floorId, deleteId: item?.id });

      if (!!deleteimages.length) {
        deleteimages?.forEach((t: any) => {
          removeFileToS3(t);
        });
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  const editItem = (item: any) => {
    const parseData = updateData(JSON.parse(item?.typeField));
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

      const updatedData = uploadImages(rest);

      if (!!deletePhotes.current.length) {
        deletePhotes.current?.forEach((t: any) => {
          removeFileToS3(t);
        });
      }

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
      <Breadcrumb
        items={[
          {
            title: (
              <Link href="/">
                <Space>
                  <HomeOutlined {...iconProps} />
                  Home
                </Space>
              </Link>
            ),
          },
          {
            title: <Link href="/levels">Floor</Link>,
          },
          {
            title: "Room",
          },
        ]}
      />

      <div className="flex justify-between my-4">
        <Button
          onClick={() => router.push("/levels")}
          icon={<ArrowLeftOutlined {...iconProps} />}
        >
          Back
        </Button>
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
          deletePhotes={deletePhotes}
        />
      </Modal>
    </div>
  );
};

export default withAuth(RoomPage);

const uploadImages = (data: any) => {
  const updatedData = { ...data };

  for (const key in updatedData) {
    if (updatedData.hasOwnProperty(key)) {
      const picture = updatedData[key].Picture?.[0];
      const receipt = updatedData[key].Receipt?.[0];

      if (picture?.originFileObj) {
        const keyPicture = `ROOMS/${uuidv4()}.webp`;
        updatedData[key].Picture = keyPicture;
        putFileToS3(keyPicture, picture.originFileObj);
      } else {
        updatedData[key].Picture = picture?.name;
      }

      if (receipt?.originFileObj) {
        const keyReceipt = `ROOMS/${uuidv4()}.webp`;
        updatedData[key].Receipt = keyReceipt;
        putFileToS3(keyReceipt, receipt.originFileObj);
      } else {
        updatedData[key].Receipt = receipt?.name;
      }
    }
  }

  return updatedData;
};

const updateData = (data: any) => {
  return Object.entries(data).reduce((acc: any, [key, value]: any) => {
    acc[key] = {
      ...value,
      InstallDate: dayjs(value.InstallDate),

      Picture: [
        {
          uid: value.Picture,
          name: `${value.Picture}`,
          status: "done",
          url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${value.Picture}`,
        },
      ],

      Receipt: [
        {
          uid: value.Receipt,
          name: `${value.Receipt}`,
          status: "done",
          url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${value.Receipt}`,
        },
      ],
    };
    return acc;
  }, {});
};
