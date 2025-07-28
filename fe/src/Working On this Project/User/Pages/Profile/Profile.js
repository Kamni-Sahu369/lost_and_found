// import React, { useState, useEffect } from "react";
// import { Row, Col } from "antd";
// import {
//   Button,
//   Modal,
//   Form,
//   Input,
//   DatePicker,
//   Upload,
//   Radio,
//   Select,
//   Checkbox,
//   message,
//   Divider,
//   Typography,
// } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import "./Profile.css";
// import {
//   updateProfile,
//   updateProfile_get,
//   getPracticeList,
//   updateUserPassword,
// } from "../../../Api/Service";
// import moment from "moment";

// const { TextArea } = Input;
// const { Option } = Select;
// const { Title } = Typography;

// function Profile() {
//   const [user, setUser] = useState([]);
//   const [regUser, setregUser] = useState([]);
//   // const [practiceList, setPracticeList] = useState([]);

//   const [form] = Form.useForm();
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

//   const showProfileModal = () => {
//     const savedData = JSON.parse(localStorage.getItem("registerData")) || {};
//     const mergedData = {
//       ...savedData, // LocalStorage registration data
//       ...user, // Backend profile data overrides
//       dob: user?.dob ? moment(user.dob) : null,
//       agreement: user?.agreement === "true",
//     };

//     form.setFieldsValue(mergedData);
//     setIsProfileModalOpen(true);
//   };

//   const handleProfileCancel = () => {
//     setIsProfileModalOpen(false);
//     form.resetFields();
//   };

//   const showPasswordModal = () => setIsPasswordModalOpen(true);
//   const handlePasswordCancel = () => setIsPasswordModalOpen(false);

//   const handleProfileFinish = async (values) => {
//     try {
//       const data = await updateProfile(values);
//       alert("Profile updated successfully!");
//       setIsProfileModalOpen(false);
//       // setPracticeList(data)
//       fetchProfile();
//       console.log(data);
//     } catch (error) {
//       console.error("Profile update failed:", error);
//       alert("Failed to update profile.");
//     }
//   };

//   const handlePasswordFinish = async (values) => {
//     alert("cvfbgb db");
//     try {
//       await updateUserPassword(values.id, values);
//       message.success("Password changed successfully!");
//       setIsPasswordModalOpen(false);
//     } catch (error) {
//       console.error("Error changing password:", error);
//       message.error("Failed to change password.");
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       const data = await updateProfile_get(localStorage.getItem("user_id"));
//       setUser(data);
//       console.log("dataaaa", data);
//       const savedData = JSON.parse(localStorage.getItem("registerData"));
//       console.log(savedData);
//     } catch (error) {
//       console.error("Failed to fetch profile:", error);
//       message.error("Failed to load profile.");
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//     profileData();
//   }, []);

//   const profileData = async () => {
//     const data = await getPracticeList();
//     console.log(data);
//   };

//   return (
//     <div>
//       {/* Header Buttons */}
//       <div className="profile_header_main">
//         <Button type="primary" onClick={showProfileModal}>
//           Create / Update Profile
//         </Button>
//         <Button type="primary" onClick={showPasswordModal}>
//           Change Password
//         </Button>
//       </div>

//       {/* Profile Modal */}
//       {/* <Modal
//         title={
//           <Title level={3} style={{ color: "#1677ff", marginBottom: 0 }}>
//             Create Your Profile
//           </Title>
//         }
//         open={isProfileModalOpen}
//         onCancel={handleProfileCancel}
//         footer={null}
//         bodyStyle={{ padding: "24px 32px" }}
//       >
//         <Form layout="vertical" form={form} onFinish={handleProfileFinish}>
//           <Divider orientation="left" orientationMargin={0}>
//             <strong style={{ color: "#52c41a" }}>Basic Information</strong>
//           </Divider>

//           <Form.Item
//             name="name"
//             label={<span style={{ color: "#595959" }}>Full Name</span>}
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Enter your name" />
//           </Form.Item>

//           <Form.Item
//             name="email"
//             label={<span style={{ color: "#595959" }}>Email</span>}
//             rules={[{ required: true, type: "email" }]}
//           >
//             <Input placeholder="Enter your email" />
//           </Form.Item>

//           <Form.Item
//             name="phone"
//             label="Phone"
//             rules={[
//               { required: true, message: "Please enter your phone number" },
//               {
//                 pattern: /^\d{10}$/,
//                 message: "Phone number must be exactly 10 digits",
//               },
//             ]}
//           >
//             <Input
//               inputMode="numeric"
//               maxLength={10}
//               placeholder="10-digit number"
//               onKeyPress={(e) => {
//                 if (!/[0-9]/.test(e.key)) e.preventDefault();
//               }}
//               onChange={(e) => {
//                 e.target.value = e.target.value.replace(/\D/g, "");
//               }}
//             />
//           </Form.Item>

//           <Form.Item
//             name="alternate_phone"
//             label="Alternate Phone Number"
//             rules={[
//               {
//                 required: true,
//                 pattern: /^\d{10}$/,
//                 message: "Phone number must be exactly 10 digits",
//               },
//             ]}
//           >
//             <Input
//               // placeholder="+911234567890"
//               maxLength={10}
//               onChange={(e) => {
//                 e.target.value = e.target.value.replace(/[^0-9+]/g, "");
//               }}
//             />
//           </Form.Item>

//           <Form.Item name="gender" label="Gender"
//           rules={[
//             {required:true}
//           ]}>
//             <Radio.Group>
//               <Radio value="male">Male</Radio>
//               <Radio value="female">Female</Radio>
//               <Radio value="other">Other</Radio>
//             </Radio.Group>
//           </Form.Item>

//           <Form.Item name="dob" label="Date of Birth" 
//           rules={[
//             {required:true}
//           ]}>
//             <DatePicker style={{ width: "100%" }} />
//           </Form.Item>

//           <Divider orientation="left" orientationMargin={0}>
//             <strong style={{ color: "#722ed1" }}>Additional Details</strong>
//           </Divider>

//           <Form.Item
//             name="profile_pic"
//             label="Profile Picture"
//             valuePropName="fileList"
//             getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
//             rules={[
//             {required:true}
//           ]}
//           >
//             <Upload
//               name="profile_pic"
//               listType="picture"
//               beforeUpload={() => false}
//               maxCount={1}
//             >
//               <Button icon={<UploadOutlined />}>Upload</Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item name="address" label="Address"
//           rules={[
//             {required:true}
//           ]}
//           >
//             <TextArea rows={2} placeholder="Enter your full address" />
//           </Form.Item>

//           <Form.Item name="city" label="City" 
//           rules={[
//             {required:true}
//           ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item name="state" label="State" 
//           rules={[
//             {required:true}
//           ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item name="pincode" label="PIN Code" 
//           rules={[
//             {required:true}
//           ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="agreement"
//             valuePropName="checked"
//             rules={[
//               {
//                 validator: (_, value) =>
//                   value
//                     ? Promise.resolve()
//                     : Promise.reject("You must accept terms"),
//               },
//             ]}
//           >
//             <Checkbox>
//               I agree to the <a href="/terms">terms and conditions</a>.
//             </Checkbox>
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               block
//               style={{
//                 backgroundColor: "#13c2c2",
//                 borderColor: "#13c2c2",
//                 fontWeight: "bold",
//               }}
//             >
//               Save Profile
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal> */}







//       <Modal
//         className="Create_Your_Profile"
//         title={
//           <Title level={3} style={{ color: "#1677ff", marginBottom: 0 }}>
//             Create Your Profile
//           </Title>
//         }
//         open={isProfileModalOpen}
//         onCancel={handleProfileCancel}
//         footer={null}
//         bodyStyle={{
//           padding: "24px 32px",
//           maxHeight: "70vh",      // fixed visible height
//           overflowY: "auto",      // vertical scroll
//         }}
//       >

//         <Form layout="vertical" form={form} onFinish={handleProfileFinish}>
//           <Divider orientation="left" orientationMargin={0}>
//             <strong style={{ color: "#52c41a" }}>Basic Information</strong>
//           </Divider>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="name"
//                 label={<span style={{ color: "#595959" }}>Full Name</span>}
//                 rules={[{ required: true }]}
//               >
//                 <Input placeholder="Enter your name" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="email"
//                 label={<span style={{ color: "#595959" }}>Email</span>}
//                 rules={[{ required: true, type: "email" }]}
//               >
//                 <Input placeholder="Enter your email" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="phone"
//                 label="Phone"
//                 rules={[
//                   { required: true, message: "Please enter your phone number" },
//                   { pattern: /^\d{10}$/, message: "Phone must be 10 digits" },
//                 ]}
//               >
//                 <Input
//                   maxLength={10}
//                   inputMode="numeric"
//                   placeholder="10-digit number"
//                   onKeyPress={(e) => {
//                     if (!/[0-9]/.test(e.key)) e.preventDefault();
//                   }}
//                 />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 name="alternate_phone"
//                 label="Alternate Phone Number"
//                 rules={[
//                   { required: true },
//                   { pattern: /^\d{10}$/, message: "Phone must be 10 digits" },
//                 ]}
//               >
//                 <Input maxLength={10} placeholder="10-digit number" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="gender"
//                 label="Gender"
//                 rules={[{ required: true }]}
//               >
//                 <Radio.Group>
//                   <Radio value="male">Male</Radio><br></br>
//                   <Radio value="female">Female</Radio><br></br>
//                   <Radio value="other">Other</Radio><br></br>
//                 </Radio.Group>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="dob" label="Date of Birth" rules={[{ required: true }]}>
//                 <DatePicker style={{ width: "100%" }} />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Divider orientation="left" orientationMargin={0}>
//             <strong style={{ color: "#722ed1" }}>Additional Details</strong>
//           </Divider>

//           <Form.Item
//             name="profile_pic"
//             label="Profile Picture"
//             valuePropName="fileList"
//             getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
//             rules={[{ required: true }]}
//           >
//             <Upload
//               name="profile_pic"
//               listType="picture"
//               beforeUpload={() => false}
//               maxCount={1}
//             >
//               <Button icon={<UploadOutlined />}>Upload</Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item name="address" label="Address" rules={[{ required: true }]}>
//             <TextArea rows={2} placeholder="Enter your full address" />
//           </Form.Item>

//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item name="city" label="City" rules={[{ required: true }]}>
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item name="state" label="State" rules={[{ required: true }]}>
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item name="pincode" label="PIN Code" rules={[{ required: true }]}>
//                 <Input />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item
//             name="agreement"
//             valuePropName="checked"
//             rules={[
//               {
//                 validator: (_, value) =>
//                   value ? Promise.resolve() : Promise.reject("You must accept terms"),
//               },
//             ]}
//           >
//             <Checkbox>
//               I agree to the <a href="/terms">terms and conditions</a>.
//             </Checkbox>
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               block
//               style={{
//                 backgroundColor: "#13c2c2",
//                 borderColor: "#13c2c2",
//                 fontWeight: "bold",
//               }}
//             >
//               Save Profile
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>


//       {/* Password Modal */}
//       <Modal className="Change_Password"
//         title="Change Password"
//         open={isPasswordModalOpen}
//         onCancel={handlePasswordCancel}
//         footer={null}
//         width={450}
//       >
//         <Form
//           layout="vertical"
//           onFinish={handlePasswordFinish}
//           style={{ width: 350 }}
//         >
//           <Form.Item
//             name="newPassword"
//             label="New Password"
//             rules={[{ required: true }]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <Form.Item
//             name="confirmPassword"
//             label="Confirm Password"
//             dependencies={["newPassword"]}
//             rules={[
//               { required: true },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   return !value || getFieldValue("newPassword") === value
//                     ? Promise.resolve()
//                     : Promise.reject(new Error("Passwords do not match!"));
//                 },
//               }),
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Change Password
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* Profile Card */}
//       <div>
//         <div className="profile_card_main">
//           {user.map((i) => (
//             <div className="profile-card">
//               <img
//                 src={`http://localhost:8000${i.profile_pic}`}
//                 alt={i.name}
//                 className="profile-image"
//               />
//               <p>
//                 <strong>Name:</strong> {i.users.name}
//               </p>
//               <p>
//                 <strong>Email:</strong> {i.users.email}
//               </p>
//               <p>
//                 <strong>city:</strong> {i.city}
//               </p>
//               <p>
//                 <strong>Gender:</strong> {i.gender}
//               </p>
//               <p>
//                 <strong>Date of Birth:</strong> {i.dob}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {i.users.phone}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;





















import React, { useEffect, useState, useRef } from "react";
import { Table, Spin, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getPracticeList } from "../../../Api/Service";
import "./Profile.css";

function UsersTable() {
  const [practiceList, setPracticeList] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    setLoading(true);
    try {
      const data = await getPracticeList();
      setPracticeList(data);
    } catch (err) {
      console.error("Failed to fetch user stats", err);
    } finally {
      setLoading(false);
    }
  };

  // Column search functionality
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps('email'),
    },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
  ];

  return (
    <div className="user-table-container">
      <h2 className="table-title">All Registered Users</h2>
      {loading ? (
        <div className="loader-container">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <div className="table-wrapper">
          <Table
            dataSource={practiceList?.users || []}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 8 }} // Increased size to avoid scroll
          />
        </div>
      )}
    </div>
  );
}

export default UsersTable;
