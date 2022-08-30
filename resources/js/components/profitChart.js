import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProfitChart({totalProfit,totalLoss,totalPays}) {
    return <Doughnut data={{
        labels: [totalProfit, totalLoss, totalPays,""],
        datasets: [
            {
                label: '# of Votes',
                data: [50, 16, 17,17],
                backgroundColor: [
                    '#8BD9E8',
                    '#0096C7',
                    '#052869',
                    'rgba(107, 204, 254, 0.1)'
                ],
                borderColor: [
                    '#8BD9E8',
                    '#0096C7',
                    '#052869',
                    'rgba(107, 204, 254, 0.1)'
                ],
                borderWidth: 2,
            },
        ],
    }
    }
        options={{ 
            cutout:"50%",
            // circumference:180,
            plugins:{
                legend: {
                    rtl: true,
                    position: "bottom",
                    align: "start",
                    labels: {
                        font: {
                            size: 14,
                            family: "cairo",
                            color: "#6A6A6A",
                            weight: "500"
                        },
                        usePointStyle: true,
                        pointStyle: "rect",
                        padding:20,
                    }
                },
            }
         }} />;
}