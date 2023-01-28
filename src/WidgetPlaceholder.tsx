"use client";

import React from "react";
import { useAtom } from "jotai";
import {
  calcPlaceholderPos,
  getFreeCells,
  parseGridPosition,
  validateWidgetData,
} from "./utils/grid";
import {
  columnAtom,
  errorAtom,
  gridAtom,
  placeholderPosAtom,
  widgetDataAtom,
} from "./utils/state";

interface IProps {
  colStart: number;
  rowStart: number;
}

export default function WidgetPlaceholder(props: IProps) {
  const [gridContainer] = useAtom(gridAtom);
  const [_, setPlaceholderPos] = useAtom(placeholderPosAtom);
  const [widgetData, setWidgetData] = useAtom(widgetDataAtom);
  const [columnCount, __] = useAtom(columnAtom);
  const [___, setGlobalError] = useAtom(errorAtom);

  function handleDrop(e: any) {
    const widgetProps: WidgetPos & { id: string } = JSON.parse(
      e.dataTransfer.getData("text/plain")
    );
    const draggedWidget = document.getElementById(widgetProps.id);

    // check if there is enough space for col and row
    if (!gridContainer || !draggedWidget) return;

    const dndStartPosition = getDNDPosition(
      gridContainer,
      widgetProps,
      e.target
    );

    if (dndStartPosition == null) return;

    // set widget to placholder position
    draggedWidget.classList.add("col-start-" + dndStartPosition.colStart);
    draggedWidget.classList.add("row-start-" + dndStartPosition.rowStart);

    // updateWidgetData
    const widgetToMoveIndex = widgetData.findIndex((el) => {
      return (
        el.colStart == widgetProps.colStart &&
        el.rowStart == widgetProps.rowStart
      );
    });
    let newWidgetData = widgetData;

    const newWidget = JSON.parse(JSON.stringify(widgetData[widgetToMoveIndex]));
    if (typeof newWidget === "undefined") return;

    newWidget.colStart = dndStartPosition.colStart;
    newWidget.rowStart = dndStartPosition.rowStart;

    newWidgetData[widgetToMoveIndex] = newWidget;

    try {
      const validatedData = validateWidgetData(newWidgetData);
      setWidgetData(validatedData);
    } catch (error: any) {
      throw new Error(error.message);
    }

    // set placeholder to widget position
    const placeholder = calcPlaceholderPos(widgetData, columnCount);
    setPlaceholderPos(placeholder);
  }

  // todo: only load data for calendarwidget if it is present in UI

  //fix: there is a bug when dragging a widget to the right side of another widget; and the left side needs to be empty for this

  // todo: implement dnd also for when placing on other widgets, as well as when placing on itself
  // todo: -> e.g. when moving 1 cell to the side for link view
  function getDNDPosition(
    gridContainer: HTMLElement,
    widgetProps: WidgetPos & { id: string },
    dropTagetCell: HTMLElement
  ): CellPosWithNode | null {
    // gets all placeholder positions
    const placeholderPos = getFreeCells(gridContainer);
    const possibleCellsForDrop = placeholderPos.filter((node) => {
      for (let i = 0; i < widgetProps.colSpan; i++) {
        // %docs: find a cell with same row and col + i on the right side
        const adjacentCell = placeholderPos.find(
          (el) =>
            el.colStart === node.colStart + i && el.rowStart === node.rowStart
        );
        if (!adjacentCell) return false;
      }
      return true;
    });

    const dropTargetPos: CellPosWithNode = parseGridPosition(dropTagetCell);
    const dndStartPosition = possibleCellsForDrop.find((el) => {
      return (
        el.colStart === dropTargetPos.colStart &&
        el.rowStart === dropTargetPos.rowStart
      );
    });

    return dndStartPosition === undefined ? null : dndStartPosition;
  }
  function handleDragOver(e: any) {
    e.preventDefault();
  }

  return (
    <div
      className={`panal-placeholder bg-yellow-500 col-start-${props.colStart} row-start-${props.rowStart}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    ></div>
  );
}
