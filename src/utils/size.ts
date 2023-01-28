const SCREEN_SIZE = Object.freeze({
  SM: 640, // 3
  MD: 768, // 6
  LG: 1024, // 6
  XL: 1280, // 10
});

function getScreenSize(): ColumnPerScreen {
  const w = window.innerWidth;
  if (w < SCREEN_SIZE.SM) {
    return { size: "xs", col: 3 };
  } else if (w < SCREEN_SIZE.MD) {
    return { size: "sm", col: 3 };
  } else if (w < SCREEN_SIZE.LG) {
    return { size: "md", col: 6 };
  } else if (w < SCREEN_SIZE.XL) {
    return { size: "lg", col: 6 };
  } else {
    return { size: "xl", col: 10 };
  }
}

export { SCREEN_SIZE, getScreenSize };
