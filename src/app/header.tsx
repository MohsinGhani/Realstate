// import { Dropdown, Space } from "antd";
// import Link from "next/link";
// import React from "react";
// import { UnorderedListOutlined } from "@ant-design/icons";
// import { MenuProps } from "@headlessui/react";
// import Registration from "@/components/Registration";

// const items: MenuProps["items"] = [
//   {
//     label: (
//       <span>
//         {" "}
//         <Registration /> 1st menu items
//       </span>
//     ),
//     key: "0",
//   },
//   {
//     label: <a>2nd menu item</a>,
//     key: "1",
//   },
//   {
//     type: "divider",
//   },
//   {
//     label: "3rd menu item",
//     key: "3",
//   },
// ];

// const Header: React.FC = () => {
//   console.log("items", items);
//   return (
//     <nav className="block w-full shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border border-white/80 bg-white text-white sticky inset-0 h-max max-w-full rounded py-2 px-4 lg:px-8 lg:py-4 mb-8 z-50">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <Link href={`/`}>
//             <img
//               src="/assets/images/images.png"
//               className="h-12 mr-3 text-green-700"
//               alt="Logo"
//             />
//           </Link>
//         </div>
//         <Dropdown
//           className="text-green-700"
//           menu={{ items }}
//           trigger={["click"]}

//           // onOpenChange={items}
//         >
//           {/* <button>registration</button> */}

//           <a onClick={(e: React.MouseEvent) => e.preventDefault()}>
//             <Space>
//               <UnorderedListOutlined />
//             </Space>
//           </a>
//         </Dropdown>
//       </div>
//     </nav>
//   );
// };

// export default Header;
