import React, { Component } from 'react'
import { 
  Button, 
  FormGroup, 
  ControlLabel, 
  FormControl, 
  HelpBlock
} from 'react-bootstrap';
import InfoPopup from '../infopopup/InfoPopup'

class CreateLottery extends Component {
  constructor(props) {
    super(props)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      minBetAmount: 0,
      donateLevel: 5,
      maxEnrolledNum: 3,
      showModel: false,
      modelTitle: "Submittion Failed",
      modelText: "Error message"
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.success) {
      this.setState({ modelTitle: "Submittion Success" });
      this.setState({ modelText: "You have created your contract" });
      this.handleShow()
    }
  }

  handleClose() {
    this.setState({ showModel: false });
  }

  handleShow() {
    this.setState({ showModel: true });
  }

  onMinBetChange(event) {
    this.setState({ minBetAmount: parseInt(event.target.value, 0)})
  }

  onDurChange(event) {
    this.setState({ donateLevel: parseInt(event.target.value, 0)})
  }

  onMaxNumChange(event) {
    this.setState({ maxEnrolledNum: parseInt(event.target.value, 0)})
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.minBetAmount === 0)
    {
      return alert('Please fill in minimum bet amount.')
    } else if (this.state.donateLevel === 0) {
      return alert('Please fill in donate Level.')
    } else if (this.state.maxEnrolledNum === 0) {
      return alert('Please fill in maximum enrolled user number.')
    }

    const submitValue = {
      "minBetAmount": this.state.minBetAmount,
      "donateLevel": this.state.donateLevel,
      "maxEnrolledNum": this.state.maxEnrolledNum
    }

    this.props.onCreateLotterySubmit(submitValue)
  }

  validateMinBet() {
    const status = this.state.minBetAmount > 0;
    if (status) return 'success';
    else return 'error';
  }

  validateDonate() {
    const status = this.state.donateLevel > 0;
    if (status) return 'success';
    else return 'error';
  }

  validateMaxNum() {
    const status = this.state.maxEnrolledNum > 0;
    if (status) return 'success';
    else return 'error';
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.validateMinBet()}
        >
          <ControlLabel>Minimum Bet Amount</ControlLabel>
          <FormControl
            type="text"
            value={this.state.minBetAmount}
            placeholder="Minimum Bet Amount"
            onChange={this.onMinBetChange.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="formBasicText"
          validationState={this.validateDonate()}
        >
          <ControlLabel>Gain percent(1 to 100)</ControlLabel>
          <FormControl
            type="text"
            value={this.state.donateLevel}
            placeholder="Gain percent"
            onChange={this.onDurChange.bind(this)}
          />
        <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="formBasicText"
          validationState={this.validateMaxNum()}
        >
          <ControlLabel>Maximum Enrolled User Number</ControlLabel>
          <FormControl
            type="text"
            value={this.state.maxEnrolledNum}
            placeholder="Maximum Number"
            onChange={this.onMaxNumChange.bind(this)}
          />
          <FormControl.Feedback />
          <HelpBlock>Must imput number in all the fields</HelpBlock>
        </FormGroup>

        <Button bsStyle="success" type="submit">Submit</Button>
        <InfoPopup 
          show={this.state.showModel} 
          handleClose={this.handleClose}
          title={this.state.modelTitle}
          text={this.state.modelText}
        />
      </form>
    )
  }
}

export default CreateLottery
