import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InputComponent from "../InputComponent";
import CheckComponent from "../CheckComponent";
import { toastMessage } from "@/helpers/general";
import { useGlobal } from "@/context/GlobalProvider";

const CategoryForm = () => {
  const { fetchCategoryForId, createCategory, updateCategory } = useGlobal();
  const router = useRouter();

  //Estados
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    status: isChecked,
  });

  //Funciones generales
  const clear = () => {
    setCategoryForm({
      name: "",
      status: isChecked,
    });
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleChange = ({ target: { name, value } }) => {
    setCategoryForm({ ...categoryForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (categoryForm.name == "") {
      setLoading(false);
      toastMessage("Todos los datos son obligatorios", 2);
      return;
    }

    try {
      categoryForm.status = isChecked;
      const { status, data } = router.query.id
        ? await updateCategory(router.query.id, categoryForm)
        : await createCategory(categoryForm);

      if (status == 201) {
        setLoading(false);
        if (!router.query.id) {
          clear();
        }
        toastMessage(data.message, 1);
      }
    } catch (error) {
      setLoading(false);
      toastMessage(error.response.data.message, 3);
    }
  };

  useEffect(() => {
    const loadCategory = async (id) => {
      try {
        const { data } = await fetchCategoryForId(id);
        setCategoryForm({
          name: data.nombre,
          status: data.estado,
        });
        setIsChecked(data.estado == 1 ? true : false);
      } catch (error) {
        setCategoryForm({
          name: "",
          status: isChecked,
        });
        setIsChecked(true);
      }
    };

    if (router.query?.id) {
      loadCategory(router.query.id);
    }
  }, [router.query.id]);

  return (
    <div className="flex-row">
      <form onSubmit={handleSubmit}>
        <div className="w-[100%] flex-row gap-5 items-center sm:flex">
          <InputComponent
            name="name"
            value={categoryForm.name}
            onChange={handleChange}
            type="text"
            placeholder="Nombre"
            classStyle="sm:w-[50%]"
          />
          <CheckComponent
            title="Activado"
            toogle={toggleCheckbox}
            activate={isChecked}
            classStyle="sm:w-[20%] sm:mt-0 mt-8"
          />
        </div>
        <div className="w-[100%] sm:text-right mt-10">
          <button
            disabled={loading}
            className="bg-[#ff5151] text-white font-bold p-2 w-[100%] sm:w-[30%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out"
          >
            {router.query?.id ? "Modificar" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
