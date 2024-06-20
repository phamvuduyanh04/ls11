import React, { useEffect, useState } from 'react';
import './App.css';
import PVDACategory from './components/PVDACategory';
import axios from "./api/PVDAApi";
import PVDACategoryForm from './components/PVDACategoryForm';

function PvdaApp() {
  const [pvdaCategories, setPvdaCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get("/PvdaCategory");
      setPvdaCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const [pvdaCategoryIsForm, setPvdaCategoryIsForm] = useState(false);

  const pvdaCategoryInit = {
    pvdaId: 0,
    pvdaCategoryName: "",
    pvdaCategoryStatus: true,
  };

  const [pvdaCategoryEdit, setPvdaCategoryEdit] = useState(pvdaCategoryInit);

  const pvdaHandleAddNew = (param) => {
    setPvdaCategoryEdit(pvdaCategoryInit);
    setPvdaCategoryIsForm(param);
  }

  const pvdaHandleCategoryCloseForm = (param) => {
    setPvdaCategoryIsForm(param);
  }

  const pvdaHandleCategorySubmit = async (param) => {
    try {
      let id = pvdaCategories.length > 0 ? pvdaCategories[pvdaCategories.length - 1].pvdaId : 0;
      param.pvdaId = id + 1;

      await axios.post("/pvdaCategory", param);
      setPvdaCategories(prev => [...prev, param]);
      setPvdaCategoryIsForm(false);
    } catch (error) {
      console.log("Error submitting category:", error);
    }
  }

  const pvdahandleDelete = async (pvdaId) => {
    try {
      await axios.delete(`/pvdaCategory/${pvdaId}`);
      const updatedCategories = pvdaCategories.filter(category => category.pvdaId !== pvdaId);
      setPvdaCategories(updatedCategories);
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  }

  const pvdahandleEdit = (pvdaCategory) => {
    setPvdaCategoryEdit(pvdaCategory);
    setPvdaCategoryIsForm(true);
  }

  return (
    <div className="container border my-3">
      <h1>Phạm Vũ Duy Anh - Call API</h1>

      <PVDACategory
        renderpvdaCategories={pvdaCategories}
        onAddNew={pvdaHandleAddNew}
        onpvdaDelete={pvdahandleDelete}
        onpvdaEdit={pvdahandleEdit}
      />
      <hr />
      {pvdaCategoryIsForm && (
        <PVDACategoryForm
          renderpvdaCategory={pvdaCategoryEdit}
          onCloseForm={pvdaHandleCategoryCloseForm}
          onCategorySubmit={pvdaHandleCategorySubmit}
        />
      )}

    </div>
  );
}

export default PvdaApp;
