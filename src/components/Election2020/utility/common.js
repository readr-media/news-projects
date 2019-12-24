export function formatRatio (ratio, digits = 2) {
  return Number((ratio * 100).toFixed(digits))
}