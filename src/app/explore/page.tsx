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
import AddExplore from "@/components/AddExplore";
import withAuth from "@/components/common/withAuth";
import { useAxo } from "@/services/helpers/api";
import { API, typeDetailExterior, typeDetailRoom } from "@/services/constant";
import { useAppSelector } from "@/redux/hooks";
import { putFileToS3, removeFileToS3 } from "@/services/s3Service";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import Link from "next/link";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/services/helpers";

const iconProps = {
  rev: undefined,
};

const ExplorePage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state?.userReducer);
  const searchParams: any = useSearchParams();
  const role = searchParams.get("role");

  const deletePhotes = useRef([]);

  const [typeFields, setTypeFields] = useState<any>([]);
  const [loader, setLoader] = useState<any>(false);
  const [isModalVisible, setIsModalVisible] = useState({
    modal: false,
    id: null,
  });

  const [{ loading, data }, userExplorePost] = useAxo("post", API.USER_EXPLORE);

  useEffect(() => {
    if (user?.id && role) {
      userExplorePost({ userId: user?.id, role });
    } else if (role === null) {
      router.push(`/explore?role=room`);
    }
  }, [user?.id, role]);

  const handleAddModalOpen = (id = null) => {
    setIsModalVisible({ id, modal: true });

    if (!id) {
      form.setFieldsValue({ name: `${role} ${data?.length + 1}` });
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
      await userExplorePost({ userId: user?.id, deleteId: item?.id, role });

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
    const parseData =
      role === "room"
        ? updateData(JSON.parse(item?.typeField))
        : updateData2(JSON.parse(item?.typeField));

    setTypeFields(
      Object.entries(parseData)?.map(([key, value]: any) => ({
        name: key,
        typeDetail: role === "room" ? typeDetailRoom : typeDetailExterior,
      }))
    );

    form.setFieldsValue({
      name: item?.name,
      type: item.type,
      roomLevel: item.roomLevel,
      ...parseData,
    });
    handleAddModalOpen(item?.id);
  };

  const handleOnFinish = async () => {
    try {
      setLoader(true);
      const { changeName, addFieldName, name, type, roomLevel, ...rest } =
        await form.validateFields();

      const updatedData =
        role === "room"
          ? await uploadImages(rest, role)
          : await uploadImages2(rest, role);

      if (!!deletePhotes.current.length) {
        deletePhotes.current?.forEach((t: any) => {
          removeFileToS3(t);
        });
      }

      await userExplorePost({
        id: isModalVisible?.id,
        userId: user.id,
        name,
        roomLevel,
        type,
        role,
        typeField: JSON.stringify(updatedData),
      });

      handleAddModalClose(true);
    } catch (err) {
      console.log("err:", err);
    } finally {
      setLoader(false);
    }
  };

  const columns: any = [
    {
      title: capitalizeFirstLetter(role),
      dataIndex: "name",
      key: "name",
    },
    ...(role === "room"
      ? [
          {
            title: "Room Level",
            dataIndex: "roomLevel",
            key: "roomLevel",
          },
        ]
      : []),
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
            title: capitalizeFirstLetter(role),
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
          {`Add ${capitalizeFirstLetter(role)}`}
        </Button>
      </div>

      <Table
        dataSource={(data || [])?.map((t: any, i: any) => ({ ...t, key: i }))}
        columns={columns}
        loading={loading || loader}
      />

      <Modal
        title={
          !isModalVisible?.id
            ? `Add ${capitalizeFirstLetter(role)}/Hallway`
            : `Edit ${capitalizeFirstLetter(role)}/Hallway`
        }
        open={isModalVisible?.modal}
        className="top-[20px]"
        closable={false}
        width={700}
        footer={[
          <Button
            key="cancel"
            onClick={() => handleAddModalClose(!!isModalVisible?.id)}
            disabled={loading || loader}
          >
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleOnFinish}
            loading={loading || loader}
          >
            {!isModalVisible?.id ? "Save" : "Update"}
          </Button>,
        ]}
      >
        <AddExplore
          form={form}
          typeFields={typeFields}
          setTypeFields={setTypeFields}
          deletePhotes={deletePhotes}
          role={role}
        />
      </Modal>
    </div>
  );
};

export default withAuth(ExplorePage);

const uploadImages = async (data: any, role: any) => {
  const updatedData = { ...data };

  for (const key in updatedData) {
    if (updatedData.hasOwnProperty(key)) {
      const picture = updatedData[key].Picture?.[0];
      const receipt = updatedData[key].Receipt?.[0];

      if (picture?.originFileObj) {
        const keyPicture = `${role.toUpperCase()}/${uuidv4()}.webp`;
        updatedData[key].Picture = keyPicture;
        await putFileToS3(keyPicture, picture.originFileObj);
      } else {
        updatedData[key].Picture = picture?.name;
      }

      if (receipt?.originFileObj) {
        const keyReceipt = `${role.toUpperCase()}/${uuidv4()}.webp`;
        updatedData[key].Receipt = keyReceipt;
        await putFileToS3(keyReceipt, receipt.originFileObj);
      } else {
        updatedData[key].Receipt = receipt?.name;
      }
    }
  }

  return updatedData;
};

const uploadImages2 = async (data: any, role: any) => {
  const updatedData = { ...data };

  for (const key in updatedData) {
    if (!updatedData.hasOwnProperty(key)) continue;

    const handlePhotos = async (type: string, photos: any[]) => {
      const clonedPhotos = structuredClone(
        photos?.map((photo: any) => ({
          originFileObj: photo?.originFileObj,
          uid: photo?.uid,
        }))
      );

      if (!!clonedPhotos?.length) {
        updatedData[key][type] = [];
        for (const t of clonedPhotos) {
          if (t?.originFileObj) {
            const keyPicture = `${role.toUpperCase()}/${uuidv4()}.webp`;
            updatedData[key][type].push(keyPicture);
            await putFileToS3(keyPicture, t.originFileObj);
          } else {
            updatedData[key][type].push(t.uid);
          }
        }
      }
    };

    await handlePhotos("ProjectPhotos", updatedData[key]?.ProjectPhotos || []);
    await handlePhotos(
      "WarrantyPhotos",
      updatedData[key]?.WarrantyPhotos || []
    );
  }

  return updatedData;
};

const updateData = (data: any) => {
  return Object.entries(data).reduce((acc: any, [key, value]: any) => {
    acc[key] = {
      ...value,
      InstallDate: value.InstallDate ? dayjs(value.InstallDate) : undefined,

      Picture: value.Picture
        ? [
            {
              uid: value.Picture,
              name: `${value.Picture}`,
              status: "done",
              url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${value.Picture}`,
            },
          ]
        : undefined,

      Receipt: value.Receipt
        ? [
            {
              uid: value.Receipt,
              name: `${value.Receipt}`,
              status: "done",
              url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${value.Receipt}`,
            },
          ]
        : undefined,
    };
    return acc;
  }, {});
};

const updateData2 = (data: any) => {
  return Object.entries(data).reduce((acc: any, [key, value]: any) => {
    acc[key] = {
      ...value,
      InstallDate: value.InstallDate ? dayjs(value.InstallDate) : undefined,

      ProjectPhotos: value?.ProjectPhotos
        ? value?.ProjectPhotos?.map((t: any) => ({
            uid: t,
            name: "Picture",
            status: "done",
            url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${t}`,
          }))
        : undefined,

      WarrantyPhotos: value?.WarrantyPhotos
        ? value?.WarrantyPhotos?.map((t: any) => ({
            uid: t,
            name: "Picture",
            status: "done",
            url: `https://real-estate-1.s3.us-east-2.amazonaws.com/${t}`,
          }))
        : undefined,
    };
    return acc;
  }, {});
};
