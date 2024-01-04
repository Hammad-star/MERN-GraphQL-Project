import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    // update(cache, { data: { updateProject } }) {
    //   const { project } = cache.readQuery({
    //     query: GET_PROJECT,
    //     variables: { id: project.id },
    //   });
    //   cache.writeQuery({
    //     query: GET_PROJECT,
    //     variables: { id: project.id },
    //     data: { project: updateProject },
    //   });
    // },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please fill out all fields");
    }

    updateProject(name, description, status);
  };
  return (
    <div className="mt5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Name
          </label>
          <input
            type="text"
            name=""
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Description
          </label>
          <textarea
            name=""
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-control"
          >
            <option value="new">Not Started</option>
            <option value="progress">In Proress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
