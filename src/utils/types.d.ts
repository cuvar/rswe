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
