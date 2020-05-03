import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
    this.handleFocus = (event) => event.target.select();
  }

  render() {
    return (
      <>
        <Modal show="true" backdrop="false">
          <Modal.Header>
            <Modal.Title>AHP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formPassword">
                <Form.Control type="password" placeholder="Master Password" required onChange={this.masterChanged} />
              </Form.Group>
              <Form.Group controlId="formDomain">
                <Form.Control type="url" placeholder="example.com" required onChange={this.domainChanged} />
              </Form.Group>
              <Button variant="secondary" type="submit" block onClick={this.handleGenerate} class="mr-1" >Generate</Button>
              <Form.Group controlId="formDomain" className="mt-2">
                <Form.Control type="text" readOnly onFocus={this.handleFocus} value={this.state.password} />
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
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
