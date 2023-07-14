const Table = ({ data, role }) => {
  console.log(data);
  console.log(role);  
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          {role && <th>Phone Number</th>}  
          <th>Job</th>
          <th>Location</th>
          {(role === 'Manager' || role === 'HR') && <th>Salary</th>}  
        </tr>
        {data.map((item) => (
          <tr key={item.name}>
            <td>{item.name}</td>
            {role && <td>{item.phoneNumber}</td>}  
            <td>{item.jobRole}</td>
            <td>{item.workLocation}</td>
            {(role === 'Manager' || role === 'HR') && <td>{item.salary}</td>}  
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
