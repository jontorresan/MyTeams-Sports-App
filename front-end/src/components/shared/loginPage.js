import React, {Component} from 'react'
import {Button, Form, FormGroup, Label, Input} from 'reactstrap'
import {Carousel} from 'react-bootstrap'

export default class LoginPage extends Component {
  logIn = (e) => {
    
    e.preventDefault()
    this.props.logUserIn(e, ()=> {
      return this.props.history.push('/league')
    })

  }
  render() {
    return(
      <div>
        <div>
          <h1 className='mainTitle'>MyTeams App</h1>
          <br/>
          <div>
          <Form onSubmit={this.logIn} inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="Email" className="mr-sm-2"></Label>
              <Input onChange={this.props.getUser} type="email" name='email' id="Email" placeholder="Email" />
            </FormGroup>
            <Button>Login</Button>
          </Form>
            
            <br/>
          
          </div>
        </div>
        <br/>
        <div>
        <Carousel>
          <Carousel.Item>
            <img width={2500} height={500} alt="" src="/images/mlb_carousel.jpg" />
          </Carousel.Item>
          <Carousel.Item>
            <img width={2500} height={500} alt="" src="/images/nba_carousel.jpg" />
          </Carousel.Item>
          <Carousel.Item>
            <img width={2500} height={500} alt="" src="/images/nhl_carousel.jpg" />
          </Carousel.Item>
        </Carousel>
        </div>
      </div>
    )
  }
}

