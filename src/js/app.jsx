import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
      this.state = {
        loanBalance: "",
        interestRate: "",
        loanYears: "",
        months: 0,
        monthlyPayment: 0,
      }
      this.handleLoanBalance = this.handleLoanBalance.bind(this);
      this.handleInterestRate = this.handleInterestRate.bind(this);
      this.handleLoanYears = this.handleLoanYears.bind(this);
      this.mortgageCalculator = this.mortgageCalculator.bind(this);
  }

  mortgageCalculator(balance, rate, term, period) {
    var workBalance = balance;
    var workRate = rate;
    var workTerm = term;
    var workMonthlyInterest = (rate * .01) / 12;
    var workLoanMonths = term * 12;
    var top = workMonthlyInterest * Math.pow((1 + workMonthlyInterest), workLoanMonths);
    var bottom = Math.pow((1 + workMonthlyInterest), workLoanMonths) - 1;
    var monthlyPayments = Math.round(workBalance * (top / bottom));
    this.setState({
      monthlyPayment: monthlyPayments
    });
    console.log(this.state.monthlyPayment);
  }

  handleLoanBalance(event) {
    console.log(event.target.value)
    this.setState({ loanBalance: event.target.value })
  }

  handleInterestRate(event) {
    console.log(event.target.value)
    this.setState({ interestRate: event.target.value })
  }

  handleLoanYears(event) {
    console.log(event.target.value)
    this.setState({ loanYears: event.target.value })
  }

  renderInputPannels() {
    const inputPannels = [
      {name: "Loan Balance", inputValue: this.state.loanBalance, inputMethod: this.handleLoanBalance},
      {name: "Interest Rate", inputValue: this.state.interestRate, inputMethod: this.handleInterestRate},
      {name: "Loan Term (years)", inputValue: this.state.loanYears, inputMethod: this.handleLoanYears}
    ];

    return inputPannels.map(item => {
      return (
        <form className="form-horizontal">
          <label className="col-sm-3">{item.name}</label>
          <div className="col-sm-9">
            <input  value={item.inputValue} onChange={event => item.inputMethod(event)}/>
          </div>
        </form>
      );
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='page-header'><h1>Mortgage Calculator</h1></div>
          {this.renderInputPannels()}
        <button type="button" onClick={() => this.mortgageCalculator(this.state.loanBalance, this.state.interestRate, this.state.loanYears, this.state.period)} className="btn btn-primary btn-lg">Calculate</button>
      </div>
    );
  }
}
