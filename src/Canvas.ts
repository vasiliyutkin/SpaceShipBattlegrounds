export const canvas: HTMLCanvasElement = document.createElement("canvas");
export const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;