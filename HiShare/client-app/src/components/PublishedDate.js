import React, {useState, useEffect} from "react";
import Api from "../utilities/Api";
import "./PublishedDate.css";

function PublishedDate(props) {

    const [publishedDate, ] = useState(props.date);
    const [result, setResult] = useState("");

    useEffect(() => {
        setResult(Api.durationFromNowString(new Date(publishedDate)));
    }, [publishedDate]);

    return (
        <div className={`${props.className ? props.className : ""} publish-time`}>
            发布于{result}
        </div>
    )
}

export default PublishedDate;