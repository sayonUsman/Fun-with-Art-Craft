const Dashboard = () => {
  return (
    <div className="mt-20 md:mt-4 mb-7">
      <p className="text-4xl xl:text-5xl text-center font-bold">
        Your Activities
      </p>

      <div className="overflow-x-auto mt-9">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Selected Classes</th>
              <th>Available Seats</th>
              <th>Course Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr className="hover">
              <th>1</th>
              <td>Knitting</td>
              <td>12</td>
              <td>$225.00</td>
              <td>Pay Now</td>
              <td>Delete</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto mt-16">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Enrolled Classes</th>
              <th>Instructor Name</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr className="hover">
              <th>1</th>
              <td>Mosaic Madness</td>
              <td>David Smith</td>
              <td>See Tutorial</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
