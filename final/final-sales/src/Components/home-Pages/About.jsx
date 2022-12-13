import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      <p>
        <Link to="/">
          <span>SalesUp</span>
        </Link>{" "}
        is a platform for sales business, helps sales organization/people to record their inventory.
      </p>
      <p>
        There are 3 different functional ways to organize your products.
        <p>
          &#11088; Sales Record - General (Daily record of sales.)
          <br></br>
          &#11088; Stock Record (Whether the product is still in stock in the warehouse.)
          <br></br>
          &#11088; Sales Record - Baseline (Daily record of salesItems with minimum shipments per sale.)
        </p>
        <br />
        Users can add records by clicking on the{" "}
        <Link to="/add-record">
          <span>Add Product</span>
        </Link>{" "}
        button.
        <br></br>
        Also users can create log to their sales. User can see the logs of
        the record by clicking the View Product details accordion.
        <br></br>
        We provide users with a pie chart to show the sale situation of every recorded product. Also users can check
        the calender about sale record for every single day.
        <br />
        In addition, users can check and update their profiles.
        <br />
        Feel free to{" "}
        <Link to="/profile">
          <span>Update</span>
        </Link>{" "}
        all the personal data.
      </p>
    </div>
  );
};

export default About;
