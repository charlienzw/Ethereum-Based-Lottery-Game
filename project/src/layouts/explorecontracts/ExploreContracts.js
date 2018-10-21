import React, { Component } from 'react'
import { 
  Button,  
  ControlLabel,
  FormControl, 
  FormGroup, 
  Grid,
  Col,
  Row,
  Table,
} from 'react-bootstrap';
import InfoPopup from '../infopopup/InfoPopup'

class ExploreContracts extends Component {
  constructor(props) {
    super(props)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      address: this.props.address || "0x43Dc456839297aF039fD5DFd4e8075bad23bDb1B",
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

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.address === "")
    {
      return alert('Please fill in contract address.')
    }

    const submitValue = {
      "address": this.state.address
    }

    this.props.onExploreContractsSubmit(submitValue)
    //this.handleShow()
  }

  validateAddr() {
    const status = this.state.address.length === 42 && this.state.address.startsWith("0x");
    if (status) return 'success';
    else return 'error';
  }

  render() {
    return(
      <main className="container">
        <Grid>
          <Row>
            <Col xs={12} md={8} mdOffset={2}>
              <h1>Lottery Explorer</h1>
              <p>Enter your contract address to see the status of lottery!</p>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.validateAddr()}
                >
                  <ControlLabel>Contract Address</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.address}
                    placeholder="Minimum Bet Amount"
                    onChange={this.onAddressChange.bind(this)}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <Grid>
                  <Row>
                    <Col xs={12} md={3} mdOffset={1}>
                      <Button bsSize="large" bsStyle="success" type="submit">Submit</Button>
                    </Col>
                    <Col xs={12} md={3} mdOffset={1}>
                      <Button bsSize="large" bsStyle="warning" type="submit">Complete Contract</Button>
                    </Col>
                  </Row>
                </Grid>
                <InfoPopup 
                  show={this.state.showModel} 
                  handleClose={this.handleClose}
                  title={this.state.modelTitle}
                  text={this.state.modelText}
                />
              </form>
              <Table responsive hover striped>
                <tbody>
                  <tr>
                    <td>Current User Number</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Current Balance</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Current Status</td>
                    <td>In Progress</td>
                  </tr>
                  <tr>
                    <td>Winner</td>
                    <td>None</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </main>
    )
  }
}

export default ExploreContracts
