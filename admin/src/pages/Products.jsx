
// import { useEffect, useState } from "react";
// import api from "../services/api";
// import "../styles/products.css";

// import { ToastContainer, toast } from "react-toastify";
// import { FaEdit, FaTrash } from "react-icons/fa";

// export default function Products() {

//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [search, setSearch] = useState("");

//   const [editing, setEditing] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   const [name, setName] = useState("");
//   const [brand, setBrand] = useState("");
//   const [category, setCategory] = useState("");

//   const [images, setImages] = useState([]);
//   const [preview, setPreview] = useState([]);

//   const [saving, setSaving] = useState(false);

//   const [errors, setErrors] = useState({});

//   const fetchProducts = async () => {
//     try {

//       const res = await api.get("/admin/products");

//       const sorted = res.data.sort((a,b)=>
//         a.name.localeCompare(b.name)
//       );

//       setProducts(sorted);
//       setFilteredProducts(sorted);

//     } catch {
//       toast.error("Failed to load products");
//     }
//   };

//   const fetchFormData = async () => {
//     try {
//       const res = await api.get("/admin/products/form-data");
//       setBrands(res.data.brands);
//       setCategories(res.data.categories);
//     } catch {
//       toast.error("Failed to load form data");
//     }
//   };

//   useEffect(()=>{
//     fetchProducts();
//     fetchFormData();
//   },[]);

//   /* SEARCH */

//   useEffect(()=>{

//     const filtered = products.filter(p =>
//       p.name.toLowerCase().includes(search.toLowerCase())
//     );

//     setFilteredProducts(filtered);

//   },[search,products]);

//   const openCreate = () => {
//     setEditing({});
//     setName("");
//     setBrand("");
//     setCategory("");
//     setImages([]);
//     setPreview([]);
//     setErrors({});
//   };

//   const openEdit = (p) => {

//     setEditing(p);

//     setName(p.name);
//     setBrand(p.brand?._id || "");
//     setCategory(p.category?._id || "");

//     setPreview(p.images?.map(i=>i.url) || []);
//     setImages([]);

//     setErrors({});
//   };

//   const closeModal = () => {
//     setEditing(null);
//     setDeleteId(null);
//     setSaving(false);
//     setErrors({});
//   };

//   const handleImages = (e)=>{

//     const files = Array.from(e.target.files);

//     setImages(files);

//     const previews = files.map(file=>URL.createObjectURL(file));

//     setPreview(previews);
//   };

//   /* VALIDATION */

//   const validate = ()=>{

//     let newErrors = {};

//     if(!name.trim()){
//       newErrors.name = "Product name is required";
//     }

//     if(!category){
//       newErrors.category = "Category is required";
//     }

//     if(!editing?._id && images.length === 0){
//       newErrors.images = "At least one image required";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const submit = async ()=>{

//     if(!validate()) return;

//     try{

//       setSaving(true);

//       const formData = new FormData();

//       formData.append("name",name);
//       formData.append("brand",brand);
//       formData.append("category",category);

//       images.forEach(img=>{
//         formData.append("images",img);
//       });

//       if(editing?._id){

//         await api.put(`/admin/products/${editing._id}`,formData,{
//           headers:{ "Content-Type":"multipart/form-data" }
//         });

//         toast.success("Product updated");

//       }else{

//         await api.post("/admin/products",formData,{
//           headers:{ "Content-Type":"multipart/form-data" }
//         });

//         toast.success("Product created");
//       }

//       closeModal();
//       fetchProducts();

//     }catch{

//       toast.error("Save failed");
//       setSaving(false);
//     }
//   };

//   const confirmDelete = async ()=>{

//     try{

//       await api.delete(`/admin/products/${deleteId}`);

//       toast.success("Product deleted");

//       setDeleteId(null);

//       fetchProducts();

//     }catch{

//       toast.error("Delete failed");
//     }
//   };

//   return(

//     <div className="page">

//       <ToastContainer/>

//       <div className="page-header">

//         <h2>Products</h2>

//         <div className="toolbar">

//           <input
//             className="search-box"
//             placeholder="Search product..."
//             value={search}
//             onChange={(e)=>setSearch(e.target.value)}
//           />

//           <button
//             className="primary add-btn"
//             onClick={openCreate}
//           >
//             + Add Product
//           </button>

//         </div>

//       </div>

//       <div className="table-wrapper">

//         <div className="product-list">

//           <div className="product-header">
//             <span>Name</span>
//             <span>Brand</span>
//             <span>Category</span>
//             <span>Images</span>
//             <span>Edit</span>
//             <span>Delete</span>
//           </div>

//           {filteredProducts.map((p)=>(
//             <div className="product-card" key={p._id}>

//               <div>{p.name}</div>

//               <div>{p.brand?.name || "-"}</div>

//               <div>{p.category?.name}</div>

//               <div className="product-images">
//                 {p.images?.map((img,i)=>(
//                   <img key={i} src={img.url} alt=""/>
//                 ))}
//               </div>

//               <button
//                 className="icon-btn edit-btn"
//                 onClick={()=>openEdit(p)}
//               >
//                 <FaEdit/>
//               </button>

//               <button
//                 className="icon-btn delete-btn"
//                 onClick={()=>setDeleteId(p._id)}
//               >
//                 <FaTrash/>
//               </button>

//             </div>
//           ))}

//         </div>

//       </div>

//       {/* FORM MODAL */}

//       {editing !== null && (

//         <div className="modal-overlay">

//           <div className="modal">

//             <h3>{editing?._id ? "Edit Product":"Add Product"}</h3>

//             <div className="form-field">
//               <input
//                 placeholder="Product Name"
//                 value={name}
//                 onChange={(e)=>setName(e.target.value)}
//               />
//               {errors.name && <span className="error">{errors.name}</span>}
//             </div>

//             <div className="form-field">
//               <select value={brand} onChange={(e)=>setBrand(e.target.value)}>
//                 <option value="">No Brand</option>
//                 {brands.map(b=>(
//                   <option key={b._id} value={b._id}>{b.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-field">
//               <select value={category} onChange={(e)=>setCategory(e.target.value)}>
//                 <option value="">Select Category</option>
//                 {categories.map(c=>(
//                   <option key={c._id} value={c._id}>{c.name}</option>
//                 ))}
//               </select>
//               {errors.category && <span className="error">{errors.category}</span>}
//             </div>

//             <div className="form-field">

//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImages}
//               />

//               {errors.images && <span className="error">{errors.images}</span>}

//             </div>

//             <div className="preview-grid">
//               {preview.map((img,i)=>(
//                 <img key={i} src={img} alt=""/>
//               ))}
//             </div>

//             <div className="modal-actions">

//               <button
//                 className="primary"
//                 onClick={submit}
//                 disabled={saving}
//               >
//                 {saving ? "Saving..." : "Save"}
//               </button>

//               <button
//                 className="secondary dark"
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* DELETE MODAL */}

//       {deleteId &&(

//         <div className="modal-overlay">

//           <div className="modal-box">

//             <h3>Delete product?</h3>

//             <div className="modal-actions">

//               <button className="danger" onClick={confirmDelete}>
//                 Delete
//               </button>

//               <button
//                 className="secondary dark"
//                 onClick={()=>setDeleteId(null)}
//               >
//                 Cancel
//               </button>

//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/products.css";

import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState({});

  const fetchProducts = async () => {
    try {

      const res = await api.get("/admin/products");

      const sorted = res.data.sort((a,b)=>
        a.name.localeCompare(b.name)
      );

      setProducts(sorted);
      setFilteredProducts(sorted);

    } catch {
      toast.error("Failed to load products");
    }
  };

  const fetchFormData = async () => {
    try {
      const res = await api.get("/admin/products/form-data");
      setBrands(res.data.brands);
      setCategories(res.data.categories);
    } catch {
      toast.error("Failed to load form data");
    }
  };

  useEffect(()=>{
    fetchProducts();
    fetchFormData();
  },[]);

  useEffect(()=>{

    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);

  },[search,products]);

  const openCreate = () => {
    setEditing({});
    setName("");
    setBrand("");
    setCategory("");
    setImages([]);
    setPreview([]);
    setErrors({});
  };

  const openEdit = (p) => {

    setEditing(p);

    setName(p.name);
    setBrand(p.brand?._id || "");
    setCategory(p.category?._id || "");

    setPreview(p.images?.map(i=>i.url) || []);
    setImages([]);

    setErrors({});
  };

  const closeModal = () => {
    setEditing(null);
    setDeleteId(null);
    setSaving(false);
    setErrors({});
  };

  const handleImages = (e)=>{

    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map(file=>URL.createObjectURL(file));

    setPreview(previews);

    setErrors(prev => ({...prev, images:null}));
  };

  const validate = ()=>{

    let newErrors = {};

    if(!name.trim()){
      newErrors.name = "Product name is required";
    }

    if(!category){
      newErrors.category = "Category is required";
    }

    if(!editing?._id && images.length === 0){
      newErrors.images = "Image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submit = async ()=>{

    if(!validate()) return;

    try{

      setSaving(true);

      const formData = new FormData();

      formData.append("name",name);
      formData.append("brand",brand);
      formData.append("category",category);

      images.forEach(img=>{
        formData.append("images",img);
      });

      if(editing?._id){

        await api.put(`/admin/products/${editing._id}`,formData,{
          headers:{ "Content-Type":"multipart/form-data" }
        });

        toast.success("Product updated");

      }else{

        await api.post("/admin/products",formData,{
          headers:{ "Content-Type":"multipart/form-data" }
        });

        toast.success("Product created");
      }

      closeModal();
      fetchProducts();

    }catch{

      toast.error("Save failed");
      setSaving(false);
    }
  };

  const confirmDelete = async ()=>{

    try{

      await api.delete(`/admin/products/${deleteId}`);

      toast.success("Product deleted");

      setDeleteId(null);

      fetchProducts();

    }catch{

      toast.error("Delete failed");
    }
  };

  return(

    <div className="page">

      <ToastContainer/>

      <div className="page-header">

        <h2>Products</h2>

        

      </div>
      <div className="toolbar">

          <input
            className="search-box"
            placeholder="Search product..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <button
            className="primary add-btn"
            onClick={openCreate}
          >
            + Add Product
          </button>

        </div>

      <div className="table-wrapper">

        <div className="product-list">

          <div className="product-header">
            <span>Name</span>
            <span>Brand</span>
            <span>Category</span>
            <span>Images</span>
            <span>Edit</span>
            <span>Delete</span>
          </div>

          {filteredProducts.map((p)=>(
            <div className="product-card" key={p._id}>

              <div>{p.name}</div>

              <div>{p.brand?.name || "-"}</div>

              <div>{p.category?.name}</div>

              <div className="product-images">
                {p.images?.map((img,i)=>(
                  <img key={i} src={img.url} alt=""/>
                ))}
              </div>

              <button
                className="icon-btn edit-btn"
                onClick={()=>openEdit(p)}
              >
                <FaEdit/>
              </button>

              <button
                className="icon-btn delete-btn"
                onClick={()=>setDeleteId(p._id)}
              >
                <FaTrash/>
              </button>

            </div>
          ))}

        </div>

      </div>

      {editing !== null && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>{editing?._id ? "Edit Product":"Add Product"}</h3>

            <div className="form-field">

              <input
                className={errors.name ? "input-error":""}
                placeholder="Product Name"
                value={name}
                onChange={(e)=>{
                  setName(e.target.value)
                  setErrors(prev => ({...prev, name:null}))
                }}
              />

              {errors.name && <span className="error">{errors.name}</span>}

            </div>

            <div className="form-field">

              <select
                value={brand}
                onChange={(e)=>setBrand(e.target.value)}
              >
                <option value="">No Brand</option>
                {brands.map(b=>(
                  <option key={b._id} value={b._id}>{b.name}</option>
                ))}
              </select>

            </div>

            <div className="form-field">

              <select
                className={errors.category ? "input-error":""}
                value={category}
                onChange={(e)=>{
                  setCategory(e.target.value)
                  setErrors(prev => ({...prev, category:null}))
                }}
              >

                <option value="">Select Category</option>

                {categories.map(c=>(
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}

              </select>

              {errors.category && <span className="error">{errors.category}</span>}

            </div>

            <div className="form-field">

              <input
                className={errors.images ? "input-error":""}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
              />

              {errors.images && <span className="error">{errors.images}</span>}

            </div>

            <div className="preview-grid">
              {preview.map((img,i)=>(
                <img key={i} src={img} alt=""/>
              ))}
            </div>

            <div className="modal-actions">

              <button
                className="primary"
                onClick={submit}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                className="secondary dark"
                onClick={closeModal}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      {deleteId &&(

        <div className="modal-overlay">

          <div className="modal-box">

            <h3>Delete product?</h3>

            <div className="modal-actions">

              <button className="danger" onClick={confirmDelete}>
                Delete
              </button>

              <button
                className="secondary dark"
                onClick={()=>setDeleteId(null)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}