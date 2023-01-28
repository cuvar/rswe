"use client";

import React from "react";

interface IProps extends WidgetPos {
  children: React.ReactNode;
  idName?: string;
  minColSpan?: number;
  minRowSpan?: number;
}

export default function WidgetContainer(props: IProps) {
  const minimumColSpan = Math.min(props.minColSpan ?? 3, 3);

  const tempColSpan = props.colSpan ?? 1;
  const tempRowSpan = props.rowSpan ?? 1;

  const col =
    typeof minimumColSpan === "undefined"
      ? tempColSpan
      : Math.max(tempColSpan, minimumColSpan);

  const row =
    typeof props.minRowSpan === "undefined"
      ? tempRowSpan
      : Math.max(tempRowSpan, props.minRowSpan);

  const colStart = props.colStart ?? -1;
  const rowStart = props.rowStart ?? -1;

  let gridClasses = `col-span-${Math.min(
    3,
    col
  )} md:col-span-${col} row-span-${row}`;
  if (colStart > 0) {
    gridClasses += ` col-start-${colStart}`;
  }
  if (rowStart > 0) {
    gridClasses += ` row-start-${rowStart}`;
  }

  function handleDragStart(e: any) {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        colStart: colStart,
        rowStart: rowStart,
        colSpan: col,
        rowSpan: row,
        id: e.target.id,
      })
    );

    // console.log(e.target.id);
    // console.log("drag start");
  }

  return (
    <div
      className={`widget flex justify-center items-center ${gridClasses}`}
      id={props.idName}
      draggable={true}
      onDragStart={handleDragStart}
    >
      {props.children}
    </div>
  );
}
