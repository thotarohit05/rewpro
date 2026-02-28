import "../styles/bookService.css";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import serviceImg from "../assets/service.png";

const BookService = () => {
  const navigate = useNavigate();

  const [machineType, setMachineType] = useState("Tractor");
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    brandSeries: "",
    serviceType: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm(prev => ({ ...prev, mobile: value }));
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.mobile || form.mobile.length !== 10)
      newErrors.mobile = "Valid 10-digit mobile required";
    if (!form.brandSeries.trim())
      newErrors.brandSeries = "Brand & Series required";
    if (!form.serviceType)
      newErrors.serviceType = "Service type required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase
      .from("service_bookings")
      .insert([
        {
          machine_type: machineType,
          name: form.name,
          mobile: form.mobile,
          brand_series: form.brandSeries,
          service_type: form.serviceType,
          description: form.description,
        },
      ]);

    setSubmitting(false);

    if (error) {
      console.error(error);
      toast.error("Failed to submit. Please try again.");
      return;
    }

    toast.success("Service booked successfully ✅");

    setForm({
      name: "",
      mobile: "",
      brandSeries: "",
      serviceType: "",
      description: ""
    });

    setMachineType("Tractor");
  };

  return (
    <>
      <div className="page servicePage">
        <div className="serviceContainer">

          {/* Breadcrumb */}
          <div className="breadcrumb">
            <span
              className="breadcrumbLink"
              onClick={() => navigate("/")}
            >
              Home
            </span>
            <span className="separator"> &gt; </span>
            <span className="active">Book Service</span>
          </div>

          <div className="serviceWrapper">

            {/* LEFT SIDE */}
            <div className="serviceLeft">

              <h1>Book Service</h1>

              <p className="serviceSubtitle">
                Complete service support for Tractors and Rotavators.
              </p>

              <form className="bookingForm" onSubmit={handleSubmit}>

                {/* Toggle */}
                <div className="toggleWrapper">
                  <button
                    type="button"
                    className={`toggleBtn ${machineType === "Tractor" ? "active" : ""}`}
                    onClick={() => setMachineType("Tractor")}
                  >
                    Tractor
                  </button>

                  <button
                    type="button"
                    className={`toggleBtn ${machineType === "Rotavator" ? "active" : ""}`}
                    onClick={() => setMachineType("Rotavator")}
                  >
                    Rotavator
                  </button>
                </div>

                {/* Name */}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Good Name"
                  className={errors.name ? "inputError" : ""}
                />
                {errors.name && <small className="error">{errors.name}</small>}

                {/* Mobile */}
                <input
                  type="text"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleMobileChange}
                  maxLength={10}
                  placeholder="Mobile Number"
                  className={errors.mobile ? "inputError" : ""}
                />
                {errors.mobile && <small className="error">{errors.mobile}</small>}

                {/* Brand */}
                <input
                  type="text"
                  name="brandSeries"
                  value={form.brandSeries}
                  onChange={handleChange}
                  placeholder={`${machineType} Brand Name & Series Name`}
                  className={errors.brandSeries ? "inputError" : ""}
                />
                {errors.brandSeries && (
                  <small className="error">{errors.brandSeries}</small>
                )}

                {/* Service Type */}
                <div className="selectWrapper">
                  <select
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleChange}
                    onClick={() => setIsOpen(prev => !prev)}
                    onBlur={() => setIsOpen(false)}
                    className={errors.serviceType ? "inputError" : ""}
                  >
                    <option value="">Select Service Type</option>
                    <option value="roadside">Required Road Side Assistance</option>
                    <option value="general">General Service</option>
                    <option value="inspection">Full Inspection</option>
                    <option value="periodic">Periodic Service</option>
                    <option value="wash">Wash & Cleaning</option>
                    <option value="dent_paint">Denting & Painting</option>
                  </select>

                  <IoIosArrowDropdown
                    className={`selectIcon ${isOpen ? "rotate" : ""}`}
                  />
                </div>
                {errors.serviceType && (
                  <small className="error">{errors.serviceType}</small>
                )}

                {/* Description */}
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe Issue (Optional)"
                  rows="4"
                />

                <button
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Book Service"}
                </button>

              </form>

              <p className="genuineNote">
                At our service center, we use only <strong>original and genuine spare parts </strong>
                to protect the performance and life of your machine.
                Farmers trust us because we never compromise on quality —
                your equipment deserves reliability in every season.
              </p>

            </div>

            {/* RIGHT SIDE */}
            <div className="serviceRight">
              <img src={serviceImg} alt="Service" />
            </div>

          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default BookService;