import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Cahrt as CahrtJS } from "chart.js/auto";
import axios from "axios";

function ChartSalesPerMonth({ admin }) {
  const [userData, setUserData] = useState({
    labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Sales Per Month",
        data: [858, 1279, 1347, 1163, 1843, 156],
        backgroundColor: ["#59821e"],
        tension: 0.3,
      },
    ],
  });

  return <Line data={userData} />;
}

export default ChartSalesPerMonth;
