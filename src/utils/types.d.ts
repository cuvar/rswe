export declare type ColumnPerScreen =
  | { size: "xs"; col: 3 }
  | { size: "sm"; col: 3 }
  | { size: "md"; col: 6 }
  | { size: "lg"; col: 6 }
  | { size: "xl"; col: 10 };

export declare type WidgetType = "link" | "search" | "calendar" | "time";
export declare interface WidgetConfig extends WidgetPos {
  name: WidgetType;
}
export declare interface WidgetPos {
  colStart: number;
  rowStart: number;
  colSpan: number;
  rowSpan: number;
}

export declare interface CellPosWithNode extends WidgetPos {
  node: Element;
}

export declare type PlaceholderPos = Pick<WidgetPos, "colStart" | "rowStart">;
