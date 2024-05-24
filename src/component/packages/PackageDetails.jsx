import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

const PackageDetails = () => {
  const [thisPackage, setPackage] = useState(null);
  const { route } = useContext(AppContext);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${route}/education/packages/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPackage(data.data);
        console.log(data);
      });
  }, []);
  console.log(thisPackage);
  return (
    <main className="main-sec">
      <h1>Title : {thisPackage?.title}</h1>
      <h2
        style={{
          textAlign: "start",
        }}
      >
        Description : {thisPackage?.description}
      </h2>
      <h2
        style={{
          textAlign: "start",
        }}
      >
        Price : {thisPackage?.price}
      </h2>
      <h2
        style={{
          textAlign: "start",
        }}
      >
        Price After Discount : {thisPackage?.priceAfterDiscount}
      </h2>
      <h2
        style={{
          textAlign: "start",
        }}
      >
        Duration : {thisPackage?.expirationTime}
      </h2>
      <h2
        style={{
          textAlign: "start",
        }}
      >
        Description : {thisPackage?.description}
      </h2>
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Courses
        </span>
        {thisPackage?.courses?.map((course) => {
          return (
            <div>
              <p>{course.title}</p>
              <p>{course.description}</p>
            </div>
          );
        })}
      </div>
      <table>
        <thead>
          <tr>
            <td>User id</td>
            <td>Start at</td>
            <td>end at</td>
          </tr>
        </thead>
        <tbody>
          {thisPackage?.users?.map((user) => (
            <tr>
              <td>{user.user}</td>
              <td>{new Date(user.start_date).toLocaleDateString()}</td>
              <td>{new Date(user.end_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default PackageDetails;
