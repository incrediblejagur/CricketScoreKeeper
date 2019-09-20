module.exports = () => {


    let team1 = {
        currentOver: 0,
        totalRuns: 0,
        totalWickets:0,        
        noRuns: 0,
    }

    let team2= {
        currentOver: 0,
        totalRuns: 0,
        totalWickets:0,        
        noRuns: 0,
    }

let setOvers = 0;
// let noRuns = 0;
let message = '';

let addScore = (team,scoreStr) => {
    if(team === 'team1') team = team1;
    if(team === 'team2') team = team2;
    let check = true;
    let runForOver = 0;
    let wicketForOver = 0;
    let noRunsforOver = 0;
    message = "";
    if(setOvers !== 0){
    if(team.currentOver < setOvers && team.totalWickets < 10){
        let score = scoreStr.split('')
        if(score.length === 6){
        for(var z = 0; z < score.length;z++){
            if(score[z] === '1' || score[z] === '2' || score[z] === '3' || score[z] === '4' || score[z] === '6'){
                score[z] = Number(score[z])
                runForOver += score[z]
            }else if(score[z] === 'W' || score[z] === 'w'){
                wicketForOver += 1;
            }else if(score[z] === '-'){
                noRunsforOver += 1;
            }else{
                check = false;
            }
        }
        if(check) team.currentOver += 1
    }else{
        message ='6 balls in an over. Please fix score.'
    }
    if(check){
        team.totalRuns += runForOver
        team.totalWickets += wicketForOver
        team.noRuns += noRunsforOver
    }else{
        message = "A batsman can only get 1,2,3,4 or 6 runs in an over"
    }
}else{
    message="Your game is done."
}
    }else{
        message= "Please set overs"
    }
}

let whoWhon = () => {
    if(setOvers > 0){
    if(team1.currentOver === setOvers && team2.currentOver === setOvers){
    if(team1.totalRuns === team2.totalRuns){
        return 'It was a good game but both teams drew'
    }else if(team1.totalRuns > team2.totalRuns){
        return 'Team 1 won'
    }else{
        return 'Team 2 won'
    }
}
    }
    return false;
}

let setOver = (set) =>{
    message = "";
    setOvers = Number(set)
    return setOvers
}

let returnOver = () => {
    return {
        team1:`${team1.totalRuns}-${team1.totalWickets} over:${team1.currentOver}/${setOvers}`,
        team2: `${team2.totalRuns}-${team2.totalWickets} over:${team2.currentOver}/${setOvers}`
}
}

let errorMessage = () => {
    return message
}

let reset = () => {
    setOvers = 0
    let teams = [team1,team2]
    for(let z of teams){
        for(x in z){
            z[x] = 0;
        }
    }
}

return{
    addScore,
    setOver,
    returnOver,
    errorMessage,
    whoWhon,
    reset
}
}