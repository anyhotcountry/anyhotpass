import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Modal from 'react-bootstrap/Modal';
import generate from 'anyhotpass-lib';

class AnyHotPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { master: '', domain: '', password: '', hidden: true };
    this.masterChanged = this.masterChanged.bind(this);
    this.domainChanged = this.domainChanged.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  render() {
    return (
      <>

        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>AHP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.masterChanged} />
              </Form.Group>
              <Form.Group controlId="formDomain">
                <Form.Label>Domain</Form.Label>
                <Form.Control type="text" placeholder="example.com" onChange={this.domainChanged} />
              </Form.Group>
              <Button variant="primary" type="submit" block onClick={this.handleGenerate} class="mr-1" >Generate</Button>
            </Form>
            <InputGroup className="mt-2">
              <FormControl type={this.state.hidden ? "password" : "text"} placeholder="Password" readOnly onChange={this.masterChanged} value={this.state.password} />
              <InputGroup.Append>
                <ToggleButton type="checkbox" checked={!this.state.hidden} onClick={this.handleToggle}> Show</ToggleButton>
              </InputGroup.Append>
            </InputGroup>
          </Modal.Body>
        </Modal.Dialog>
      </>
    )
  }

  masterChanged(e) {
    this.setState({ master: e.target.value });
  }

  domainChanged(e) {
    this.setState({ domain: e.target.value });
  }

  handleGenerate(e) {
    e.preventDefault();
    if (this.state.master.length === 0 || this.state.domain.length === 0) {
      return;
    }
    const password = generate(this.state.master, this.state.domain, 18);
    this.setState(state => ({
      password: password
    }));
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState(state => ({
      hidden: !this.state.hidden
    }));
  }
}

export default AnyHotPass;
