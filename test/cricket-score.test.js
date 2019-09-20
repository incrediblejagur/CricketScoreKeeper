const assert = require('assert')
const CricketScore = require('../src/CricketScoreKeeper')


describe("Cricket Score Keeper Test", function () {
    describe("Should display total names enter in database.", function () {
        it('Should show total names in database', function () {
            let cricket_score = CricketScore()
            cricket_score.setOver(10)
            cricket_score.addScore('1-22-4')
            cricket_score.addScore('1-6w-6')
            console.log(cricket_score.errorMessage())
            console.log(cricket_score.returnOver())
        });
    });
});