import React, { Component } from 'react';
import './StoreTable.css';
import { AddStorePage } from '../addstore/AddStorePage';

export class StoreTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            loading: false,
            showAddStore: false
        };
    }

    handleAddStoreButtonClick = () => {
        this.setState({ showAddStore: true });
    };

    async componentDidMount() {
        this.populateStoresData();
    }

    async populateStoresData() {
        const response = await fetch('stores');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
    }

    renderStoresTable(stores) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th className="header">Id</th>
                        <th className="header">Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store => (
                        <tr key={store.id}>
                            <td className="record">{store.id}</td>
                            <td className="record">{store.name}</td>
                            <td><button>Update Store</button></td>
                            <td><button>Delete Store</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        const { stores, loading, showAddStore } = this.state;

        return (
            <div>
                <button onClick={this.handleAddStoreButtonClick}>Add Store</button>
                {showAddStore && <AddStorePage />}
                {loading ? <p><em>Loading...</em></p> : this.renderStoresTable(stores)}
            </div>
        );
    }
}

export default StoreTable;
