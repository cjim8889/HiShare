import React, {useState, useEffect} from "react";
import Api from "../utilities/Api";
import "./PublishedDate.css";

function PublishedDate(props) {

    const [publishedDate, setPublishedDate] = useState(props.date);
    const [result, setResult] = useState({});
    useEffect(() => {

        let dayDiff = Api.dateDiffInDays(new Date(publishedDate), new Date());

        setResult({...result, day: dayDiff});


    }, []);

    return (
        <div className={`${props.className ? props.className : ""} publish-time`}>
            发布于 {result.day}日前
        </div>
    )
}

export default PublishedDate;