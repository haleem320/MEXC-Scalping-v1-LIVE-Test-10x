const state={dayKey:null,dayStartEquity:null,realizedPnL:0,lastStopAt:0,openPositions:0};
function resetIfNewDay(equity){const k=new Date().toISOString().slice(0,10);if(state.dayKey!==k){state.dayKey=k;state.dayStartEquity=equity;state.realizedPnL=0;state.lastStopAt=0;}}
function canTrade({equity,dailyLossPct,cooldownMinutes,maxOpenPositions}){resetIfNewDay(equity);const lossPct=state.dayStartEquity?Math.max(0,-state.realizedPnL/state.dayStartEquity*100):0;const cooldown=(Date.now()-state.lastStopAt)/60000<cooldownMinutes;return {ok:lossPct<dailyLossPct&&!cooldown&&state.openPositions<maxOpenPositions,lossPct,cooldown};}
module.exports={state,canTrade};
