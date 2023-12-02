import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import InputFileComponent from "../InputFileComponent";
import InputComponent from "../InputComponent";
import TextComponent from "../TextComponent";
import SelectedComponent from "../SelectedComponent";
import CheckComponent from "../CheckComponent";
import { toastMessage } from "@/helpers/general";
import { useGlobal } from "@/context/GlobalProvider";
import genders from "@/sample/genders.json";
import stages from "@/sample/stages.json";
import { host } from "@/configuration/utils";

const ProductForm = () => {
  const {
    createProduct,
    updateProduct,
    brand,
    category,
    fetchBrand,
    fetchCategory,
    fetchProductForId,
  } = useGlobal();
  const router = useRouter();
  //Estados
  const [isCheckedS, setIsCheckedS] = useState(false);
  const [isCheckedM, setIsCheckedM] = useState(false);
  const [isCheckedL, setIsCheckedL] = useState(false);
  const [isCheckedXL, setIsCheckedXL] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    code: "",
    name: "",
    price: "",
    stock: "",
    id_brand: "",
    id_category: "",
    size: [],
    image: "",
    description: "",
    id_gender: "",
    id_stage: "",
  });

  const clear = () => {
    setProductData({
      code: "",
      name: "",
      price: "",
      stock: "",
      id_brand: "",
      id_category: "",
      size: [],
      image: "",
      description: "",
      id_gender: "",
      id_stage: "",
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setProductData({ ...productData, [name]: value });
  };

  const toggleCheckboxSizeS = () => {
    setIsCheckedS(!isCheckedS);
  };

  const toggleCheckboxSizeM = () => {
    setIsCheckedM(!isCheckedM);
  };

  const toggleCheckboxSizeL = () => {
    setIsCheckedL(!isCheckedL);
  };

  const toggleCheckboxSizeXL = () => {
    setIsCheckedXL(!isCheckedXL);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    productData.image = selectedFile ? selectedFile.name : productData.image;
    productData.size = [
      { status: isCheckedS, name: "S" },
      { status: isCheckedM, name: "M" },
      { status: isCheckedL, name: "L" },
      { status: isCheckedXL, name: "XL" },
    ];

    if (
      productData.code == "" ||
      productData.name == "" ||
      productData.price == "" ||
      productData.stock == "" ||
      productData.id_brand == "" ||
      productData.id_category == "" ||
      productData.id_gender == "" ||
      productData.id_stage == "" ||
      productData.description == ""
    ) {
      setLoading(false);
      toastMessage("Todos los datos son obligatorios", 2);
      return;
    }

    try {
      if (selectedFile) {
        const formData = new FormData();

        formData.append("file", selectedFile);
        const token = localStorage.getItem("tokenMakyPanel");

        const { status } = await axios.post(
          `${host}/productos/${token}/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (status == 201) {
          setSelectedFile(null);
        }
      }

      const { status, data } = router.query.id
        ? await updateProduct(router.query.id, productData)
        : await createProduct(productData);

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
    fetchBrand();
    fetchCategory();
  }, []);

  useEffect(() => {
    const loadData = async (id) => {
      try {
        const { data } = await fetchProductForId(id);
        data.producto_tallas.map(({ talla }) => {
          setIsCheckedS(talla == "S");
          setIsCheckedM(talla == "M");
          setIsCheckedL(talla == "L");
          setIsCheckedXL(talla == "XL");
        });
        setProductData({
          code: data.codigo,
          name: data.nombre,
          price: data.precio,
          stock: data.cantidad,
          id_brand: data.marca.id_marca,
          id_category: data.categoria.id_categoria,
          size: [],
          image: data.imagen,
          description: data.descripcion,
          id_gender: data.genero.id_genero,
          id_stage: data.etapa.id_etapa,
        });
      } catch (error) {
        clear();
      }
    };

    if (router.query?.id) {
      loadData(router.query.id);
    }
  }, [router.query.id]);

  return (
    <div className="w-[100%] flex-row">
      <form onSubmit={handleSubmit} encType="multipart/formdata">
        <div className="w-[100%] flex-row gap-5 items-center sm:flex">
          <InputComponent
            name="code"
            value={productData.code}
            onChange={handleChange}
            type="text"
            placeholder="Codigo"
            classStyle="mb-4 sm:mb-0"
          />
          <InputComponent
            name="name"
            value={productData.name}
            onChange={handleChange}
            type="text"
            placeholder="Nombre"
            classStyle="mb-4 sm:mb-0"
          />
          <InputComponent
            name="price"
            value={productData.price}
            onChange={handleChange}
            type="number"
            placeholder="Precio"
          />
        </div>
        <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-5">
          <InputComponent
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            type="number"
            placeholder="Cantidad inicial"
            classStyle="mb-4 sm:mb-0"
          />
          <SelectedComponent
            data={brand}
            title="Marca"
            name="id_brand"
            value={productData.id_brand}
            handleChange={handleChange}
            classStyle="mb-4 sm:mb-0"
          />
          <SelectedComponent
            data={category}
            title="Categoria"
            name="id_category"
            value={productData.id_category}
            handleChange={handleChange}
          />
        </div>
        <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-5">
          <SelectedComponent
            data={genders}
            title="Género"
            name="id_gender"
            value={productData.id_gender}
            handleChange={handleChange}
            classStyle="mb-4 sm:mb-0"
          />
          <SelectedComponent
            data={stages}
            title="Etapa"
            name="id_stage"
            value={productData.id_stage}
            handleChange={handleChange}
          />
        </div>
        <h2 className="mt-5 mb-3 text-sm sm:text-lg text-[#ff7f51] font-semibold">
          TALLAS:
        </h2>
        <div className="flex items-center justify-center">
          <CheckComponent
            title="S"
            toogle={toggleCheckboxSizeS}
            activate={isCheckedS}
          />
          <CheckComponent
            title="M"
            toogle={toggleCheckboxSizeM}
            activate={isCheckedM}
          />
          <CheckComponent
            title="L"
            toogle={toggleCheckboxSizeL}
            activate={isCheckedL}
          />
          <CheckComponent
            title="XL"
            toogle={toggleCheckboxSizeXL}
            activate={isCheckedXL}
          />
        </div>
        <div className="mt-8 relative flex-row lg:flex items-center">
          <InputFileComponent
            title="Imagen Referencial"
            file={selectedFile}
            handleChange={handleFileChange}
          />
        </div>
        <div className="mt-5">
          <TextComponent
            title="Descripción del producto"
            name="description"
            value={productData.description}
            handleChange={handleChange}
          />
        </div>
        <div className="w-[100%] sm:text-right mt-5">
          <button
            disabled={loading}
            className="bg-[#ff5151] text-xs sm:text-base text-white font-bold p-2 w-[100%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out"
          >
            {router.query.id ? "Modificar" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
