import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/brands.css";

import Loader from "../components/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaEdit, FaTrash } from "react-icons/fa";

const ITEMS_PER_PAGE = 20;

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [deleteBrandId, setDeleteBrandId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* ---------------- FETCH ---------------- */

  const fetchBrands = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/brands");

      const sorted = res.data.sort((a, b) => a.name.localeCompare(b.name));

      setBrands(sorted);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load brands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  /* ---------------- SEARCH ---------------- */

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  );

  /* ---------------- PAGINATION ---------------- */

  const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);

  const paginatedBrands = filteredBrands.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  /* ---------------- MODALS ---------------- */

  const openCreate = () => {
    setEditingBrand({});
    setName("");
    setLogo(null);
    setPreview(null);
  };

  const openEdit = (brand) => {
    setEditingBrand(brand);
    setName(brand.name);
    setLogo(null);
    setPreview(brand.logo);
  };

  const closeModal = () => {
    setEditingBrand(null);
    setDeleteBrandId(null);
    setName("");
    setLogo(null);
    setPreview(null);
  };

  /* ---------------- FILE PREVIEW ---------------- */

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ---------------- CREATE / UPDATE ---------------- */

  const submit = async () => {
    if (!name.trim()) return;

    const formData = new FormData();
    formData.append("name", name);

    if (logo) {
      formData.append("logo", logo);
    }

    try {
      setLoading(true);

      if (editingBrand?._id) {
        await api.put(`/admin/brands/${editingBrand._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Brand updated");
      } else {
        await api.post("/admin/brands", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Brand created");
      }

      closeModal();
      fetchBrands();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */

  const confirmDelete = async () => {
    try {
      setLoading(true);

      await api.delete(`/admin/brands/${deleteBrandId}`);

      toast.success("Brand deleted");

      setDeleteBrandId(null);
      fetchBrands();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOADER ---------------- */

  if (loading && brands.length === 0) {
    return <Loader text="Please wait while we are loading brands..." />;
  }

  return (
    <div className="page">
      <ToastContainer position="top-right" autoClose={2500} />

      <h2>Brands</h2>

      {/* TOOLBAR */}

      <div className="brand-toolbar">
        <input
          className="search-box"
          placeholder="Search brands..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <button className="primary add-btn" onClick={openCreate}>
          + Add Brand
        </button>
      </div>

      {/* BRAND TABLE */}

      <div className="brand-list">
        <div className="brand-header">
          <span>S.No</span>
          <span>Brand Name</span>
          <span>Logo</span>
          <span>Edit</span>
          <span>Delete</span>
        </div>

        {paginatedBrands.map((b, index) => (
          <div className="brand-card" key={b._id}>
            <div className="brand-serial">
              {(page - 1) * ITEMS_PER_PAGE + index + 1}
            </div>

            <div className="brand-name">{b.name}</div>

            <div className="brand-logo-box">
              <img src={b.logo} alt={b.name} />
            </div>

            <button className="icon-btn edit-btn" onClick={() => openEdit(b)}>
              <FaEdit />
            </button>

            <button
              className="icon-btn delete-btn"
              onClick={() => setDeleteBrandId(b._id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}

      {editingBrand && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingBrand._id ? "Edit Brand" : "Create Brand"}</h3>

            <input
              placeholder="Brand name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input type="file" accept="image/*" onChange={handleFileChange} />

            {preview && (
              <img src={preview} alt="preview" style={{ width: "100px", height: "100px", marginTop: "10px" }} />
            )}

            <div className="modal-actions">
              <button
                className="primary full"
                onClick={submit}
                disabled={loading}
              >
                {loading
                  ? "Uploading..."
                  : editingBrand?._id
                    ? "Update"
                    : "Create"}
              </button>

              <button className="secondary dark" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {deleteBrandId && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Delete Brand?</h3>
            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button className="delete dark" onClick={confirmDelete}>
                Delete
              </button>

              <button className="secondary dark" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
