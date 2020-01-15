export function drawRectWithRound ({ graphic, x, y, width, height, color, radius = 8, opacity = 1 }) {
  graphic.clear()
  graphic.beginFill(PIXI.utils.rgb2hex(color), 1)
  graphic.moveTo(x + radius, y)
  graphic.lineTo(x + width - radius, y)
  graphic.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0)
  graphic.lineTo(x + width, y + height - radius)
  graphic.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2)
  graphic.lineTo(x + radius, y + height)
  graphic.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI)
  graphic.lineTo(x, y + radius)
  graphic.arc(x + radius, y + radius, radius, Math.PI , Math.PI * 3 / 2)
  graphic.endFill()
  graphic.alpha = opacity
}