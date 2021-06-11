import React, { useState } from "react";
import { Form, Select, Input, InputNumber, Button, Row, Col } from "antd";
import styled from "styled-components";
import "./App.css";

const Containter = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  height: 10%;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: black;
`;
const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  background-color: pink;
`;

const Card = styled.div`
  align-items: center;
  padding: 10px 30px;
  width: 50%;
  min-width: 375px;

  .ant-row {
    margin: 10px;
    text-align: center;
    .ant-col {
      margin: auto;
    }
  }
`;

function App() {
  const [init, setInit] = useState(0);
  const [add, setAdd] = useState(0);
  const [months, setMonths] = useState(0);
  const [ratePerMonth, setRate] = useState(1);

  const [initInput, setInitInput] = useState('');
  const [addInput, setAddInput] = useState('');
  const [monthsInput, setMonthsInput] = useState('');
  const [rateInput, setRateInput] = useState('');

  const [totalInit, setTotalInit] = useState('0');
  const [totalMoney, setTotalMoney] = useState('0');
  const [totalProf, setTotalProf] = useState('0');
  const [profRate, setProfRate] = useState('0');

  const calc = () => {
    let money = init;
    for (let i = 0; i < months; i++) {
      money = money * ratePerMonth + add;
    }
    const _totalMoney = Math.floor(money);
    const _totalInit = add * months + init;
    const _totalProf = _totalMoney - _totalInit;
    const _profRate = Math.floor(_totalProf/_totalInit*100);

    setTotalInit(addComma(_totalInit.toString()));
    setTotalMoney(addComma(_totalMoney.toString()));
    setTotalProf(addComma(_totalProf.toString()));
    setProfRate(addComma(isNaN(_profRate) ? '0' : _profRate.toString()));
  };

  const addComma = (str: string) => {
    let res = str;
    for(let i = str.length - 3; i > 0; i -= 3) {
      res = res.slice(0, i) + ',' + res.slice(i);
    }
    return res;
  }

  const onClickClear = () => {
    setInit(0);
    setAdd(0);
    setMonths(0);
    setRate(1);

    setInitInput('');
    setAddInput('');
    setMonthsInput('');
    setRateInput('');

    setTotalInit('0');
    setTotalMoney('0');
    setTotalProf('0');
    setProfRate('0');
  }

  const onClickOk = () => {
    calc();
  }

  const onChangeInit = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value.replaceAll(',', '');
    const inputNumber = parseInt(input);
    if(!isNaN(inputNumber)) {
      setInit(inputNumber);
      setInitInput(addComma(input));
    }
    else {
      setInitInput('');
    }
  }

  const onChangeAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value.replaceAll(',', '');
    const inputNumber = parseInt(input);
    if(!isNaN(inputNumber)) {
      setAdd(inputNumber);
      setAddInput(addComma(input));
    }
    else {
      setAddInput('');
    }
  }

  const onChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseInt(event.target.value);
    if(!isNaN(input)) {
      setMonths(input * 12);
      setMonthsInput(event.target.value);
    }
    else {
      setMonthsInput('');
    }
  }

  const onChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseInt(event.target.value);
    if(!isNaN(input)) {
      setRate(Math.pow((input / 100 + 1), 1/12));
      setRateInput(event.target.value);
    }
    else {
      setRateInput('');
    }
  }

  return (
    <Containter>
      <Header>Money Calculator</Header>
      <Content>
        <Card>
          <Row>
            <Col span={12}>本金：</Col>
            <Col span={9}>
              <Input value={initInput} onChange={onChangeInit} />
            </Col>
            <Col span={3}></Col>
          </Row>
          <Row>
            <Col span={12}>定投金额：</Col>
            <Col span={9}>
              <Input value={addInput} onChange={onChangeAdd} />
            </Col>
            <Col span={3}>/月</Col>
          </Row>
          <Row>
            <Col span={12}>时间：</Col>
            <Col span={9}>
              <Input value={monthsInput} onChange={onChangeTime} />
            </Col>
            <Col span={3}>年</Col>
          </Row>
          <Row>
            <Col span={12}>年利率：</Col>
            <Col span={9}>
              <Input value={rateInput} onChange={onChangeRate} />
            </Col>
            <Col span={3}>%</Col>
          </Row>
          <Row>
            <Col span={4}>
              <Button onClick={onClickClear}>重置</Button>
            </Col>
            <Col span={4}>
              <Button onClick={onClickOk}>确认</Button>
            </Col>
          </Row>
          <Row>
            <Col span={6}>总本金：</Col><Col span={6}>{totalInit}</Col>
            <Col span={6}>总金额：</Col><Col span={6}>{totalMoney}</Col>
            <Col span={6}>总利润：</Col><Col span={6}>{totalProf}</Col>
            <Col span={6}>利润率：</Col><Col span={6}>{profRate}%</Col>
          </Row>
        </Card>
      </Content>
    </Containter>
  );
}

export default App;
