function sma(a,n){ if(a.length<n)return null; return a.slice(-n).reduce((x,y)=>x+y,0)/n; }
function ema(a,n){
  if(a.length<n)return null;
  const k=2/(n+1); let e=a.slice(0,n).reduce((x,y)=>x+y,0)/n;
  for(let i=n;i<a.length;i++) e=a[i]*k+e*(1-k);
  return e;
}
function wma(a,n){
  if(a.length<n)return null;
  const x=a.slice(-n); let den=n*(n+1)/2;
  return x.reduce((s,v,i)=>s+v*(i+1),0)/den;
}
function hma(a,n=20){
  if(a.length<Math.floor(Math.sqrt(n))+n)return null;
  const half=Math.floor(n/2), root=Math.floor(Math.sqrt(n)), vals=[];
  for(let i=n;i<=a.length;i++){
    const s=a.slice(0,i), w1=wma(s,half), w2=wma(s,n);
    vals.push(2*w1-w2);
  }
  return wma(vals,root);
}
function rsi(a,n=14){
  if(a.length<n+1)return null;
  let g=0,l=0;
  for(let i=a.length-n;i<a.length;i++){let d=a[i]-a[i-1]; if(d>=0)g+=d;else l-=d;}
  if(l===0)return 100; const rs=(g/n)/(l/n); return 100-100/(1+rs);
}
function williamsR(c,n=14){
  if(c.length<n)return null;
  const x=c.slice(-n), hi=Math.max(...x.map(v=>v.high)), lo=Math.min(...x.map(v=>v.low)), cl=x.at(-1).close;
  if(hi===lo)return -50; return -100*(hi-cl)/(hi-lo);
}
function atr(c,n=14){
  if(c.length<n+1)return null;
  const tr=[];
  for(let i=1;i<c.length;i++) tr.push(Math.max(c[i].high-c[i].low,Math.abs(c[i].high-c[i-1].close),Math.abs(c[i].low-c[i-1].close)));
  return sma(tr,n);
}
function pivots(c,left=2,right=2){
  const highs=[], lows=[];
  for(let i=left;i<c.length-right;i++){
    let hi=true,lo=true;
    for(let j=1;j<=left;j++){if(c[i].high<=c[i-j].high)hi=false;if(c[i].low>=c[i-j].low)lo=false;}
    for(let j=1;j<=right;j++){if(c[i].high<=c[i+j].high)hi=false;if(c[i].low>=c[i+j].low)lo=false;}
    if(hi)highs.push({i,p:c[i].high}); if(lo)lows.push({i,p:c[i].low});
  }
  return {highs,lows};
}
function structure(c){
  const p=pivots(c); const hs=p.highs.slice(-3), ls=p.lows.slice(-3);
  let bullish=false,bearish=false;
  if(hs.length>=2&&ls.length>=2) {
    bullish=hs.at(-1).p>hs.at(-2).p && ls.at(-1).p>ls.at(-2).p;
    bearish=hs.at(-1).p<hs.at(-2).p && ls.at(-1).p<ls.at(-2).p;
  }
  return {bullish,bearish,highs:hs,lows:ls};
}
function sr(c){
  const p=pivots(c,3,3);
  return {resistance:p.highs.length?p.highs.at(-1).p:null,support:p.lows.length?p.lows.at(-1).p:null};
}
module.exports={sma,ema,hma,rsi,williamsR,atr,structure,sr};