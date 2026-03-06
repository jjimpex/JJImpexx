import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/categories.css";

import Loader from "../components/Loader";

import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const ITEMS_PER_PAGE = 2;

export default function Category() {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* ---------------- FETCH ---------------- */

  const fetchCategories = async () => {

    try {

      setLoading(true);

      const res = await api.get("/admin/categories");

      const sorted = res.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setCategories(sorted);

    } catch {

      toast.error("Failed to fetch categories");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ---------------- SEARCH ---------------- */

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- PAGINATION ---------------- */

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  /* ---------------- MODALS ---------------- */

  const openCreate = () => {

    setEditingCategory({});
    setName("");
    setIcon(null);
    setPreview(null);

  };

  const openEdit = (cat) => {

    setEditingCategory(cat);
    setName(cat.name);
    setIcon(null);
    setPreview(cat.icon);

  };

  const closeModal = () => {

    setEditingCategory(null);
    setDeleteId(null);
    setName("");
    setIcon(null);
    setPreview(null);

  };

  /* ---------------- FILE PREVIEW ---------------- */

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setIcon(file);
    setPreview(URL.createObjectURL(file));

  };

  /* ---------------- SAVE ---------------- */

  const submit = async () => {

    if (!name.trim()) {
      toast.error("Category name required");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);

    if (icon) {
      formData.append("icon", icon);
    }

    try {

      setLoading(true);

      if (editingCategory?._id) {

        await api.put(`/admin/categories/${editingCategory._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        toast.success("Category updated");

      } else {

        await api.post("/admin/categories", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        toast.success("Category created");

      }

      closeModal();
      fetchCategories();

    } catch {

      toast.error("Upload failed");

    } finally {

      setLoading(false);

    }

  };

  /* ---------------- DELETE ---------------- */

  const confirmDelete = async () => {

    try {

      await api.delete(`/admin/categories/${deleteId}`);

      toast.success("Category deleted");

      setDeleteId(null);
      fetchCategories();

    } catch {

      toast.error("Delete failed");

    }

  };

  /* ---------------- LOADER ---------------- */

  if (loading && categories.length === 0) {
    return <Loader text="Please wait while we are loading categories..." />;
  }

  return (

    <div className="page">

      <ToastContainer position="top-right" autoClose={2500} />

      <h2>Categories</h2>

      <div className="brand-toolbar">

        <input
          className="search-box"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <button
          className="primary add-btn"
          onClick={openCreate}
        >
          + Add Category
        </button>

      </div>

      <div className="brand-list">

        <div className="brand-header">
          <span>S.No</span>
          <span>Category</span>
          <span>Logo</span>
          <span>Edit</span>
          <span>Delete</span>
        </div>

        {/* {paginated.map((c, index) => (

          <div className="brand-card" key={c._id}>

            <div className="brand-serial">
              {(page - 1) * ITEMS_PER_PAGE + index + 1}
            </div>

            <div className="brand-name">
              {c.name}
            </div>

            <div className="brand-logo-box">
              <img src={c.icon} alt={c.name} />
            </div>

            <button
              className="icon-btn edit-btn"
              onClick={() => openEdit(c)}
            >
              <FaEdit />
            </button>

            <button
              className="icon-btn delete-btn"
              onClick={() => setDeleteId(c._id)}
            >
              <FaTrash />
            </button>

          </div>

        ))} */}

        {paginated.length === 0 ? (

  <div
    style={{
      textAlign: "center",
      padding: "25px",
      color: "#777",
      fontSize: "15px",
      gridColumn: "1 / -1"
    }}
  >
    No records found...
  </div>

) : (

  paginated.map((c, index) => (

    <div className="brand-card" key={c._id}>

      <div className="brand-serial">
        {(page - 1) * ITEMS_PER_PAGE + index + 1}
      </div>

      <div className="brand-name">
        {c.name}
      </div>

      <div className="brand-logo-box">
        <img src={c.icon} alt={c.name} />
      </div>

      <button
        className="icon-btn edit-btn"
        onClick={() => openEdit(c)}
      >
        <FaEdit />
      </button>

      <button
        className="icon-btn delete-btn"
        onClick={() => setDeleteId(c._id)}
      >
        <FaTrash />
      </button>

    </div>

  ))

)}

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
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

      {editingCategory !== null && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>
              {editingCategory?._id ? "Edit Category" : "Add Category"}
            </h3>

            <input
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{ width: "80px", marginTop: "10px" }}
              />
            )}

            <div className="modal-actions">

              <button
                className="primary"
                disabled={loading}
                onClick={submit}
              >
                {loading ? "Saving..." : "Save"}
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

      {/* DELETE CONFIRMATION */}

      {deleteId && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h3>Delete Category?</h3>

            <p>This action cannot be undone.</p>

            <div className="modal-actions">

              <button
                className="danger"
                onClick={confirmDelete}
              >
                Delete
              </button>

              <button
                className="secondary dark"
                onClick={() => setDeleteId(null)}
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