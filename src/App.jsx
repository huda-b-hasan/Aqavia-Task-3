import { useEffect, useState } from "react";
import Comment from "./Component/Comment";
import axios from "axios";
import { v4 as uuid4 } from "uuid";
import "./App.css";
import Form from "./Form";
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [commentAddEdit, setCommentAddEdit] = useState({
    postId: "",
    id: "",
    name: "",
    email: "",
    body: "",
  });
  const [ActionComment, setActionComment] = useState("");

  const url = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/comments",
  });

  useEffect(() => {
    url
      .get()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function handleSubmit() {
    console.log(ActionComment);
    if (ActionComment == "add") {
      url
        .post("", commentAddEdit)
        .then((response) => {
          setData((prev) => [...prev, { ...response.data, id: uuid4() }]);
          setCommentAddEdit({
            postId: "",
            id: "",
            name: "",
            email: "",
            body: "",
          });
          console.log("Comment created successfully");
        })
        .catch(() => {
          console.log("Error creating Comment");
        });
    } else if (ActionComment == "edit") {
      url
        .put(`${commentAddEdit.id}`, {
          ...commentAddEdit,
        })
        .then((response) => {
          console.log("Comment Editting successfully");
          const editCommnet = response.data;
          setData(
            data.map((comment) => {
              return comment.id == editCommnet.id ? editCommnet : comment;
            }),
          );
        })
        .catch(() => {
          console.log("Error Editting Comment");
          // editting the comment out of json file
          setData(
            data.map((comment) => {
              return comment.id == commentAddEdit.id ? commentAddEdit : comment;
            }),
          );
        });
    }
    closeForm();
  }
  function addComment(event) {
    openForm();
    setActionComment(event.target.id);
    const emptyComment = { postId: "1" };
    setCommentAddEdit(emptyComment);
  }
  function editComment(event, commentData) {
    console.log("edit click");
    openForm();
    setActionComment(event.target.id);
    setCommentAddEdit({ ...commentData });
  }
  function DeleteComment(idComment) {
    url
      .delete(`${idComment}`)
      .then(() => {
        console.log(`Deleted Comment succesfull ${idComment}`);
        setData(
          data.filter((comment) => {
            return comment.id !== idComment;
          }),
        );
      })
      .catch(() => {
        console.log(` Error Deleted Comment ${idComment}`);
      });
  }
  function openForm() {
    setShowForm(true);
  }
  function closeForm() {
    setShowForm(false);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setCommentAddEdit({ ...commentAddEdit, [name]: value });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {showForm ? (
        <Form
          closeForm={closeForm}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          commentAddEdit={commentAddEdit}
        />
      ) : (
        <></>
      )}
      <div className="addcomment">
        <h2>Add Comment</h2>
        <button
          id="add"
          onClick={() => {
            addComment(event);
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {data.map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            DeleteComment={DeleteComment}
            editComment={editComment}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
