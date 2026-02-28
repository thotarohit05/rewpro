import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbRefresh } from "react-icons/tb";

import "../styles/DealerScreen.css";
import dealerImg from "../assets/dealer.png";
import indiaStatesDistricts from "../assets/data/indiaStatesDistricts";

function DealerScreen({ type = "dealer" }) {

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        state: "",
        district: "",
        tehsil: "",
        companyName: ""
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [clickLock, setClickLock] = useState(false);

    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaError, setCaptchaError] = useState("");

    const fieldRefs = {
        name: useRef(null),
        mobile: useRef(null),
        email: useRef(null),
        state: useRef(null),
        district: useRef(null),
        tehsil: useRef(null),
        companyName: useRef(null)
    };

    useEffect(() => {
        setForm({
            name: "",
            mobile: "",
            email: "",
            state: "",
            district: "",
            tehsil: "",
            companyName: ""
        });

        setErrors({});
        setCaptchaInput("");
        setCaptchaError("");
        generateCaptcha();
    }, [type]);

    /* ================= CAPTCHA ================= */
    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 9) + 1;
        const n2 = Math.floor(Math.random() * 9) + 1;
        setNum1(n1);
        setNum2(n2);
        setCaptchaInput("");
        setCaptchaError("");
    };

    /* ================= INPUT HANDLERS ================= */
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
        if (!form.email.trim())
            newErrors.email = "Email is required";
        if (!form.state)
            newErrors.state = "State is required";
        if (!form.district)
            newErrors.district = "District is required";

        if (type === "dealer" && !form.tehsil.trim())
            newErrors.tehsil = "Tehsil is required";

        if (type === "distributor" && !form.companyName.trim())
            newErrors.companyName = "Company Name is required";
        if (!captchaInput)
            newErrors.captcha = "Captcha is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstError = Object.keys(newErrors)[0];
            fieldRefs[firstError]?.current?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        return Object.keys(newErrors).length === 0;
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async () => {

        if (submitting || clickLock) return;

        if (!validateForm()) {
            setClickLock(true);
            toast.error("Please fill all required fields");
            setTimeout(() => setClickLock(false), 500);
            return;
        }

        if (Number(captchaInput) !== num1 + num2) {
            setCaptchaError("Captcha incorrect");
            toast.error("Captcha incorrect");
            generateCaptcha();
            return;
        }

        setSubmitting(true);

        let insertData = {
            name: form.name,
            mobile: form.mobile,
            email: form.email,
            state: form.state,
            district: form.district,
            is_deleted: false
        };

        if (type === "dealer") {
            insertData.tehsil = form.tehsil;
        }

        if (type === "distributor") {
            insertData.company_name = form.companyName;
        }

        const tableName =
            type === "dealer"
                ? "dealer_requests"
                : "distributor_requests";

        const { error } = await supabase
            .from(tableName)
            .insert([insertData]);

        setSubmitting(false);

        if (error) {
            console.error(error);
            toast.error("Failed to submit. Please try again.");
            return;
        }

        toast.success(
            type === "dealer"
                ? "Dealer request submitted successfully ✅"
                : "Distributor request submitted successfully ✅"
        );

        setForm({
            name: "",
            mobile: "",
            email: "",
            state: "",
            district: "",
            tehsil: "",
            companyName: ""
        });

        setErrors({});
        generateCaptcha();
    };

    return (
        <>
            <div
                className="banner"
                style={{ backgroundImage: `url(${dealerImg})` }}
            >
                <h1>
                    {type === "dealer"
                        ? "BECOME A DEALER"
                        : "BECOME A DISTRIBUTOR"}
                </h1>
            </div>

            <div className="formCard">

                <div className="formGrid">

                    <div className="field">
                        <label>Name *</label>
                        <input
                            ref={fieldRefs.name}
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className={errors.name ? "inputError" : ""}
                            placeholder="Enter full name"
                        />
                        {errors.name && <small className="error">{errors.name}</small>}
                    </div>

                    {type === "distributor" && (
                        <div className="field">
                            <label>Company Name *</label>
                            <input
                                ref={fieldRefs.companyName}
                                name="companyName"
                                value={form.companyName}
                                onChange={handleChange}
                                className={errors.companyName ? "inputError" : ""}
                                placeholder="Enter company name"
                            />
                            {errors.companyName && (
                                <small className="error">{errors.companyName}</small>
                            )}
                        </div>
                    )}

                    <div className="field">
                        <label>Mobile *</label>
                        <input
                            ref={fieldRefs.mobile}
                            name="mobile"
                            value={form.mobile}
                            onChange={handleMobileChange}
                            maxLength={10}
                            className={errors.mobile ? "inputError" : ""}
                            placeholder="Enter 10-digit mobile"
                        />
                        {errors.mobile && (
                            <small className="error">{errors.mobile}</small>
                        )}
                    </div>

                    <div className="field">
                        <label>Email *</label>
                        <input
                            ref={fieldRefs.email}
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={errors.email ? "inputError" : ""}
                            placeholder="Enter email"
                        />
                        {errors.email && (
                            <small className="error">{errors.email}</small>
                        )}
                    </div>

                    <div className="field">
                        <label>State *</label>
                        <select
                            ref={fieldRefs.state}
                            name="state"
                            value={form.state}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    state: e.target.value,
                                    district: ""
                                })
                            }
                            className={`${form.state ? "hasValue" : ""} ${errors.state ? "inputError" : ""}`}
                        >
                            <option value="">Select State</option>
                            {Object.keys(indiaStatesDistricts).map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>

                        {errors.state && <small className="error">{errors.state}</small>}

                    </div>

                    <div className="field">
                        <label>District *</label>
                        <select
                            ref={fieldRefs.district}
                            name="district"
                            value={form.district}
                            onChange={handleChange}
                            disabled={!form.state}
                            className={`${form.district ? "hasValue" : ""} ${errors.district ? "inputError" : ""}`}
                        >
                            <option value="">Select District</option>
                            {form.state &&
                                indiaStatesDistricts[form.state]?.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                        </select>

                        {errors.district && (
                            <small className="error">{errors.district}</small>
                        )}

                    </div>
                    {type === "dealer" && (
                        <div className="field">
                            <label>Tehsil *</label>
                            <input
                                ref={fieldRefs.tehsil}
                                name="tehsil"
                                value={form.tehsil}
                                onChange={handleChange}
                                placeholder="Enter tehsil"
                                className={errors.tehsil ? "inputError" : ""}
                            />

                            {errors.tehsil && (
                                <small className="error">{errors.tehsil}</small>
                            )}

                        </div>
                    )}

                </div>
                <div className="captchaRow">
                    <label>Captcha *</label>

                    <div className="captchaBox">
                        <input
                            value={captchaInput}
                            onChange={(e) =>
                                setCaptchaInput(e.target.value.replace(/\D/g, ""))
                            }
                            placeholder="Answer"
                            className={errors.captcha ? "inputError" : ""}
                        />
                        <span>{num1} + {num2} = ?</span>
                        <button
                            type="button"
                            onClick={generateCaptcha}
                            title="Refresh captcha"
                            className="captchaRefreshBtn"
                        >
                            <TbRefresh />
                        </button>
                    </div>

                    {/* ✅ ERROR BELOW BOX */}
                    {errors.captcha && (
                        <p className="error">{errors.captcha}</p>
                    )}
                </div>

                <button
                    className="submitBtn"
                    onClick={handleSubmit}
                    disabled={submitting}
                >
                    {submitting ? "Sending..." : "Submit"}
                </button>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default DealerScreen;