"use client";

import React from "react";
import WidgetView from "./WidgetView";

const INITIAL_DATA: WidgetConfig[] = [
  {
    name: "time",
    colStart: 1,
    rowStart: 1,
    colSpan: 3,
    rowSpan: 1,
  },
  {
    name: "search",
    colStart: 1,
    rowStart: 2,
    colSpan: 3,
    rowSpan: 1,
  },
  {
    name: "calendar",
    colStart: 4,
    rowStart: 1,
    colSpan: 3,
    rowSpan: 2,
  },
  {
    name: "link",
    colStart: 1,
    rowStart: 3,
    colSpan: 4,
    rowSpan: 1,
  },
];

export default function RSWE() {
  return (
    <div>
      <div>hello world form rswe</div>
      <WidgetView initialData={INITIAL_DATA} />
    </div>
  );
}
