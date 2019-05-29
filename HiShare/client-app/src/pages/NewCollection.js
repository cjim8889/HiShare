import React from "react";
import "./NewCollection.css";
import CreateCollection, { CollectionInfo } from "../components/CreateCollection";
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { Redirect } from "react-router-dom";


class NewCollection extends React.Component {

    constructor(props) {
        super(props);


        let collection = JSON.parse(localStorage.getItem("collection"));

        this.state = {
            collection: collection ? collection : {},
            redirectToEdit: false
        };


        this.handleNew = this.handleNew.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleToEdit = this.handleToEdit.bind(this);
    }

    handleNew(collection) {
        this.setState({collection: collection});
        localStorage.setItem("collection", JSON.stringify(collection));
    }

    handleRefresh() {
        localStorage.removeItem("collection");
        this.setState({collection: {}});
    }

    handleToEdit() {
        this.setState({redirectToEdit: true});
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
                {
                    Object.keys(this.state.collection).length ?
                        <CollectionInfo collection={this.state.collection} />
                        :null
                }
                {
                    Object.keys(this.state.collection).length ?
                        <div className="collection-new-button-group">
                            <DefaultButton
                                onClick={this.handleToEdit}
                                text="编辑Collection"
                            />
                            <PrimaryButton
                                onClick={this.handleRefresh}
                                text="新建Collection"
                            />
                        </div>
                        :null
                }
                {
                    this.state.redirectToEdit ?
                        <Redirect to={{
                            pathname: `/collections/${this.state.collection.accessToken}/${this.state.collection.controlToken}/edit`,
                            state: {
                                collection: this.state.collection
                            }
                        }}/>
                        :null
                }
            </div>
        )
    }
}

export default NewCollection;