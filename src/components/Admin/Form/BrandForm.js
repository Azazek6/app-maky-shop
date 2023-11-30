import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InputComponent from "../InputComponent";
import CheckComponent from "../CheckComponent";
import { toastMessage } from "@/helpers/general";
import { useGlobal } from "@/context/GlobalProvider";

const BrandForm = () => {
  const { fetchBrandForId, createBrand, updateBrand } = useGlobal();

  const router = useRouter();
  //Estados
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [brandForm, setBrandForm] = useState({
    name: "",
    status: isChecked,
  });

  //Funciones generales
  const clear = () => {
    setBrandForm({
      name: "",
      status: isChecked,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setBrandForm({ ...brandForm, [name]: value });
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (brandForm.name == "") {
      setLoading(false);
      toastMessage("Todos los datos son obligatorios", 2);
      return;
    }

    try {
      brandForm.status = isChecked;
      const { status, data } = router.query?.id
        ? await updateBrand(router.query.id, brandForm)
        : await createBrand(brandForm);

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
    const loadBrand = async (id) => {
      try {
        const { data } = await fetchBrandForId(id);
        setBrandForm({
          name: data.nombre,
          status: data.estado,
        });
        setIsChecked(data.estado == 1 ? true : false);
      } catch (error) {
        setBrandForm({
          name: "",
          status: isChecked,
        });
        setIsChecked(true);
      }
    };

    if (router.query?.id) {
      loadBrand(router.query.id);
    }
  }, [router.query.id]);

  return (
    <div className="flex-row">
      <form onSubmit={handleSubmit}>
        <div className="w-[100%] flex-row gap-5 items-center sm:flex">
          <InputComponent
            name="name"
            value={brandForm.name}
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

export default BrandForm;
