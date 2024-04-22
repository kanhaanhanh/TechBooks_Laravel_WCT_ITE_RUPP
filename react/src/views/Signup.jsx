import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import { Card, Form, Button, Alert, Row, Col, Container } from 'react-bootstrap';
import "../styles/Login.css";
import Logo from '../assets/new-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';


export default function Signup() {
  const fnameRef = createRef()
  const lnameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      firstname: fnameRef.current.value,
      lastname: lnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <Container>
            <main>
                <Row className="d-flex">
                    <Col md={6} className="ml-auto">
                        <Card className="position-absolute top-50 start-50 translate-middle flex-row">
                            <div className="img-right-sign_up d-none d-md-flex"></div>
                            <Card.Body className="card-body-sign-up animated fadeInDown">
                                <div className="logo-img">
                                    <img src={Logo} alt="Logo" />
                                </div>
                              
                                <Form className="form-box px-3" onSubmit={onSubmit}>
                                  <h3 className="mt-1 text-center" style={{ color: 'blue' }}>
                                      Welcome to Tech-Book!
                                  </h3>
                                  <h4 className="text-center mt-4" style={{ marginBottom: '30px' }}>
                                      Create an account
                                  </h4>
                                  {errors &&
                                    <div className="alert">
                                      {Object.keys(errors).map(key => (
                                        <p key={key}>{errors[key][0]}</p>
                                      ))}
                                    </div>
                                  }
                                  <Row className="d-flex justify-content-between">
                                        <Col md={6}>
                                            <div className="form-input">
                                              <span><i className="fa fa-user"></i></span>
                                              <input ref={fnameRef} type="text" placeholder="First Name"/>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-input">
                                              <span><i className="fa fa-user"></i></span>
                                              <input ref={lnameRef} type="text" placeholder="Last Name"/>
                                            </div> 
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <div className="form-input">
                                            <span><i className="fa fa-envelope"></i></span>
                                            <input ref={emailRef} type="email" placeholder="Email Address"/>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <div className="form-input">
                                            <span><i className="fa fa-key"></i></span>
                                            <input ref={passwordRef} type="password" placeholder="Password"/>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formComfirmPassword">
                                        <div className="form-input">
                                            <span><i className="fa fa-key"></i></span>
                                            <input ref={passwordConfirmationRef} type="password" placeholder="Comfirm Password"/>
                                        </div>
                                    </Form.Group>
                                    <div className="text-center mb-3">or sign up with</div>
                                    <Row className="mb-3">
                                        <Col xs={6}>
                                            <Link to="#" className="btn btn-block btn-social btn-facebook rounded-pill">
                                              <FontAwesomeIcon icon={faFacebook} />
                                            </Link>
                                        </Col>
                                        <Col xs={6}>
                                            <Link to="#" className="btn btn-block btn-social btn-google rounded-pill">
                                              <FontAwesomeIcon icon={faGoogle} />
                                            </Link>
                                        </Col>
                                    </Row>
                                  
                                  
                                    <div className="d-grid gap-2">
                                      <button type="submit" variant="primary" className="btn btn-block rounded-pill w-100" style={{ backgroundColor: 'blue', color: 'white' }}><b>Signup</b></button>
                                    </div>
                                    <div className="text-center mt-3">
                                      <p className="message">Already registered? <Link to="/login"><b>Sign In</b></Link></p>
                                    </div>
                                  
                              </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </main>
        </Container>
  )
}
