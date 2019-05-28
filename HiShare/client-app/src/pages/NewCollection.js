import React from "react";
import "./NewCollection.css";
import CreateCollection from "../components/CreateCollection";


class NewCollection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collection: {}
        };

        this.handleNew = this.handleNew.bind(this);
    }

    handleNew(collection) {
        this.setState({collection: collection});
        console.log(collection);
    }

    render() {
        return (
            <div className="collection-new-main">
                <h1>新建Collection</h1>
                {
                    Object.keys(this.state.collection).length === 0 ?
                        <CreateCollection handleNew={this.handleNew}/>
                        :null
                }
            </div>
        )
    }
}

export default NewCollection;