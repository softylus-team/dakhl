import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function profitLossChart({profitLoss}) {
    let remain=100-profitLoss;
    return <Doughnut data={{
        datasets: [
            {
                label: '# of Votes',
                data: [profitLoss, remain],
                backgroundColor: [
                    
                    '#052869',
                    'rgba(107, 204, 254, 0.1)'
                ],
                borderColor: [
                    
                    '#052869',
                    'rgba(107, 204, 254, 0.1)'
                ],
                borderWidth: 2,
            },
        ],
    }
    }
        options={{ 
            cutout:"90%",
            maintainAspectRatio: true,
            // circumference:180,
            plugins:{
                legend: {
                    display: false,
                    
                },
            }
         }} />;
}