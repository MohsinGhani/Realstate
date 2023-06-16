"use client";

import React, { useState } from "react";

import { Button, Descriptions, Input, QRCode, Tabs, Typography } from "antd";
import { useRouter } from "next/navigation";
import withAuth from "@/components/common/withAuth";
import { useAppSelector } from "@/redux/hooks";
import AddHouseImg from "@/components/Home/AddHouseImg";
import EditUserDetails from "@/components/Home/EditUserDetails";
import Exterior from "@/components/Home/Exterior";

const HomePage = () => {
  const { user } = useAppSelector((state: any) => state?.userReducer);
  const router = useRouter();
  const { Title } = Typography;

  const [isModalOpen, setIsModalOpen] = useState({ image: false, user: false });

  const handleCancel = () => {
    setIsModalOpen({ image: false, user: false });
  };

  const showModal = (type: any) => {
    setIsModalOpen({ ...isModalOpen, ...type });
  };

  let link: any = "";
  if (typeof window !== "undefined") {
    link = `${window?.location?.origin}/registration?street=${user?.street}&city=${user?.city}&state=${user?.state}&zipCode=${user?.zipCode}&contractorCode=${user?.contractorCode}&recieverEmail=${user?.recieverEmail}`;
  }

  const items: any = [
    {
      key: "1",
      label: `Exterior`,
      children: <Exterior />,
    },
    {
      key: "2",
      label: `Interior`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: `Utilities`,
      children: `Utilities`,
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <Title level={3}>User Inforamtion</Title>
          <Button
            onClick={() => {
              showModal({ user: true });
            }}
          >
            Edit User
          </Button>
          <EditUserDetails
            user={user}
            open={isModalOpen?.user}
            handleCancel={handleCancel}
          />
        </div>
        <div className="flex">
          <Descriptions>
            <Descriptions.Item label="UserName">{`${user?.firstName} ${user?.lastName}`}</Descriptions.Item>
            <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="City">{user?.city}</Descriptions.Item>
            <Descriptions.Item label="State">{user?.state}</Descriptions.Item>
            <Descriptions.Item label="Street">{user?.street}</Descriptions.Item>
            <Descriptions.Item label="ZipCode">
              {user?.zipCode}
            </Descriptions.Item>
            <Descriptions.Item label="Contractor Code">
              {user?.contractorCode}
            </Descriptions.Item>
          </Descriptions>

          <div className="flex justify-center flex-col items-center mb-4">
            <QRCode value={link} size={250} />
            <Input maxLength={60} value={link} readOnly />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <Title level={3}>House Image</Title>
          <Button
            onClick={() => {
              showModal({ image: true });
            }}
          >
            Add Image
          </Button>
          <AddHouseImg
            user={user}
            open={isModalOpen?.image}
            handleCancel={handleCancel}
          />
        </div>
        {user?.image && (
          <img
            src={`https://real-estate-1.s3.us-east-2.amazonaws.com/${
              user?.image
            }?${Math.random()}`}
            alt=""
            width={"100%"}
            height={500}
            className="object-contain rounded"
          />
        )}
      </div>
      <div className="">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default withAuth(HomePage);
