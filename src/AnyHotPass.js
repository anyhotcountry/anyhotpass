import React, { useState, useRef } from 'react';
import generatePass from 'anyhotpass-lib';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import copy from 'copy-to-clipboard';
import './AnyHotPass.css';

function AnyHotPass() {
  const location = useLocation();
  const [master, setMaster] = useState('');
  const [masterCheck, setMasterCheck] = useState('');
  const [domain, setDomain] = useState(location.search.substring(1));
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordChanged = (newMaster) => {
    const newMasterCheck = generatePass(newMaster, '', 12).substring(0, 6);
    setMasterCheck(newMasterCheck);
    setMaster(newMaster);
  };

  const generate = (e) => {
    e.preventDefault();
    if (master.length === 0 || domain.length === 0) {
      return;
    }
    const newPassword = generatePass(master, domain, 18);
    setPassword(newPassword);
  };

  const copyPassword = (e) => {
    e.preventDefault();
    if (passwordRef.current != null) {
      passwordRef.current.select();
      passwordRef.current.focus();
    }
    copy(password);
  };

  return (
    <form onSubmit={(e) => generate(e)}>
      <div className="form-group">
        <input autoFocus type="password" className="form-control" placeholder="Master Password" required onChange={(e) => passwordChanged(e.target.value)} value={master} />
        {master.length > 0 ? <div className="valid-feedback">
          {masterCheck}
        </div> : null}
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="example.com" required onChange={(e) => setDomain(e.target.value)} value={domain} />
      </div>
      <button className="btn btn-primary btn-lg btn-block " type="submit">Generate</button>
      <div className="input-group mt-3">
        <input type="text" ref={passwordRef} readOnly className="form-control" value={password} />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={(e) => copyPassword(e)}><FontAwesomeIcon icon={faCopy} size="lg"/></button>
        </div>
      </div>
    </form>
  )
}

export default AnyHotPass;
