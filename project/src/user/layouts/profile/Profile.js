import React, { Component } from 'react'
import ProfileFormContainer from '../../ui/profileform/ProfileFormContainer'
import { 
  Table,
  Tabs, 
  Tab,
  Grid,
  Col,
  Row
} from 'react-bootstrap';

class Profile extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
              <Grid>
                <Row>
                  <Col xs={12} md={6} mdOffset={3}>
                    <h1>Profile</h1>
                    <p>Edit your account details here.</p>
                    <ProfileFormContainer/>
                    <br/>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                      <Tab eventKey={1} title="Created Lottery Game">
                        <Table responsive hover striped>
                          <thead>
                            <tr>
                              <th>Index</th>
                              <th>Address</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>0xCc457F8E6d9B6f7e93A2D27FfAAB7Fa07E1FFF0D</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>0x7EDB366f0bFbBe5056DF3Be20496304FC507220E</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>0xD3410804C134aAaE911cb695be467840E022deBA</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Tab>
                      <Tab eventKey={2} title="Joined Lottery Game">
                        <Table responsive hover striped>
                          <thead>
                            <tr>
                              <th>Index</th>
                              <th>Address</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>0x43Dc456839297aF039fD5DFd4e8075bad23bDb1B</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>0xD3410804C134aAaE911cb695be467840E022deBA</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>0x5754Ef148792D92273309C809Db9689AC493975D</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>0x7EDB366f0bFbBe5056DF3Be20496304FC507220E</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Tab>
                  </Tabs>
                  </Col>
                </Row>
              </Grid>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
