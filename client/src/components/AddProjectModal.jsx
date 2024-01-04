import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FaList } from "react-icons/fa";
// import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";

export default function AddClientModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please fill out all fields");
    }

    addProject(name, description, clientId, status);

    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if (loading) return null;
  if (error) return `Something went Wrong`;

  return (
    <>
      {!loading && !error && (
        <>
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-primary btn-sm mb-3"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="me-2" />
              <span>New Project</span>
            </div>
          </button>

          {/* Modal */}
          <div
            className="modal fade"
            id="addProjectModal"
            tabIndex="-1"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    New Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
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

                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        id="client"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        className="form-control"
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
