import React, { Component } from 'react';

export class AddStorePage extends Component {

    async addStores() {

        let sName = document.getElementById('storeName').value;

        console.log(sName);

        const data = await fetch(
            'stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                name: sName
            })
        }).then((data) => data.json());

        console.log(data);

        this.populateStoresData();
    }

    async populateStoresData() {
        const response = await fetch('stores');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
    }

    render() {
        return (
            <div>
                <input id="storeName" name="storeName"
                    type="text"
                    placeholder="Store Name"
                />
                <button onClick={this.addStores}>Add Store</button>

            </div>
        );
    }
}



export default AddStorePage;