import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow.jsx";
import { GET_CLIENTS } from "../queries/clientQueries.js";
import Spinner from "./Spinner.jsx";

// const GET_CLIENTS = gql`
//   query GetClients {
//     clients {
//       id
//       name
//       email
//       phone
//     }
//   }
// `;

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <div>Error :</div>;
  return (
    <>
      {
        !loading && !error && (
          // data.clients.map((client) => (
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>phone</th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <ClientRow key={client.id} client={client} />
                // <tr>
                //   <td>{client.id}</td>
                //   <td>{client.name}</td>
                //   <td>{client.email}</td>
                //   <td>{client.phone}</td>
                // </tr>
              ))}
            </tbody>
          </table>
        )
        // ))
      }
    </>
  );
}
