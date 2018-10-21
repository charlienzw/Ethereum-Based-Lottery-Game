import React, { Component } from 'react'
import { 
  Button, 
  FormGroup, 
  ControlLabel, 
  FormControl, 
  HelpBlock
} from 'react-bootstrap';
import InfoPopup from '../infopopup/InfoPopup'

class JoinLottery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: "0x43Dc456839297aF039fD5DFd4e8075bad23bDb1B",
      deposit: 5,
      number: 0,
      showModel: false,
      modelTitle: "Submittion Failed",
      modelText: "Error message"
    }
  }

  handleClose() {
    this.setState({ showModel: false });
  }

  handleShow() {
    this.setState({ showModel: true });
  }

  onAddressChange(event) {
    this.setState({ address: event.target.value })
  }

  onDepChange(event) {
    this.setState({ deposit: parseInt(event.target.value, 0)})
  }

  onNumChange(event) {
    this.setState({ number: parseInt(event.target.value, 0)})
  }

  handleSubmit(event) {
    event.preventDefault()

    if (!this.state.address)
    {
      return alert('Please fill in contract address.')
    } else if (this.state.deposit === 0) {
      return alert('Please fill in deposit amount.')
    }
    const val = {
      "x": this.state.number,
      "address": this.state.address,
      "deposit": this.state.deposit
    }
    this.props.onJoinLotterySubmit(val)
  }

  validateAddr() {
    const status = this.state.address.length === 42 && this.state.address.startsWith("0x");
    if (status) return 'success';
    else return 'error';
  }

  validateDeposit() {
    const status = this.state.deposit > 0;
    if (status) return 'success';
    else return 'error';
  }

  validateNumber() {
    const status = this.state.number > 0;
    if (status) return 'success';
    else return 'error';
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.validateAddr()}
        >
          <ControlLabel>Contract Address</ControlLabel>
          <FormControl
            type="text"
            value={this.state.address}
            placeholder="Address"
            onChange={this.onAddressChange.bind(this)}
          />
          <FormControl.Feedback />
          <HelpBlock>Please Paste address instead of type them</HelpBlock>
        </FormGroup>
        <FormGroup
          controlId="formBasicText"
          validationState={this.validateNumber()}
        >
          <ControlLabel>Number Guess</ControlLabel>
          <FormControl
            type="text"
            value={this.state.number}
            placeholder="Number"
            onChange={this.onNumChange.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="formBasicText"
          validationState={this.validateDeposit()}
        >
          <ControlLabel>Deposit Amount</ControlLabel>
          <FormControl
            type="text"
            value={this.state.deposit}
            placeholder="Deposit"
            onChange={this.onDepChange.bind(this)}
          />
          <FormControl.Feedback />
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

export default JoinLottery
