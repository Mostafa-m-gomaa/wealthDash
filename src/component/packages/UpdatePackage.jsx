import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePackage() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [expirationTime, setExpirationTime] = useState("");
  const [err, setErr] = useState("");
  const [cousrses, setCourses] = useState([]);
  const nav = useNavigate();
  const id = useParams().id;
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [telegramChannels, setTelegramChannels] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [data, setdata] = useState({});
  useEffect(() => {
    fetch(`${route}/education/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data.data));
    fetch(`${route}/education/packages/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setdata(data.data);
        setSelectedCourses(data.data.courses?.map((e) => e._id));
        setTelegramChannels(data.data.telegramChannelNames);
        setDescription(data.data.description);
      });
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();
    const data = {};
    const checkBoxVale = [];
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][name="course"]:checked'
    );
    Array.from(checkboxes).map(function (checkbox) {
      return checkBoxVale.push(checkbox.value);
    });
    const chaneslValue = [];
    const chaleslArray = document.querySelectorAll(
      'input[type="checkbox"][name="chanal"]:checked'
    );
    Array.from(chaleslArray).map(function (checkbox) {
      return chaneslValue.push(checkbox.value);
    });
    setOnload(true);
    if (checkBoxVale.length != 0) {
      data.courses = checkBoxVale;
    }
    if (chaneslValue.includes("*")) {
      data.telegramChannelNames = ["*"];
    } else if (chaneslValue.length != 0) {
      data.telegramChannelNames =
        chaneslValue.length === 6 ? ["*"] : chaneslValue;
    }
    if (title) {
      data.title = title;
    }
    if (description) {
      data.description = description;
    }
    if (price) {
      data.price = price;
    }
    if (priceAfterDiscount) {
      data.priceAfterDiscount = priceAfterDiscount;
    }
    if (image) {
      data.image = image;
    }
    if (expirationTime) {
      data.expirationTime = expirationTime;
    }
    fetch(`${route}/education/packages/${id}`, {
      method: "PUT",
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
          nav("/all-packages");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
    setOnload(false);
  };
  const checkBoxOnChange = (e, key) => {
    if (key === "telegram") {
      if (e.target.checked) {
        setTelegramChannels((prev) => [...prev, e.target.value]);
      } else {
        setTelegramChannels((prev) =>
          prev.filter((value) => value !== e.target.value)
        );
      }
    } else {
      if (e.target.checked) {
        setSelectedCourses((prev) => [...prev, e.target.value]);
      } else {
        setSelectedCourses((prev) =>
          prev.filter((value) => value !== e.target.value)
        );
      }
    }
  };
  const mainChannels = [
    "MAGNET",
    "SK System ( Wealth Makers )",
    "Parallel",
    "M.T",
    "T.G.W",
    "WEALTH MAKERS (VIP)",
  ];
  return (
    <div className="main-sec">
      <h2>Edit Package </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :</label>
          <input
            type="text"
            placeholder={data?.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Description :</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price :</label>
          <input
            type="number"
            placeholder={data?.price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price After Discount :*</label>
          <input
            placeholder={data.priceAfterDiscount}
            type="number"
            max={price}
            required={price}
            onChange={(e) => setPriceAfterDiscount(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Image :</label>
          <input
            type="text"
            placeholder={data?.image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>ExpirationTime :</label>
          <input
            type="number"
            placeholder={data?.expirationTime}
            onChange={(e) => setExpirationTime(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Course :</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {cousrses?.map((course) => (
              <div
                key={course._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type="checkbox"
                  id={course._id}
                  checked={selectedCourses?.includes(course._id)}
                  value={course._id}
                  onChange={(e) => {
                    checkBoxOnChange(e);
                  }}
                  name="course"
                />
                <label htmlFor={course._id}>{course.title}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="input-group">
          <label>Telegram chanel names :</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {mainChannels.map((name, ind) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type="checkbox"
                  id={`chanal${ind}`}
                  value={name}
                  onChange={(e) => {
                    checkBoxOnChange(e, "telegram");
                  }}
                  checked={telegramChannels?.includes(name)}
                  name="chanal"
                />
                <label htmlFor={`chanal${ind}`}>{name}</label>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                onChange={(e) => {
                  checkBoxOnChange(e, "telegram");
                }}
                checked={telegramChannels?.includes("*")}
                id="all"
                value="*"
                type="checkbox"
                name="chanal"
              />
              <label htmlFor="all">all</label>
            </div>
          </div>
        </div>
        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Edit
        </button>
      </form>
    </div>
  );
}

export default UpdatePackage;
