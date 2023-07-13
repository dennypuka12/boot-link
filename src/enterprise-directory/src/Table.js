
const Table = ({ data }) => {
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Job</th>
            <th>Location</th>
            <th>Salary</th>
          </tr>
          {data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.jobRole}</td>
              <td>{item.workLocation}</td>
              <td>{item.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;