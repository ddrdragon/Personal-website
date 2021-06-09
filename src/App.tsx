import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [init, setInit] = useState(0);

  const [add, setAdd] = useState(0);

  const [months, setMonths] = useState(120);

  const [ratePerMonth, setRate] = useState(0.01);

  const [total, setTotal] = useState(0);

  const calc = () => {
    let m = init;
    for(let i = 0; i < months; i++) {
      m = (m * ratePerMonth) + add;
    }
    setTotal(m);
    console.log(ratePerMonth);
  }

  return (
    <div>
      <span>本金：</span> <input onChange={(e) => {setInit(parseInt(e.target.value))}}/><br/>
      <span>定投： </span> <input onChange={(e) => {setAdd(parseInt(e.target.value))}}/><br/>
      <span>时间： </span> <input onChange={(e) => {setMonths(parseInt(e.target.value)*12)}}/>年<br/>
      <span>年利率：</span> <input onChange={(e) => {setRate(parseInt(e.target.value)/1200 + 1)}}/>%<br/>
      <span>总本金：{add * months + init}</span><br/>
      <span>总收益：{Math.floor(total)}</span><br/>
      <span>利润： {Math.floor(total) - (add * months + init)}</span><br/>
      <button onClick={calc}>确认</button>
    </div>
  );
}

export default App;
