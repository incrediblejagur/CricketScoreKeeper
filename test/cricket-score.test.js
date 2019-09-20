const assert = require('assert')
const CricketScore = require('../src/CricketScoreKeeper')


describe("Cricket Score Keeper Test", function () {
    describe("Testing for cricket score is returned", function () {
        it('Should return score after 2 overs for team1', function () {
            let cricket_score = CricketScore()
            cricket_score.setOver(10)
            cricket_score.addScore('team1','1-22-4')
            cricket_score.addScore('team1','1-6w-6')
        assert.deepEqual(cricket_score.returnOver(), { team1: '22-1 over:2/10', team2: '0-0 over:0/10' })
        });
        it('Should return score after 3 overs for team2', function () {
            let cricket_score = CricketScore()
            cricket_score.setOver(10)
            cricket_score.addScore('team2','1-22-4')
            cricket_score.addScore('team2','3-6-ww')
            cricket_score.addScore('team2','1-6w-6')

        assert.deepEqual(cricket_score.returnOver(), { team1: '0-0 over:0/10', team2: '31-3 over:3/10' })
        });
        it('Should return total score for team1 and team2', function () {
            let cricket_score = CricketScore()
            cricket_score.setOver(3)
            cricket_score.addScore('team1','1-11-4')
            cricket_score.addScore('team1','3-33ww')
            cricket_score.addScore('team1','1-6w-6')

            cricket_score.addScore('team2','1--w-4')
            cricket_score.addScore('team2','3-6-ww')
            cricket_score.addScore('team2','1-4w-6')

        assert.deepEqual(cricket_score.returnOver(), { team1: '29-3 over:3/3', team2: '25-4 over:3/3' })
        });
    });
    describe("Testing error messages", function () {
        it('Should return a (batsman can only score 1,2,3,4 or 6 runs in an over)', function () {
            let cricket_score = CricketScore()
            cricket_score.setOver(3)
            cricket_score.addScore('team1','1-11-4')
            cricket_score.addScore('team1','3-73ww')
            assert.equal(cricket_score.errorMessage(), "A batsman can only get 1,2,3,4 or 6 runs in an over")
        });
        it('Should return [game is done] as all overs are complete.', function () {
            let cricket_score = CricketScore()
            cricket_score.setOver(2)
            cricket_score.addScore('team1','1-11-4')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-33-2')
            assert.equal(cricket_score.errorMessage(), "Your game is done.")
        });
        it('Should return [please set overs] as overs hasnt been set by user', function () {
            let cricket_score = CricketScore()
            cricket_score.setOver(0)
            cricket_score.addScore('team1','1-11-4')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-33-2')
            assert.equal(cricket_score.errorMessage(), "Please set overs")
        });
        it('Should return [game is done] as all batsmen are out', function () {
            let cricket_score = CricketScore()
            cricket_score.setOver(30)
            cricket_score.addScore('team1','1-11-4')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-43w2')
            cricket_score.addScore('team1','3-33-w')
            assert.equal(cricket_score.errorMessage(), "Your game is done.")
        });
    });
});