import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted() {
      navigate("/");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
    // update(cache, { data: { deleteProject } }) {
    //   const { projects } = cache.readQuery({ query: GET_PROJECTS });
    //   cache.writeQuery({
    //     query: GET_PROJECTS,
    //     data: { projects: projects.filter((p) => p.id !== deleteProject.id) },
    //   });
    // },
  });
  return (
    <div className="d-fles mt-5 ms-auto">
      <button className="btn btn-danger btn-sm mt-2" onClick={deleteProject}>
        <FaTrash className="icon" />
        <span>Delete Project</span>
      </button>
    </div>
  );
}
