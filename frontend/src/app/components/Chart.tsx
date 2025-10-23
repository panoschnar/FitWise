"use client";

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import ReactECharts from "echarts-for-react";

interface ChartProps {
  title: string;
  type: "line" | "bar" | "pie";
  labels?: string[];
  data: number[] | { name: string; value: number }[] | any[];
  yAxisName?: string;
  lineColor?: string;
  areaGradient?: [string, string];
  gradientColors?: string[];
  height?: number;
}

export default function Chart({
  title,
  type,
  labels = [],
  data,
  yAxisName = "",
  lineColor = "#be95be",
  areaGradient,
  gradientColors = ["#be95be", "#aaefda", "#d1c6ff"],

  height = 400,
}: ChartProps) {
  let series: any = [];

  if (type === "line") {
    series = [
      {
        type: "line",
        smooth: true,
        data,
        lineStyle: { color: lineColor, width: 3 },
        itemStyle: { color: lineColor },
        areaStyle: areaGradient
          ? {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: areaGradient[0] },
                  { offset: 1, color: areaGradient[1] },
                ],
              },
            }
          : undefined,
      },
    ];
  } else if (type === "bar") {
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === "number") {
      // Single series bar chart
     series = [
      {
        type: "bar",
        data,
        itemStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: gradientColors[0] },
              { offset: 1, color: gradientColors[1] },
            ],
          },
          barBorderRadius: [6, 6, 0, 0],
        },
      },
    ];
    } else {
      // Multi-series bar chart: assume fully-formed series objects
      series = data;
    }
  } else if (type === "pie") {
    series = [
      {
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        data:
          Array.isArray(data) &&
          data.map((d, idx) => ({
            ...d,
            value: Number(d.value.toFixed(2)),
            itemStyle: { color: gradientColors[idx % gradientColors.length] },
          })),
        label: { formatter: "{b}: {c}gr" },
        emphasis: { scale: true },
      },
    ];
  }

  const option = {
    // title: {
    //   text: title,
    //   left: "center",
    //   textStyle: { fontWeight: "bold", color: "#be95be" },
    // },
    tooltip: {
      trigger: type === "pie" ? "item" : "axis",
      formatter: type === "pie" ? "{b}: {c}" : undefined,
    },
    xAxis:
      type !== "pie"
        ? {
            type: "category",
            data: labels,
            axisLine: { lineStyle: { color: "#000" } },
          }
        : undefined,
    yAxis:
      type !== "pie"
        ? {
            type: "value",
            name: yAxisName,
            axisLine: { lineStyle: { color: "#000" } },
          }
        : undefined,
    series,
  };

  return (
    <Card sx={{ background: "#fff", borderRadius: 3, boxShadow: 3, mb: 4 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#be95be", textAlign: "center" }}
        >
          {title}
        </Typography>
        <ReactECharts option={option} style={{ height }} />
      </CardContent>
    </Card>
  );
}
