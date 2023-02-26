"use client";

import React from "react";
import "./WidgetView.css";
import WidgetPlaceholder from "./WidgetPlaceholder";
import { useEffect } from "react";
import {
  gridAtom,
  columnAtom,
  placeholderPosAtom,
  widgetDataAtom,
} from "./utils/state";
import { useAtom } from "jotai";
import { getScreenSize } from "./utils/size";
import { calcPlaceholderPos, validateWidgetData } from "./utils/grid";
import { WidgetConfig } from "./utils/types";

interface IProps {
  initialData: WidgetConfig[];
}
export default function WidgetView(props: IProps) {
  const [_, setGridContainer] = useAtom(gridAtom);
  const [columnCount, setColumnCount] = useAtom(columnAtom);
  const [placeholderPos, setPlaceholderPos] = useAtom(placeholderPosAtom);
  const [widgetData, setWidgetData] = useAtom(widgetDataAtom);

  useEffect(() => {
    try {
      const validatedData = validateWidgetData(props.initialData);
      setWidgetData(validatedData);
    } catch (error: any) {
      throw new Error(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const container = document.getElementById("panal-widgetview");
    // todo: ?
    // @ts-ignore
    setGridContainer(container);
    setColumnCount(getScreenSize().col);
    setPlaceholderPos(calcPlaceholderPos(widgetData, columnCount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnCount, widgetData]);

  return (
    // %docs: needs custom css due to size of a cell (100px)
    <div
      className={`h-full grid auto-rows sm-cols-3md-cols-6 xl-cols-10 gap-4 sm:gap-6 `}
      id={"panal-widgetview"}
    >
      {/* {widgetData.map((el) => {
        switch (el.name) {
          case "time":
            return <TimeWidget key={el.name} {...el} />;
          case "search":
            return <SearchWidget key={el.name} {...el} />;
          case "calendar":
            return (
              <CalendarWidget
                calendarData={props.data.calendarData}
                key={el.name}
                {...el}
              />
            );
          case "link":
            return <LinkCollectionWidget key={el.name} {...el} />;
          default:
            break;
        }
      })} */}

      {placeholderPos.map((el) => (
        <WidgetPlaceholder key={el.colStart + "-" + el.rowStart} {...el} />
      ))}
    </div>
  );
}
