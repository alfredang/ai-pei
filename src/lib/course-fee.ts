// Course fee model: every module costs a flat fee; the course fee is the sum
// over its modules. Shown everywhere as both GST-exclusive and GST-inclusive.
export const MODULE_FEE_SGD = 1800;
export const GST_RATE = 0.09; // Singapore GST

function fmt(n: number): string {
  return `$${n.toLocaleString("en-SG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function courseFee(moduleCount: number) {
  const excl = moduleCount * MODULE_FEE_SGD;
  const incl = excl * (1 + GST_RATE);
  return { excl, incl, exclText: fmt(excl), inclText: fmt(incl) };
}

/** Fee for a single module — `courseFee(1)` precomputed for module cards. */
export const MODULE_FEE = courseFee(1);
