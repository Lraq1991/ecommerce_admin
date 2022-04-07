import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Cahrt as CahrtJS } from "chart.js/auto";

function ChartEarningsPerMonth({ admin }) {
  const [userData, setUserData] = useState({
    labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Earnings Per Month in Dollars",
        data: [5067, 9870, 9798, 10587, 25798, 897],
        backgroundColor: ["rgba(75,192,192)"],
      },
    ],
  });
  return <Bar data={userData} />;
}

export default ChartEarningsPerMonth;
