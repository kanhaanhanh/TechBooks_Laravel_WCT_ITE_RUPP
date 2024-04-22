import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState } from "react";
import { Card, Form, Button, Alert, Row, Col, Container } from 'react-bootstrap';
import Logo from '../assets/new-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

  return (
    <Container>
      <main>
        <div className="card flex-row mx-auto position-absolute top-50 start-50 translate-middle">
          <div className="img-right-sign_up d-none d-md-flex"></div>
          <Card.Body className="card-body-log-in animated fadeInDown">
            <div className="logo-img">
              <img src={Logo} alt="Logo" />
            </div>
            <h3 className=" mt-1 text-center" style={{ color: "blue" }}>
              Welcome to Tech-Book!
            </h3>
            <h5 className="text-center mt-4" style={{ marginBottom: "30px" }}>
              Login into your account!
            </h5>
        <Form className="form-box px-3" onSubmit={onSubmit}>

          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }
          <Form.Group className="mb-3" controlId="formBasicEmail">
                <div className="form-input">
                  <span>
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input ref={emailRef} type="email" placeholder="Email"/>
                </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
                <div className="form-input">
                  <span>
                    <i className="fa fa-key"></i>
                  </span>
                  <input ref={passwordRef} type="password" placeholder="Password"/>
                </div>
          </Form.Group>

          <div className="text-center mb-3">or login with</div>
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
            <button type="submit" variant="primary" className="btn btn-block rounded-pill w-100" style={{ backgroundColor: 'blue', color: 'white' }}><b>Login</b></button>
          </div>
          <div className="text-center mt-3">
            <p className="message">Don&rsquo;t have an account? <Link to="/signup"><b>Sign up</b></Link></p>
          </div>
          
        </Form>
    </Card.Body>
        </div>
      </main>
    </Container>
  )
}
