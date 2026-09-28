/* CiderMath engine - pure functions, no DOM. Honest home cidermaking math.
   Constants stated in the UI: ideal juice yield 0.085 gal per lb of apples,
   wild-apple juice around 1.050 gravity, sugar adds 46 gravity points per lb
   per gallon, potential ABV = gravity points x 0.13125, US gal = 3785.41 ml. */
var CiderMath = (function () {
  function juiceGal(applesLb, pressEfficiency) {
    return applesLb * 0.085 * pressEfficiency;
  }
  function yieldVerdict(eff) {
    if (eff >= 0.75) return 'That is a real press - 75%+ of ideal means a good ratchet and dry pomace.';
    if (eff >= 0.6) return 'Typical home setup - a crusher and a basket press get you about two-thirds of ideal.';
    return 'Blender-and-pillowcase territory - it works, it is slow, and half the juice stays in the pulp.';
  }
  function potentialAbv(og) {
    return (og - 1) * 1000 * 0.13125;
  }
  function sugarOzForAbv(gal, og, targetAbv) {
    var havePoints = (og - 1) * 1000;
    var needPoints = targetAbv / 0.13125;
    var addPoints = needPoints - havePoints;
    return Math.max(0, addPoints / 46 * 16 * gal);
  }
  function abvVerdict(abv) {
    if (abv < 4.5) return 'Session cider - easy drinking, but thin; the apples or the sugar jar decide.';
    if (abv <= 7) return 'Classic farmhouse strength - 5 to 7% is where cider tastes most like itself.';
    if (abv <= 9.5) return 'Strong cider - English pub territory; pace and bread recommended.';
    return 'That is apple wine - fine, but call it what it is and pour smaller glasses.';
  }
  function fgVerdict(fg) {
    if (fg <= 1.0) return 'Bone dry - every sugar eaten; sharp, clean, and unforgiving of mediocre apples.';
    if (fg <= 1.006) return 'Off-dry - the crowd-pleaser; enough fruit left to taste like an apple.';
    if (fg <= 1.015) return 'Medium sweet - dessert-adjacent; watch the bottles if it is still moving.';
    return 'Very sweet - backsweetened or stalled; stabilize before bottling or make bottle bombs.';
  }
  function bottleCount(gal, bottleMl) {
    return gal * 3785.41 / bottleMl;
  }
  function costPerBottle(appleCost, sugarOz, sugarCostLb, otherCost, bottles) {
    return (appleCost + sugarOz / 16 * sugarCostLb + otherCost) / bottles;
  }
  function costVerdict(perBottle) {
    if (perBottle <= 1.5) return 'Under $1.50 a bottle - free-ish apples make the best economics in fermentation.';
    if (perBottle <= 3.5) return 'Still a third of the craft-bottle shelf price - pressing your own wins.';
    return 'Buying juice at retail - fine for a first batch, but find an orchard glut next fall.';
  }
  return {
    juiceGal: juiceGal, yieldVerdict: yieldVerdict, potentialAbv: potentialAbv, sugarOzForAbv: sugarOzForAbv,
    abvVerdict: abvVerdict, fgVerdict: fgVerdict, bottleCount: bottleCount, costPerBottle: costPerBottle, costVerdict: costVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = CiderMath;
