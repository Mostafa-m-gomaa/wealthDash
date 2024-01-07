import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function CreatePackage() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [expirationTime, setExpirationTime] = useState("");
  const [err, setErr] = useState("");
  const [cousrses, setCourses] = useState([]);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");

  const nav = useNavigate();

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
  }, []);

  const handelSubmit = function (e) {
    e.preventDefault();
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
      fetch(`${route}/education/packages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courses: checkBoxVale,
          title: title,
          description: description,
          priceAfterDiscount: priceAfterDiscount,
          price: price,
          image: image,
          expirationTime: expirationTime,
          telegramChannelNames:
            chaneslValue.length === 6 ? ["*"] : chaneslValue,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.errors) {
            setErr(data.errors[0].msg);
          }
          if (data.data) {
            nav("/all-packages");
          }
          setOnload(false);
        })
        .catch((err) => console.log(err));
    } else {
      setOnload(false);
      setErr("You Must Chose Course");
    }
  };
  return (
    <div className="main-sec">
      <h2>Create Package </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :</label>
          <input
            type="text"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Description :</label>
          <textarea
            type="text"
            placeholder="Description"
            required
            onChange={(e) => {
              console.log(e.target.value);
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label>Price :</label>
          <input
            type="number"
            required
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price After Discount :*</label>
          <input
            placeholder="Price After Discount"
            type="number"
            max={price}
            onChange={(e) => setPriceAfterDiscount(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Image :</label>
          <input
            type="text"
            required
            placeholder="image_url"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>ExpirationTime :</label>
          <input
            type="number"
            required
            placeholder="number of day"
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
                  value={course._id}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="checkbox"
                id="chanal1"
                value="MAGNET"
                name="chanal"
              />
              <label htmlFor="chanal1">MAGNET</label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="checkbox"
                id="chanal2"
                value="SK System ( Wealth Makers )"
                name="chanal"
              />
              <label htmlFor="chanal2">SK System ( Wealth Makers )</label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="checkbox"
                id="chanal3"
                value="Parallel"
                name="chanal"
              />
              <label htmlFor="chanal3">Parallel</label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input type="checkbox" id="chanal3" value="M.T" name="chanal" />
              <label htmlFor="chanal3">M.T</label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input type="checkbox" id="chanal3" value="T.G.W" name="chanal" />
              <label htmlFor="chanal3">T.G.W</label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="checkbox"
                id="chanal3"
                value="WEALTH MAKERS (VIP)"
                name="chanal"
              />
              <label htmlFor="chanal3">WEALTH MAKERS (VIP)</label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input type="checkbox" id="all" value="all" name="chanal" />
              <label htmlFor="all">all</label>
            </div>
          </div>
        </div>
        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreatePackage;
