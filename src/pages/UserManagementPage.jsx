import './UserManagementPage.css';

const UserManagementPage = () => {
  return (
    <div className="user-management-page">
      <div className="page-header">
        <h1>Quản lý Người dùng</h1>
        <p>Danh sách hành khách và tài xế</p>
      </div>
      <div className="page-content">
        {/* TODO: UserFilters, UserTable */}
        <div className="content-placeholder">Bảng người dùng sẽ hiển thị ở đây</div>
      </div>
    </div>
  );
};

export default UserManagementPage;
