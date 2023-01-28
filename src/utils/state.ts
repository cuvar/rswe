import { atom } from "jotai";
export const gridAtom = atom<HTMLElement | null>(null);
export const columnAtom = atom<ColumnPerScreen["col"]>(10);
export const placeholderPosAtom = atom<PlaceholderPos[]>([]);
export const widgetDataAtom = atom<WidgetConfig[]>([]);
