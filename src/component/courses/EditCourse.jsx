import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function EditCourse() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [priceAfter, setPriceAfter] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const id = useParams().id;
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`${route}/education/courses/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setDesc(data?.data?.description);
      })
      .catch((err) => console.log(err));
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();
    setOnload(true);
    const data = { description: desc };
    if (title) {
      data.title = title;
    }
    if (price) {
      data.price = price;
    }
    if (priceAfter) {
      data.priceAfterDiscount = priceAfter;
    }
    fetch(`${route}/education/courses/${id}`, {
      method: "PUt",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-courses");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Edit Course </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :</label>
          <input
            placeholder={data?.title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Description :</label>
          <textarea
            value={desc}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price :</label>
          <input
            placeholder={data?.price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price After Discount :</label>
          <input
            placeholder={data?.priceAfterDiscount}
            type="number"
            max={price}
            onChange={(e) => setPriceAfter(e.target.value)}
          />
        </div>

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditCourse;
