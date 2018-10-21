import React, { Component } from 'react'
import { 
  Tabs, 
  Tab,
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import CreateLotteryContainer from '../createlottery/CreateLotteryContainer'
import JoinLotteryContainer from '../joinlottery/JoinLotteryContainer'


class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)

    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <h1>Dashboard</h1>
          <p><strong>Congratulations {this.props.authData.name}!</strong> Now you have an account on the network, lets create or join some lottery and get started!</p>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Create New Lottery">
              <Grid>
                <Row>
                  <Col xs={12} md={6} mdOffset={3}>
                    <h3>Please enter information of your lottery</h3>
                    <CreateLotteryContainer/>
                  </Col>
                </Row>
              </Grid>
            </Tab>
            <Tab eventKey={2} title="Join Existing Lottery">
              <Grid>
                <Row>
                  <Col xs={12} md={6} mdOffset={3}>
                    <h3>Please enter the address of lottery you want to join</h3>
                    <JoinLotteryContainer/>
                  </Col>
                </Row>
              </Grid>
            </Tab>
          </Tabs>
        </div>
      </main>
    )
  }
}

export default Dashboard
