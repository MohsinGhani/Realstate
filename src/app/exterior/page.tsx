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
import AddExterior from "@/components/AddExterior";
import withAuth from "@/components/common/withAuth";
import { useAxo } from "../../services/helpers/api";
import { API } from "../../services/constant";
import { useAppSelector } from "@/redux/hooks";
import { putFileToS3 } from "@/services/s3Service";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import Link from "next/link";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const iconProps = {
  rev: undefined,
};

const ExteriorPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state?.userReducer);

  const [typeFields, setTypeFields] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState({
    modal: false,
    id: null,
  });

  const [{ loading, data }, userExteriorPost] = useAxo(
    "post",
    API.USER_EXTERIOR
  );

  useEffect(() => {
    if (user?.id) {
      userExteriorPost({ userId: user?.id });
    }
  }, [user?.id]);

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
      await userExteriorPost({ userId: user?.id, deleteId: item?.id });
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
      }))
    );

    form.setFieldsValue({ name: item?.name, type: item.type, ...parseData });
    handleAddModalOpen(item?.id);
  };

  const handleOnFinish = async () => {
    try {
      const { name, type, ...rest } = await form.validateFields();

      const updatedData = uploadImages(rest);

      const payload = {
        id: isModalVisible?.id,
        userId: user.id,
        name,
        type,
        typeField: JSON.stringify(updatedData),
      };

      await userExteriorPost(payload);
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
            title: "Exterior",
          },
        ]}
      />

      <div className="flex justify-between my-4">
        <Button
          onClick={() => router.push("/")}
          icon={<ArrowLeftOutlined {...iconProps} />}
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={() => handleAddModalOpen(null)}
          disabled={loading}
        >
          Add Exterior
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
        <AddExterior
          form={form}
          typeFields={typeFields}
          setTypeFields={setTypeFields}
        />
      </Modal>
    </div>
  );
};

export default withAuth(ExteriorPage);

const uploadImages = (data: any) => {
  const updatedData = { ...data };

  for (const key in updatedData) {
    if (updatedData.hasOwnProperty(key)) {
      const clonedProjectPhotos = structuredClone(
        updatedData[key]?.ProjectPhotos?.map((photo: any) => ({
          originFileObj: photo?.originFileObj,
          uid: photo?.uid,
        }))
      );

      if (!!clonedProjectPhotos?.length) {
        updatedData[key].ProjectPhotos = [];
        clonedProjectPhotos?.forEach((t: any) => {
          if (t?.originFileObj) {
            const keyPicture = `EXTERIOR/${uuidv4()}.webp`;
            updatedData[key].ProjectPhotos.push(keyPicture);
            putFileToS3(keyPicture, t.originFileObj);
          } else {
            updatedData[key].ProjectPhotos.push(t.uid);
          }
        });
      }

      const clonedWarrantyPhotos = structuredClone(
        updatedData[key]?.WarrantyPhotos?.map((photo: any) => ({
          originFileObj: photo?.originFileObj,
          uid: photo?.uid,
        }))
      );

      if (!!clonedWarrantyPhotos?.length) {
        updatedData[key].WarrantyPhotos = [];
        clonedWarrantyPhotos?.forEach((t: any) => {
          if (t?.originFileObj) {
            const keyPicture = `EXTERIOR/${uuidv4()}.webp`;
            updatedData[key].WarrantyPhotos.push(keyPicture);
            putFileToS3(keyPicture, t.originFileObj);
          } else {
            updatedData[key].WarrantyPhotos.push(t.uid);
          }
        });
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
      Warranty: dayjs(value.Warranty),

      ProjectPhotos: value?.ProjectPhotos?.map((t: any) => ({
        uid: t,
        name: "Picture",
        status: "done",
        url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${t}`,
      })),

      WarrantyPhotos: value?.WarrantyPhotos?.map((t: any) => ({
        uid: t,
        name: "Picture",
        status: "done",
        url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${t}`,
      })),
    };
    return acc;
  }, {});
};
