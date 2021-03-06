import React, {useState, useEffect} from "react";
import Api from "../utilities/Api";
import "./PublishedDate.css";

function PublishedDate(props) {

    const [result, setResult] = useState("");

    useEffect(() => {
        setResult(Api.durationFromNowString(new Date(props.date)));
    }, [props.date]);

    return (
        <div className={`publish-time ${props.className}`}>
            发布于{result}
        </div>
    )
}

export default PublishedDate;