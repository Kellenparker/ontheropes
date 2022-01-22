// Credit: Christoph Pahmeyer
// https://observablehq.com/@chrispahm/skew-normal-distributions
// Translated to TypeScript

function randomTruncSkewNormal(
    rng: number = Math.random(),
    range: number[] = [-Infinity, Infinity],
    mean: number,
    stdDev: number,
    skew = 0
): number {
    // Before we start, we need to make sure the mean value is actually
    // within our desired range
    if (mean < range[0] || mean > range[1]) {
      throw Error(`Mean of ${mean} not in desired range of ${range}!`);
    }
  
    // Box-Muller transform
    function randomNormals(rng: number) {
      let u1 = 0,
        u2 = 0;
      //Convert [0,1) to (0,1)
      while (u1 === 0) u1 = Math.random();
      while (u2 === 0) u2 = Math.random();
      const R = Math.sqrt(-2.0 * Math.log(u1));
      const Θ = 2.0 * Math.PI * u2;
      return [R * Math.cos(Θ), R * Math.sin(Θ)];
    }
  
    // Skew-normal transform
    // If a variate is either below or above the desired range,
    // we recursively call the randomSkewNormal function until
    // a value within the desired range is drawn
    function randomSkewNormal(rng: number, mean: number, stdDev: number, skew = 0): number {
      const [u0, v] = randomNormals(rng);
      if (skew === 0) {
        const value = mean + stdDev * u0;
        if (value < range[0] || value > range[1])
          return randomSkewNormal(rng, mean, stdDev, skew);
        return value;
      }
      const sig = skew / Math.sqrt(1 + skew * skew);
      const u1 = sig * u0 + Math.sqrt(1 - sig * sig) * v;
      const z = u0 >= 0 ? u1 : -u1;
      const value = mean + stdDev * z;
      if (value < range[0] || value > range[1])
        return randomSkewNormal(rng, mean, stdDev, skew);
      return value;
    }
  
    return randomSkewNormal(rng, mean, stdDev, skew);
}

export {randomTruncSkewNormal}