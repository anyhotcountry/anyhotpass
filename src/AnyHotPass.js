import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import generatePass from 'anyhotpass-lib';

function AnyHotPass() {
  const [master, setMaster] = useState('');
  const [domain, setDomain] = useState('');
  const [password, setPassword] = useState('');
  const masterRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    masterRef.current.focus();      
  }, []);

  const generate = (e) => {
    e.preventDefault();
    if (master.length === 0 || domain.length === 0) {
      return;
    }
    const newPassword = generatePass(master, domain, 18);
    setPassword(newPassword);
    passwordRef.current.focus();
  };

  return (
    <>
      <Modal show="true" backdrop="false">
        <Modal.Header>
          <Modal.Title>AHP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPassword">
              <Form.Control type="password" ref={masterRef} placeholder="Master Password" required onChange={(e) => setMaster(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDomain">
              <Form.Control type="url" placeholder="example.com" required onChange={(e) => setDomain(e.target.value)} />
            </Form.Group>
            <Button variant="secondary" type="submit" block onClick={(e) => generate(e)} class="mr-1" >Generate</Button>
            <Form.Group controlId="formDomain" className="mt-2">
              <Form.Control type="text" ref={passwordRef} readOnly onFocus={(e) => e.target.select()} value={password} />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AnyHotPass;
