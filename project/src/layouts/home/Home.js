import React, { Component } from 'react'
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import { JoinNowButtonContainer } from '../../user/ui/loginbutton/LoginButtonContainer'

class Home extends Component {
  render() {


    return(
      <main className="container">
        <Jumbotron>
          <h1>Ethereum Based Lottery Game!</h1>
          <p>
            This web app, built with Truffle and React, allows user to create and
            enroll in lottery games that take and pay with Ethereum. This app runs on 
            local Ganache server and requires Ethereum browser or Chrome/Firefox that have 
            MetaMask installed.
          </p>
          <p>
            <JoinNowButtonContainer/>
          </p>
        </Jumbotron>
        <div className="container">
          <Grid>
            <Row>
              <Col xs={12} md={6}>
                <p>Admin: Login first, then go to dashboard to create whatever you want!</p>
              </Col>
              <Col xs={12} md={6}>
                <p>User: Login first, then go to dashboard, enter the contract address that you want to join, then start betting!</p>
              </Col>
            </Row>
          </Grid>
        </div>
      </main>
    )
  }
}

export default Home
