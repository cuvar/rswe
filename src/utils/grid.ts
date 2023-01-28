function getFreeCells(gridContainer: HTMLElement): CellPosWithNode[] {
  const placeholder = gridContainer?.querySelectorAll(".panal-placeholder");
  const freeCells: CellPosWithNode[] = Array.from(placeholder).map((el) =>
    parseGridPosition(el)
  );

  return freeCells;
}

function parseGridPosition(el: Element): CellPosWithNode {
  const classes: string[] = el.classList.value.split(" ");
  const colStartClass = classes.filter((el) => el.includes("col-start"));
  const rowStartClass = classes.filter((el) => el.includes("row-start"));
  const colSpanClass = classes.filter((el) => el.includes("col-span"));
  const rowSpanClass = classes.filter((el) => el.includes("row-span"));

  const colStart = colStartClass[0]?.split("-")[2] ?? "-1";
  const rowStart = rowStartClass[0]?.split("-")[2] ?? "-1";
  const colSpan = colSpanClass[0]?.split("-")[2] ?? "-1";
  const rowSpan = rowSpanClass[0]?.split("-")[2] ?? "-1";

  return {
    colStart: parseInt(colStart),
    rowStart: parseInt(rowStart),
    colSpan: parseInt(colSpan),
    rowSpan: parseInt(rowSpan),
    node: el,
  };
}

interface FilledCells extends WidgetConfig {
  filledCols: number[];
  filledRows: number[];
}

function getFilledCells(widgetData: WidgetConfig[]): FilledCells[] {
  const filledCells: FilledCells[] = widgetData.map((el) => {
    const filledCols = [];
    const filledRows = [];

    filledCols.push(el.colStart);
    filledRows.push(el.rowStart);

    for (let i = 1; i < el.colSpan; i++) {
      filledCols.push(el.colStart + i);
    }
    for (let i = 1; i < el.rowSpan; i++) {
      filledRows.push(el.rowStart + i);
    }

    return {
      ...el,
      filledCols,
      filledRows,
    };
  });

  return filledCells;
}

function calcPlaceholderPos(
  widgetData: WidgetConfig[],
  colCount: ColumnPerScreen["col"]
): PlaceholderPos[] {
  const placeholderPositions: PlaceholderPos[] = [];

  const filledCells = getFilledCells(widgetData);

  let row = 1;
  while (true) {
    let rowExists = false;
    for (let col = 1; col <= colCount; col++) {
      let hasWidgetAtThisPosition = false;
      // loop through filled cells and check if there is a widget
      filledCells.forEach((el) => {
        if (el.filledCols.includes(col) && el.filledRows.includes(row)) {
          hasWidgetAtThisPosition = true;
          rowExists = true;
        }
      });

      if (hasWidgetAtThisPosition) continue;
      placeholderPositions.push({ colStart: col, rowStart: row });
    }

    if (!rowExists) {
      const maxfilledRow = Math.max(...filledCells.map((el) => el.rowStart));
      // necessary due to empty rows in between (when dnd down)
      if (row >= maxfilledRow) break;
    }
    row++;
  }
  return placeholderPositions;
}

// todo: write docs for dnd
// todo: write tests for dnd
// fix: doesnt work because in md/sm mode -> actual row of calendar widget is 2, however in md is 4
// fix: -> needs a method for automatically setting col/row start/span in sm / md mode
// fixtodo: css highlighting/animation of placeholder when dragging

/*
% docs: 
* 2. get max col for current screen size - done with setColumnCount
* 3. get all places in the grid that are free
* 3a. -> loop through col and row (cells) and check if widgetData has widgetFor it
* 3b. -> if yes: add widget
* 3c. -> if not: add widgetplaceholder and put position in array
* 4. fill with placeholders
*/

// checks for conflicts in data; don't let this be a user problem
function validateWidgetData(widgetData: WidgetConfig[]): WidgetConfig[] {
  // console.log("---------------");
  for (let i = 0; i < widgetData.length - 1; i++) {
    for (let j = i + 1; j < widgetData.length; j++) {
      if (widgetData[i]?.name === widgetData[j]?.name) continue;

      if (
        widgetData[i].colStart + widgetData[i]?.colSpan >
          widgetData[j].colStart &&
        widgetData[i].colStart + widgetData[i]?.colSpan <=
          widgetData[j].colStart + widgetData[j].colSpan
      ) {
        if (
          widgetData[i].rowStart >= widgetData[j].rowStart &&
          widgetData[i].rowStart <
            widgetData[j].rowStart + widgetData[j].rowSpan
        ) {
          console.log(widgetData[i].name, widgetData[j].name);
          throw new Error(
            `Widgets "${widgetData[i]?.name}" and "${widgetData[j]?.name}" are intersecting.`
          );
        }
      }
    }
  }
  return widgetData;
}

export {
  getFreeCells,
  parseGridPosition,
  getFilledCells,
  calcPlaceholderPos,
  validateWidgetData,
};
