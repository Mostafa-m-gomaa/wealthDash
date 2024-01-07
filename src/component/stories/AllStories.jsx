import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image-svgrepo-com.svg";
function AllStories() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [stories, setStories] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);

  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}/stories/${delId}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setRefresh((prev) => prev + 1);
        setDelId("");
        setIsPop(false);
        setOnload(false);
      });
  };
  useEffect(() => {
    setOnload(true);

    fetch(`${route}/stories?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPagesNumber(data.paginationResult.numberOfPages);
        setStories(data.data);
        setOnload(false);
      });
  }, [refresh, currentPage]);
  return (
    <div className="main-sec">
      {isPop && (
        <div className="popUp">
          <div>
            <h2>Are You Sure you want to delete this Story</h2>
            <div>
              <span className="del" onClick={() => handelDelete()}>
                Yes
              </span>
              <span
                className="edit"
                onClick={() => {
                  setIsPop(false);
                  setDelId("");
                }}
              >
                No
              </span>
            </div>
          </div>
        </div>
      )}

      <h2>All Stories</h2>
      <table>
        <thead>
          <tr>
            <td>Video</td>
            <td>Image</td>

            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {stories.map((story) => (
            <tr key={story._id}>
              <td>
                <a
                  href={story.video}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "blue" }}
                >
                  {story.video}
                </a>
              </td>
              <td>
                <img
                  src={story.image}
                  onError={(e) => (e.target.src = noImage)}
                  alt=""
                />
              </td>
              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setDelId(story._id);
                  }}
                >
                  Delete
                </div>
                <Link to={`/edit-story/${story._id}`} className="edit">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>we have {pagesNumber} pages</h2>
      <div className="pagination">
        <div
          className={`paginationBtn ${currentPage >= 2 ? "" : "off"}`}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          previous
        </div>

        <div>{currentPage}</div>

        <div
          className={`paginationBtn ${pagesNumber > currentPage ? "" : "off"}`}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          next
        </div>
      </div>
    </div>
  );
}

export default AllStories;
