
import React from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);
// "linear-gradient(180deg, rgba(62, 113, 242, 0.19) 0%, rgba(255, 255, 255, 0) 141.68%)",

function getGradient(ctx, chartArea) {
    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, "rgba(62, 113, 242, 0.19)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        // gradient.addColorStop(1, Utils.CHART_COLORS.red);
    }
    // ctx.fillStyle = gradient;
    ctx.fillRect(20, 20, 150, 100);
    return gradient;
}
export default function ReturnChart({ months, yLabel, xLabel, openInvestment, closedInvestment }) {
    return (
        <div className="ReturnChart h-80">
            <Line data={{
                labels: months,
                datasets: [
                    {
                        label: openInvestment,
                        data: [33, 53, 85, 41, 44, 65, 784, 214, 698, 784, 236, 852],
                        fill: true,
                        backgroundColor: function (context) {
                            const chart = context.chart;
                            const { ctx, chartArea } = chart;

                            if (!chartArea) {
                                // This case happens on initial chart load
                                return;
                            }
                            return getGradient(ctx, chartArea);
                        },
                        borderColor: "#02044F",
                        pointBackgroundColor:"#02044F",
                        lineTension: 0.6,
                        radius: 0,
                        borderWidth: 2
                    },
                    {
                        label: closedInvestment,
                        data: [33, 25, 35, 51, 54, 76, 1000, 654, 845, 235, 41, 512],
                        fill: false,
                        borderColor: "#90E0EF",
                        backgroundColor: "#90E0EF",
                        lineTension: 0.6,
                        radius: 0,
                        borderWidth: 2
                    }
                ]
            }}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: yLabel,
                                align: "end",
                                font: {
                                    size: 14,
                                    family: "cairo",
                                    color: "#6A6A6A",
                                    weight: "500"
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: xLabel,
                                align: "end",
                                font: {
                                    size: 14,
                                    family: "cairo",
                                    color: "#6A6A6A",
                                    weight: "500"
                                }
                            },
                            ticks: {
                                font: {
                                    size: 14,
                                    family: "cairo",
                                    color: "#6A6A6A",
                                    weight: "300"
                                }
                            }
                        }
                    },
                    elements: {
                        line: {
                            borderJoinStyle: "round",
                        }
                    },
                    plugins: {
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
                            }
                        },
                        legendBackground: {

                            beforeDraw: (chart, args, opts) => {
                                const {
                                    chartArea: {
                                        width,
                                        top,
                                        left
                                    },
                                    ctx
                                } = chart;
                                ctx.fillStyle = "#02044F";
                                ctx.fillRect(left, 0, width, top)
                            }
                        }
                    },

                }} />
        </div>
    );
}
