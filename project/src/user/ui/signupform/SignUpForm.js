import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  getValidationState() {
    const length = this.state.name.length;
    if (length > 5) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onSignUpFormSubmit(this.state.name)
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name}
            placeholder="Name"
            onChange={this.onInputChange.bind(this)}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
        <Button bsStyle="success" type="submit">Sign Up</Button>
      </form>
    )
  }
}

export default SignUpForm
