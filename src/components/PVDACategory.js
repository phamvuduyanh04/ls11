import React from 'react';

export default function PVDACategory({ renderpvdaCategories, onAddNew, onpvdaDelete, onpvdaEdit }) {
  const pvdahandleDelete = (pvdaId) => {
    if (window.confirm(`Bạn có muốn xóa [${pvdaId}] không?`)) {
      console.log("Delete:", pvdaId);
      onpvdaDelete(pvdaId);
    }
  }

  const pvdahandleEdit = (pvdaCategory) => {
    onpvdaEdit(pvdaCategory);
  }

  const pvdaHandleAdd = () => {
    onAddNew(true);
  }

  const pvdaCategoriesElement = renderpvdaCategories.map((pvdaCategory, index) => (
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{pvdaCategory.pvdaId}</td>
      <td>{pvdaCategory.pvdaCategoryName}</td>
      <td>{pvdaCategory.pvdaCategoryStatus ? "Hiển thị" : "Tạm khóa"}</td>
      <td>
        <button className='btn btn-danger' onClick={() => pvdahandleDelete(pvdaCategory.pvdaId)}>Delete</button>
        <button className='btn btn-success' onClick={() => pvdahandleEdit(pvdaCategory)}>Edit</button>
      </td>
    </tr>
  ));

  return (
    <div className='container m-2'>
      <h2>Danh Sách Loại Sản Phẩm</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã Loại</th>
            <th>Tên Loại</th>
            <th>Trạng Thái</th>
            <th>Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {pvdaCategoriesElement}
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={pvdaHandleAdd}>Thêm Mới</button>
    </div>
  );
}
