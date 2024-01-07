import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function EditAnalytic() {
  const { route, token, setOnload } = useContext(AppContext);
  const [content, setContent] = useState("");

  const [image, setImage] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const [cates, setCates] = useState([]);
  const id = useParams().id;
  //   Get all  Courses
  useEffect(() => {
    fetch(`${route}/education/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCates(data.data));
  }, []);

  const handelSubmit = function (e) {
    setOnload(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    if (selectedCourse) {
      if (selectedCourse === "home") {
        formData.append("sharedTo", "Home_Post");
      } else {
        formData.append("course", selectedCourse);
      }
    }

    fetch(`${route}/analytic/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors) {
          setErr(data.errors[0].msg);
        } else {
          nav("/all-analytic");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  return (
    <div className="main-sec">
      <h2>Create Analytic </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Contect :*</label>
          <input
            placeholder="Name"
            type="text"
            required
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Image:</label>
          <input type="file" onChange={(e) => handleImageChange(e)} />
        </div>
        <div className="input-group">
          <label>Course :</label>
          <select onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">Public </option>
            <option value="home">Home </option>
            {cates?.map((cate) => (
              <option key={cate._id} value={cate._id}>
                {cate.title}
              </option>
            ))}
          </select>
        </div>

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default EditAnalytic;
