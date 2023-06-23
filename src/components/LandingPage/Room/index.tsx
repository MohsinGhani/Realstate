import React, { useEffect } from "react";

import { API } from "@/services/constant";
import { useAxo } from "@/services/helpers/api";
import { useAppSelector } from "@/redux/hooks";
import { Button, Table } from "antd";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/services/helpers";

const Room = ({ role }: any) => {
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state?.userReducer);

  const [{ loading, data }, userExplorePost] = useAxo("post", API.USER_EXPLORE);

  useEffect(() => {
    if (user?.id && role) {
      userExplorePost({ userId: user?.id, role });
    }
  }, [user?.id, role]);

  const columns: any = [
    {
      title: "Rooms",
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
  ];

  return (
    <div>
      <div className="flex justify-end my-4">
        <Button
          type="primary"
          onClick={() => {
            router.push(`/explore?role=${role}`);
          }}
        >
          {`Add ${capitalizeFirstLetter(role)}`}
        </Button>
      </div>
      <Table
        dataSource={(data || [])?.map((t: any, i: any) => ({ ...t, key: i }))}
        columns={columns}
        loading={loading}
      />
    </div>
  );
};

export default Room;
