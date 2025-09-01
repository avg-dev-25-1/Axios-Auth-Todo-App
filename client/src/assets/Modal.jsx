import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import useTaskContext from "./context/useTaskContext";
import { useCookies } from "react-cookie";
import React from "react";

const schema = yup.object().shape({
  title: yup.string().required("Task title is required").max(100),
  progress: yup.number().min(0).max(100),
});

const Modal = ({ task, mode }) => {
  const { dispatch } = useTaskContext();
  const [cookie, setCookie, removeCookie] = useCookies();
  const editMode = mode === "edit";

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: "", progress: 50 },
  });

  const liveProgress = watch("progress") || 50;

  React.useEffect(() => {
    if (editMode && task) {
      setValue("title", task.title);
      setValue("progress", task.progress);
    }
  }, [editMode, task, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      user_email: editMode
        ? task.user_email
        : cookie.Email /*LHS characeter part(key of key:value pair) should match the req.body{} of backend */,
      title: data.title,
      progress: data.progress,
      date: editMode ? task.date : new Date(),
    };
    try {
      const method = editMode ? axios.put : axios.post;

      const url = editMode
        ? `http://localhost:5000/todos/${task.id}`
        : "http://localhost:5000/todos";

      const res = await method(url, payload);

      if (res.status === 200) {
        dispatch({ type: "TRIGGER_REFRESH" });
        dispatch({ type: "CLOSE_MODAL" });
      }
      console.log("Task list updated:", res.data);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  console.log("Progress update:", liveProgress);
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            {" "}
            <b>X</b>{" "}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title")} placeholder="Type your task here" />
          {errors.title && <p>{errors.title.message}</p>}

          <label htmlFor="range">Select progress</label>
          <input {...register("progress")} type="range" min="0" max="100" />

          <button type="submit" className={mode}>
            {mode}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
