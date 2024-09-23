import { TextOptionsLight } from "jspdf";
import { UserOptions } from "jspdf-autotable";

export interface TableOptions extends UserOptions {
    ignoreFields?: string[];
}

export interface TextOptions extends TextOptionsLight {
    x?: number;
    y?: number;
    fontSize?: number;
    isBlack?: boolean;
    isBold?: boolean;
    color?: "primary" | "secondary" ;
}