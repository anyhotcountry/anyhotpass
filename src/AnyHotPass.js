import React, { useState, useRef } from 'react';
import generatePass from 'anyhotpass-lib';
import { useLocation } from "react-router-dom";

function AnyHotPass() {
  const location = useLocation();
  const [master, setMaster] = useState('');
  const [domain, setDomain] = useState(location.search.substring(1));
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

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
    <form>
      <div className="form-group">
        <input autoFocus type="password" className="form-control" placeholder="Master Password" required onChange={(e) => setMaster(e.target.value)} value={master} />
      </div>
      <div className="form-group">
        <input type="url" className="form-control" placeholder="example.com" required onChange={(e) => setDomain(e.target.value)} value={domain} />
      </div>
      <button className="btn btn-primary btn-lg btn-block " type="submit" onClick={(e) => generate(e)}>Generate</button>
      <div className="form-group mt-3">
        <input type="text" ref={passwordRef} readOnly className="form-control" onFocus={(e) => e.target.select()} value={password} />
      </div>
    </form>
  )
}

export default AnyHotPass;
