import React, { useCallback } from "react";
import { useState } from "react";

const FormMinting = ({onMintingClick}) => {
    const [tokenUri,setTokenUri] = useState("");
    const [domainName,setDomainName] = useState("");
    
    const handleChangeTokenUri = useCallback((e) => {
        setTokenUri(e.target.value);
    },
    []);
    
    const handleChangeDomain = useCallback((e) => {
        setDomainName(e.target.value);
    },
    []);

    const submitForm = useCallback(() => {
        onMintingClick(tokenUri,domainName);
    },
    [tokenUri,domainName]);

    return(
        <div>
            <div className="field">
            <label>Token Uri:<input type="text" value={tokenUri} onChange={handleChangeTokenUri}></input></label>
            <label>Domain Name:<input type="text" value={domainName} onChange={handleChangeDomain}></input></label>
            <button type="submit" onClick={submitForm}>Submit</button>
            </div>
        </div>
    )
}      

export default FormMinting