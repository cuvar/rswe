interface LinkData {
  text: string;
  href: string;
  tab: "new" | "same";
}

// data that needs to be passed to the WidgetView component -> all data for all widgets
interface WidgetViewData {
  calendarData: CalendarData[][];
}

interface SearchEngineData {
  key: "google" | "duckduckgo" | "ecosia" | "gdrive";
  displayName: string;
  url: string;
}

interface CalendarData {
  title: string;
  start: Date;
  end: Date;
  duration: number;
}

type ColumnPerScreen =
  | { size: "xs"; col: 3 }
  | { size: "sm"; col: 3 }
  | { size: "md"; col: 6 }
  | { size: "lg"; col: 6 }
  | { size: "xl"; col: 10 };

type WidgetType = "link" | "search" | "calendar" | "time";
interface WidgetConfig extends WidgetPos {
  name: WidgetType;
}
interface WidgetPos {
  colStart: number;
  rowStart: number;
  colSpan: number;
  rowSpan: number;
}

interface CellPosWithNode extends WidgetPos {
  node: Element;
}

type PlaceholderPos = Pick<WidgetPos, "colStart" | "rowStart">;
