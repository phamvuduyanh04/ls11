import React, { useState } from 'react';
import axios from 'axios';

export default function PVDACategoryForm({ onCloseForm, onCategorySubmit }) {
  const [pvdaCategoryName, setPvdaCategoryName] = useState("");
  const [pvdaCategoryStatus, setPvdaCategoryStatus] = useState(true);

  const pvdaHandleClose = () => {
    onCloseForm(false);
  }

  const pvdaHandleSubmit = async (event) => {
    event.preventDefault();
    let pvdaCategory = {
      pvdaId: 0,
      pvdaCategoryName: pvdaCategoryName,
      pvdaCategoryStatus: pvdaCategoryStatus
    };

    try {
      const response = await axios.post("/pvdaCategory", pvdaCategory);
      console.log("Response from server:", response.data); // Log response if needed
      onCategorySubmit(pvdaCategory); // Notify parent component
      onCloseForm(false); // Close form
    } catch (error) {
      console.log("Error submitting category:", error);
    }
  }

  return (
    <div>
      <form onSubmit={pvdaHandleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Category Name</span>
          <input
            type="text"
            className="form-control"
            value={pvdaCategoryName}
            onChange={(ev) => setPvdaCategoryName(ev.target.value)}
            placeholder="Category Name"
            aria-label="Category Name"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">Category Status</span>
          <select
            value={pvdaCategoryStatus}
            onChange={(ev) => setPvdaCategoryStatus(ev.target.value === 'true')}
            className='form-select'
          >
            <option value={true}>Hiển thị</option>
            <option value={false}>Tạm khóa</option>
          </select>
        </div>
        <button type="submit" className='btn btn-success'>Thêm mới</button>
        <button type="button" className='btn btn-danger' onClick={pvdaHandleClose}>Đóng</button>
      </form>
    </div>
  );
}
